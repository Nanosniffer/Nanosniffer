from datetime import datetime, timezone
from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginationMeta(BaseModel):
    page: int = 1
    limit: int = 50
    total: int = 0
    total_pages: int = 1
    has_next: bool = False
    has_prev: bool = False


class APIResponseEnvelope(BaseModel, Generic[T]):
    data: Optional[T] = None
    meta: dict[str, Any] = Field(default_factory=lambda: {"timestamp": datetime.now(timezone.utc).isoformat()})
    error: Optional[dict[str, Any]] = None


class PaginatedResponseEnvelope(BaseModel, Generic[T]):
    data: List[T] = Field(default_factory=list)
    meta: PaginationMeta
    error: Optional[dict[str, Any]] = None


class SuccessMessage(BaseModel):
    success: bool = True
    message: str = "Operation completed successfully"
