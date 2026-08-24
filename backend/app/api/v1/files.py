import os
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.models.file import EvidenceDocument
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, SuccessMessage
from app.services.storage_service import storage_service

router = APIRouter(prefix="/files", tags=["Evidence & Document Management"])


@router.post("/upload", response_model=APIResponseEnvelope[dict], status_code=status.HTTP_201_CREATED)
async def upload_evidence_file(
    file: UploadFile = File(...),
    classification_level: str = Form("CONFIDENTIAL"),
    case_id: str = Form(None),
    entity_id: str = Form(None),
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Upload evidence file, store in storage repository, and register metadata."""
    content = await file.read()
    rel_path, size_bytes = await storage_service.save_upload(file.filename, content)

    content_type = file.content_type or ""
    if "image" in content_type:
        f_type = "image"
    elif "audio" in content_type:
        f_type = "audio"
    elif "video" in content_type:
        f_type = "video"
    elif "pdf" in content_type:
        f_type = "pdf"
    else:
        f_type = "document"

    doc = EvidenceDocument(
        file_name=file.filename,
        original_name=file.filename,
        file_type=f_type,
        mime_type=content_type,
        file_size_bytes=size_bytes,
        storage_path=rel_path,
        storage_type="local",
        classification_level=classification_level,
        uploaded_by_id=current_user.id,
        case_id=case_id,
        entity_id=entity_id,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    return APIResponseEnvelope(
        data={
            "id": doc.id,
            "file_name": doc.file_name,
            "file_type": doc.file_type,
            "file_size_bytes": doc.file_size_bytes,
            "storage_path": doc.storage_path,
            "classification_level": doc.classification_level,
            "created_at": doc.created_at.isoformat(),
        }
    )


@router.get("/{file_id}/download")
def download_file(
    file_id: str,
    db: Session = Depends(get_db),
):
    """Download stored evidence file by ID."""
    result = db.execute(select(EvidenceDocument).where(EvidenceDocument.id == file_id))
    doc = result.scalars().first()
    if not doc:
        raise NotFoundException(f"Evidence file '{file_id}' not found.")

    abs_path = storage_service.get_absolute_path(doc.storage_path)
    if not os.path.exists(abs_path):
        raise NotFoundException("Physical file not found on storage disk.")

    return FileResponse(
        path=abs_path,
        filename=doc.original_name,
        media_type=doc.mime_type or "application/octet-stream",
    )
