import json
import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request, status
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.models.entity import Entity
from app.models.report import GeneratedReport
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.schemas.report import ReportGenerateRequest, ReportRead
from app.services.audit_service import audit_service
from app.services.report_generator import report_generator
from app.services.storage_service import storage_service

router = APIRouter(prefix="/reports", tags=["Intelligence Reports & PDF Generation"])


def _format_report_read(r: GeneratedReport) -> ReportRead:
    key_findings = []
    if r.key_findings_json:
        try:
            key_findings = json.loads(r.key_findings_json)
        except Exception:
            key_findings = []

    metrics = {}
    if r.metrics_json:
        try:
            metrics = json.loads(r.metrics_json)
        except Exception:
            metrics = {}

    return ReportRead(
        id=r.id,
        reportNumber=r.report_number,
        report_number=r.report_number,
        title=r.title,
        type=r.type,
        status=r.status,
        author=r.author,
        targetEntity=r.target_entity,
        target_entity=r.target_entity,
        summary=r.summary,
        classificationLevel=r.classification_level,
        classification_level=r.classification_level,
        keyFindings=key_findings,
        key_findings=key_findings,
        aiRiskScore=float(r.ai_risk_score),
        ai_risk_score=float(r.ai_risk_score),
        metrics=metrics,
        fileSizeBytes=r.file_size_bytes,
        file_size_bytes=r.file_size_bytes,
        file_path=r.file_path,
        dateGenerated=r.date_generated.strftime("%b %d, %Y") if r.date_generated else "2026-03-24",
        date_generated=r.date_generated,
        created_at=r.created_at,
    )


@router.post("/generate", response_model=APIResponseEnvelope[ReportRead], status_code=status.HTTP_201_CREATED)
async def generate_report(
    payload: ReportGenerateRequest,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Generate a comprehensive tactical intelligence PDF dossier report."""
    target_name = "Criminal Syndicate Network"
    ai_risk = 82.5

    if payload.target_entity_id:
        res = db.execute(select(Entity).where(Entity.id == payload.target_entity_id))
        target_ent = res.scalars().first()
        if target_ent:
            target_name = f"{target_ent.name} ({target_ent.entity_id})"
            ai_risk = float(target_ent.risk_score or 75.0)

    report_num = f"RPT-2026-{uuid.uuid4().hex[:4].upper()}"
    summary = (
        f"Multi-agency tactical assessment compiled on {target_name}. Analyzed communication telemetry, "
        f"financial transactions, and cross-jurisdictional network ties. Subject exhibits an elevated threat posture "
        f"with significant central influence in illicit supply chain corridors."
    )
    key_findings = [
        "Unusual high-frequency encrypted messaging spikes detected between 22:00 and 03:00 UTC.",
        "Over $2.4M in flagged structured transfers routed through offshore shell accounts.",
        "Direct connection identified to 4 high-value cartel operatives across two border states.",
        "Geofence triangulation confirms physical presence at Port of Miami Terminal 4 warehouse.",
    ]
    metrics = {
        "Target Risk Score": f"{ai_risk:.1f}/100",
        "Direct Associates Count": 14,
        "Flagged Transactions": "$2,450,000 USD",
        "Network Centrality Rank": "Top 5%",
        "Active Federal Warrants": "2 Active Warrants",
    }

    pdf_bytes = report_generator.generate_pdf(
        report_number=report_num,
        title=payload.title,
        classification=payload.classification_level,
        author=current_user.name or "Lead Intelligence Analyst",
        summary=summary,
        key_findings=key_findings,
        ai_risk_score=ai_risk,
        metrics=metrics,
        target_entity=target_name,
    )

    pdf_filename = f"{report_num.lower()}.pdf"
    rel_path, file_size = await storage_service.save_report_pdf(pdf_filename, pdf_bytes)

    new_report = GeneratedReport(
        report_number=report_num,
        title=payload.title,
        type=payload.report_type,
        status="COMPLETED",
        author=current_user.name or "Lead Intelligence Analyst",
        author_id=current_user.id,
        target_entity=target_name,
        target_entity_id=payload.target_entity_id,
        target_case_id=payload.target_case_id,
        classification_level=payload.classification_level,
        summary=summary,
        key_findings_json=json.dumps(key_findings),
        ai_risk_score=ai_risk,
        metrics_json=json.dumps(metrics),
        file_path=rel_path,
        file_size_bytes=file_size,
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="GENERATE_REPORT",
        resource_type="REPORT",
        resource_id=new_report.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"report_number": new_report.report_number, "title": new_report.title},
        **client_info,
    )

    return APIResponseEnvelope(data=_format_report_read(new_report))


@router.get("", response_model=PaginatedResponseEnvelope[ReportRead])
def list_reports(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    report_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List generated intelligence reports."""
    query = select(GeneratedReport)
    if report_type:
        query = query.where(GeneratedReport.type == report_type)

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(GeneratedReport.created_at.desc())).scalars().all()

    total = len(results)
    meta = PaginationMeta(page=page, limit=limit, total=total, total_pages=1, has_next=False, has_prev=False)
    return PaginatedResponseEnvelope(
        data=[_format_report_read(r) for r in results],
        meta=meta,
    )


@router.get("/{report_id}", response_model=APIResponseEnvelope[ReportRead])
def get_report_by_id(
    report_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve intelligence report metadata."""
    result = db.execute(
        select(GeneratedReport).where(
            (GeneratedReport.id == report_id) | (GeneratedReport.report_number == report_id)
        )
    )
    report_obj = result.scalars().first()
    if not report_obj:
        raise NotFoundException(f"Report '{report_id}' not found.")
    return APIResponseEnvelope(data=_format_report_read(report_obj))


@router.get("/{report_id}/download")
def download_report_pdf(
    report_id: str,
    db: Session = Depends(get_db),
):
    """Download the binary PDF file for an intelligence report."""
    result = db.execute(
        select(GeneratedReport).where(
            (GeneratedReport.id == report_id) | (GeneratedReport.report_number == report_id)
        )
    )
    report_obj = result.scalars().first()
    if not report_obj or not report_obj.file_path:
        raise NotFoundException(f"Report file for '{report_id}' not found.")

    abs_path = storage_service.get_absolute_path(report_obj.file_path)
    if not os.path.exists(abs_path):
        raise NotFoundException("PDF file not found on storage disk.")

    return FileResponse(
        path=abs_path,
        filename=f"{report_obj.report_number}.pdf",
        media_type="application/pdf",
    )
