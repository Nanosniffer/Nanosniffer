from typing import Callable, List, Optional
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import ForbiddenException, UnauthorizedException
from app.core.rbac import Permission, UserRole, has_permission
from app.core.security import decode_token
from app.db.session import get_db
from app.models.user import User

security_bearer = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
    db: Session = Depends(get_db),
) -> User:
    """Validate Bearer JWT access token and return current User instance."""
    if not credentials:
        raise UnauthorizedException("Authorization bearer token required.")

    payload = decode_token(credentials.credentials)
    if not payload:
        raise UnauthorizedException("Invalid, expired, or malformed authentication token.")

    if payload.get("type") != "access":
        raise UnauthorizedException("Invalid token type. Expected access token.")

    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedException("Malformed token claims. Subject missing.")

    # Retrieve user from DB
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if not user:
        result = db.execute(select(User).where(User.email == user_id))
        user = result.scalars().first()

    if not user:
        raise UnauthorizedException("User account associated with this token not found.")

    if not user.is_active:
        raise ForbiddenException("User account has been deactivated.")

    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    return current_user


def require_role(allowed_roles: List[str]) -> Callable:
    """Dependency factory enforcing specific User roles."""

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role = (current_user.role or "").upper()
        allowed_normalized = [r.upper() for r in allowed_roles]
        if user_role not in allowed_normalized and UserRole.ADMIN.value not in [user_role]:
            raise ForbiddenException(
                f"Access forbidden for role '{current_user.role}'. Required roles: {allowed_roles}"
            )
        return current_user

    return role_checker


def require_permission(permission: Permission) -> Callable:
    """Dependency factory enforcing granular RBAC permissions."""

    def perm_checker(current_user: User = Depends(get_current_user)) -> User:
        if not has_permission(current_user.role, permission):
            raise ForbiddenException(
                f"Permission denied. Required permission: '{permission.value}'"
            )
        return current_user

    return perm_checker


def get_client_info(request: Request) -> dict:
    """Extract client IP and user agent headers for audit trail."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    user_agent = request.headers.get("User-Agent", "Unknown")
    return {"ip_address": client_ip, "user_agent": user_agent}
