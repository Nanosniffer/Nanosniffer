import os
import uuid
from typing import Optional, Tuple
from app.core.config import settings


class StorageService:
    """Manages file persistence for evidence documents and generated PDF dossiers."""

    def __init__(self):
        self.storage_dir = settings.STORAGE_DIR
        self.uploads_dir = os.path.join(self.storage_dir, "uploads")
        self.reports_dir = os.path.join(self.storage_dir, "reports")
        os.makedirs(self.uploads_dir, exist_ok=True)
        os.makedirs(self.reports_dir, exist_ok=True)

    async def save_upload(self, filename: str, content: bytes) -> Tuple[str, int]:
        """Save an uploaded evidence file and return (relative_storage_path, size_bytes)."""
        file_ext = os.path.splitext(filename)[1]
        unique_name = f"{uuid.uuid4().hex}{file_ext}"
        target_path = os.path.join(self.uploads_dir, unique_name)
        
        with open(target_path, "wb") as f:
            f.write(content)
        
        rel_path = os.path.join("uploads", unique_name)
        return rel_path, len(content)

    async def save_report_pdf(self, report_filename: str, pdf_bytes: bytes) -> Tuple[str, int]:
        """Save a generated report PDF file and return (relative_storage_path, size_bytes)."""
        target_path = os.path.join(self.reports_dir, report_filename)
        with open(target_path, "wb") as f:
            f.write(pdf_bytes)
        rel_path = os.path.join("reports", report_filename)
        return rel_path, len(pdf_bytes)

    def get_absolute_path(self, relative_path: str) -> str:
        """Resolve a relative storage path to the absolute filesystem path."""
        return os.path.join(self.storage_dir, relative_path)

    def file_exists(self, relative_path: str) -> bool:
        abs_path = self.get_absolute_path(relative_path)
        return os.path.exists(abs_path)


storage_service = StorageService()
