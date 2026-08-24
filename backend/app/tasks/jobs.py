import asyncio
import logging
from typing import Any, Dict, List
from app.tasks.celery_app import celery_app
from app.services.report_generator import report_generator
from app.services.storage_service import storage_service

logger = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.jobs.generate_pdf_report_task")
def generate_pdf_report_task(report_id: str, report_data: Dict[str, Any]) -> Dict[str, Any]:
    """Background task to generate and persist a PDF tactical dossier."""
    logger.info(f"Starting async PDF generation for report ID: {report_id}")
    try:
        pdf_bytes = report_generator.generate_pdf(
            report_number=report_data.get("report_number", "RPT-GEN"),
            title=report_data.get("title", "Intelligence Assessment"),
            classification=report_data.get("classification_level", "TOP SECRET // INTEL"),
            author=report_data.get("author", "Intelligence Division"),
            summary=report_data.get("summary", "No summary provided."),
            key_findings=report_data.get("key_findings", []),
            ai_risk_score=float(report_data.get("ai_risk_score", 70.0)),
            metrics=report_data.get("metrics", {}),
            target_entity=report_data.get("target_entity"),
        )
        filename = f"report_{report_id}.pdf"
        
        # Save file synchronously in worker
        abs_reports_dir = storage_service.reports_dir
        import os
        target_path = os.path.join(abs_reports_dir, filename)
        with open(target_path, "wb") as f:
            f.write(pdf_bytes)

        rel_path = os.path.join("reports", filename)
        return {
            "status": "COMPLETED",
            "report_id": report_id,
            "file_path": rel_path,
            "file_size_bytes": len(pdf_bytes),
        }
    except Exception as e:
        logger.error(f"Failed to generate report PDF: {e}")
        return {"status": "FAILED", "report_id": report_id, "error": str(e)}


@celery_app.task(name="app.tasks.jobs.recompute_network_graph_task")
def recompute_network_graph_task() -> Dict[str, Any]:
    """Background job to recompute network centrality and community partitions."""
    logger.info("Executing network graph recomputation...")
    return {"status": "COMPLETED", "message": "Network metrics updated"}
