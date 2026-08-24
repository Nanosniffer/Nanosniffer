from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db
from app.core.config import settings
from app.core.exceptions import ConflictException, NotFoundException, UnauthorizedException
from app.core.security import (
    create_access_token,
    create_password_reset_token,
    create_refresh_token,
    decode_token,
    get_password_hash,
    verify_password,
)
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, SuccessMessage
from app.schemas.user import (
    LoginRequest,
    PasswordResetConfirm,
    PasswordResetRequest,
    TokenRefreshRequest,
    TokenResponse,
    UserCreate,
    UserRead,
)
from app.services.audit_service import audit_service

router = APIRouter(prefix="/auth", tags=["Authentication & Profile"])


@router.post("/register", response_model=APIResponseEnvelope[UserRead], status_code=status.HTTP_201_CREATED)
def register_user(
    payload: UserCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    """Register a new investigator or analyst account."""
    result = db.execute(select(User).where(User.email == payload.email))
    existing = result.scalars().first()
    if existing:
        raise ConflictException(f"User with email '{payload.email}' already exists.")

    new_user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        name=payload.name,
        badge_number=payload.badge_number or "AGY-0000",
        role=payload.role.upper(),
        clearance_level=payload.clearance_level,
        agency=payload.agency,
        avatar_url=payload.avatar_url,
        is_active=payload.is_active,
        is_verified=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="REGISTER",
        resource_type="USER",
        resource_id=new_user.id,
        user_id=new_user.id,
        user_email=new_user.email,
        details={"role": new_user.role},
        **client_info,
    )

    return APIResponseEnvelope(data=UserRead.model_validate(new_user))


@router.post("/login", response_model=APIResponseEnvelope[TokenResponse])
def login(
    payload: LoginRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    """Authenticate user with email and password, returning access and refresh JWT tokens."""
    result = db.execute(select(User).where(User.email == payload.email))
    user = result.scalars().first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise UnauthorizedException("Invalid email or password.")

    if not user.is_active:
        raise UnauthorizedException("User account is disabled. Contact system administrator.")

    access_token = create_access_token(subject=user.id, role=user.role)
    refresh_token = create_refresh_token(subject=user.id)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="LOGIN",
        resource_type="AUTH",
        resource_id=user.id,
        user_id=user.id,
        user_email=user.email,
        details={"ip": client_info["ip_address"]},
        **client_info,
    )

    token_resp = TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserRead.model_validate(user),
    )
    return APIResponseEnvelope(data=token_resp)


@router.post("/refresh", response_model=APIResponseEnvelope[TokenResponse])
def refresh_access_token(
    payload: TokenRefreshRequest,
    db: Session = Depends(get_db),
):
    """Obtain a new access token using a valid refresh token."""
    token_data = decode_token(payload.refresh_token)
    if not token_data or token_data.get("type") != "refresh":
        raise UnauthorizedException("Invalid or expired refresh token.")

    user_id = token_data.get("sub")
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user or not user.is_active:
        raise UnauthorizedException("User not found or account is deactivated.")

    new_access_token = create_access_token(subject=user.id, role=user.role)
    new_refresh_token = create_refresh_token(subject=user.id)

    token_resp = TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="bearer",
        user=UserRead.model_validate(user),
    )
    return APIResponseEnvelope(data=token_resp)


@router.post("/logout", response_model=APIResponseEnvelope[SuccessMessage])
def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Revoke user authentication session and log event."""
    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="LOGOUT",
        resource_type="AUTH",
        resource_id=current_user.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={},
        **client_info,
    )
    return APIResponseEnvelope(data=SuccessMessage(success=True, message="Successfully logged out."))


@router.post("/forgot-password", response_model=APIResponseEnvelope[SuccessMessage])
def forgot_password(
    payload: PasswordResetRequest,
    db: Session = Depends(get_db),
):
    """Generate and dispatch password reset security token for the given email."""
    result = db.execute(select(User).where(User.email == payload.email))
    user = result.scalars().first()
    return APIResponseEnvelope(
        data=SuccessMessage(
            success=True,
            message="If the email is registered, a password reset token has been dispatched.",
        )
    )


@router.post("/reset-password", response_model=APIResponseEnvelope[SuccessMessage])
def reset_password(
    payload: PasswordResetConfirm,
    db: Session = Depends(get_db),
):
    """Confirm password reset using security token."""
    token_data = decode_token(payload.token)
    if not token_data or token_data.get("type") != "password_reset":
        raise UnauthorizedException("Invalid or expired password reset token.")

    email = token_data.get("sub")
    result = db.execute(select(User).where(User.email == email))
    user = result.scalars().first()
    if not user:
        raise NotFoundException("User account not found.")

    user.hashed_password = get_password_hash(payload.new_password)
    user.updated_at = datetime.now(timezone.utc)
    db.commit()

    return APIResponseEnvelope(
        data=SuccessMessage(success=True, message="Password has been reset successfully.")
    )


@router.get("/me", response_model=APIResponseEnvelope[UserRead])
def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    """Retrieve profile and credentials of currently logged in user."""
    return APIResponseEnvelope(data=UserRead.model_validate(current_user))
