from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.core.security import get_password_hash
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.schemas.user import UserCreate, UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["User Management (Admin)"])


@router.get("", response_model=PaginatedResponseEnvelope[UserRead])
def list_users(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    role: Optional[str] = None,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """List system users with pagination and role filters."""
    query = select(User)
    if role:
        query = query.where(User.role == role.upper())

    count_query = select(func.count(User.id))
    if role:
        count_query = count_query.where(User.role == role.upper())
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(User.created_at.desc())).scalars().all()

    total_pages = max(1, (total + limit - 1) // limit)
    meta = PaginationMeta(
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_prev=page > 1,
    )
    return PaginatedResponseEnvelope(
        data=[UserRead.model_validate(u) for u in results],
        meta=meta,
    )


@router.get("/{user_id}", response_model=APIResponseEnvelope[UserRead])
def get_user_by_id(
    user_id: str,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Retrieve user details by ID."""
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise NotFoundException(f"User with ID '{user_id}' not found.")
    return APIResponseEnvelope(data=UserRead.model_validate(user))


@router.patch("/{user_id}", response_model=APIResponseEnvelope[UserRead])
def update_user(
    user_id: str,
    payload: UserUpdate,
    current_user: User = Depends(require_role(["ADMIN"])),
    db: Session = Depends(get_db),
):
    """Admin-only: update user role, clearance level, status, or reset credentials."""
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise NotFoundException(f"User with ID '{user_id}' not found.")

    update_dict = payload.model_dump(exclude_unset=True)
    if "password" in update_dict and update_dict["password"]:
        user.hashed_password = get_password_hash(update_dict.pop("password"))

    for k, v in update_dict.items():
        setattr(user, k, v)

    db.commit()
    db.refresh(user)
    return APIResponseEnvelope(data=UserRead.model_validate(user))


@router.delete("/{user_id}", response_model=APIResponseEnvelope[SuccessMessage])
def delete_user(
    user_id: str,
    current_user: User = Depends(require_role(["ADMIN"])),
    db: Session = Depends(get_db),
):
    """Admin-only: delete user account."""
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise NotFoundException(f"User with ID '{user_id}' not found.")

    db.delete(user)
    db.commit()
    return APIResponseEnvelope(data=SuccessMessage(success=True, message=f"User {user_id} deleted."))
