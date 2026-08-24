import io
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


def generate_pure_python_pdf(
    report_number: str,
    title: str,
    classification: str,
    author: str,
    summary: str,
    key_findings: List[str],
    ai_risk_score: float,
    metrics: Dict[str, Any],
    target_entity: Optional[str] = None,
) -> bytes:
    """Pure-Python standard PDF generator (100% independent of C-extensions like Pillow/ReportLab)."""
    lines = [
        f"CLASSIFICATION: {classification.upper()}",
        "=" * 65,
        f"REPORT: {title.upper()}",
        f"DOCUMENT ID: {report_number} | DATE: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        f"AUTHOR: {author} | TARGET: {target_entity or 'General Network'}",
        f"AI THREAT ASSESSMENT SCORE: {ai_risk_score:.1f}/100",
        "-" * 65,
        "",
        "1. EXECUTIVE INTELLIGENCE SUMMARY:",
        summary,
        "",
        "2. KEY FINDINGS & CRITICAL TELEMETRY:",
    ]
    for finding in key_findings:
        lines.append(f"  * {finding}")
    lines.append("")
    lines.append("3. TACTICAL & NETWORK METRICS:")
    for k, v in metrics.items():
        label = k.replace("_", " ").title()
        lines.append(f"  - {label}: {v}")
    lines.append("")
    lines.append("=" * 65)
    lines.append(f"CLASSIFICATION: {classification.upper()} — STRICTLY FOR LAW ENFORCEMENT USE ONLY")

    # Build PDF stream
    text_content = "\n".join(lines)
    # Simple valid PDF 1.4 document structure
    pdf_text_escaped = text_content.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    
    stream_lines = []
    y = 750
    for line in lines:
        escaped_line = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        stream_lines.append(f"BT /F1 10 Tf 50 {y} Td ({escaped_line}) Tj ET")
        y -= 14
        if y < 50:
            break

    stream_data = "\n".join(stream_lines)
    stream_len = len(stream_data)

    pdf = (
        f"%PDF-1.4\n"
        f"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
        f"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
        f"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
        f"4 0 obj\n<< /Length {stream_len} >>\nstream\n{stream_data}\nendstream\nendobj\n"
        f"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
        f"xref\n0 6\n"
        f"0000000000 65535 f \n"
        f"0000000009 00000 n \n"
        f"0000000058 00000 n \n"
        f"0000000115 00000 n \n"
        f"0000000234 00000 n \n"
        f"0000000300 00000 n \n"
        f"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n380\n%%EOF\n"
    )
    return pdf.encode("utf-8")


class ReportGenerator:
    """Generates tactical intelligence PDF dossiers."""

    @staticmethod
    def generate_pdf(
        report_number: str,
        title: str,
        classification: str,
        author: str,
        summary: str,
        key_findings: List[str],
        ai_risk_score: float,
        metrics: Dict[str, Any],
        target_entity: Optional[str] = None,
    ) -> bytes:
        try:
            from reportlab.lib.pagesizes import letter
            from reportlab.lib import colors
            from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
            from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

            buffer = io.BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
            styles = getSampleStyleSheet()
            
            header_style = ParagraphStyle("ClassificationHeader", fontName="Helvetica-Bold", fontSize=11, textColor=colors.HexColor("#dc2626"), alignment=1, spaceAfter=10)
            title_style = ParagraphStyle("ReportTitle", fontName="Helvetica-Bold", fontSize=20, textColor=colors.HexColor("#0f172a"), spaceAfter=6)
            subtitle_style = ParagraphStyle("ReportSubtitle", fontName="Helvetica", fontSize=10, textColor=colors.HexColor("#475569"), spaceAfter=15)
            heading_style = ParagraphStyle("SectionHeading", fontName="Helvetica-Bold", fontSize=13, textColor=colors.HexColor("#1e293b"), spaceBefore=12, spaceAfter=6)
            body_style = ParagraphStyle("BodyTextCustom", fontName="Helvetica", fontSize=10, leading=14, textColor=colors.HexColor("#334155"), spaceAfter=8)

            story = [
                Paragraph(f"❖ {classification.upper()} ❖", header_style),
                HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#dc2626"), spaceAfter=15),
                Paragraph(title, title_style),
            ]
            meta_text = f"<b>Report ID:</b> {report_number} &nbsp;|&nbsp; <b>Date:</b> {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')} &nbsp;|&nbsp; <b>Author:</b> {author}"
            if target_entity:
                meta_text += f"<br/><b>Target Entity:</b> {target_entity} &nbsp;|&nbsp; <b>AI Threat Assessment:</b> {ai_risk_score:.1f}/100"
            story.append(Paragraph(meta_text, subtitle_style))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=15))

            story.append(Paragraph("1. EXECUTIVE INTELLIGENCE SUMMARY", heading_style))
            story.append(Paragraph(summary, body_style))
            story.append(Spacer(1, 10))

            if key_findings:
                story.append(Paragraph("2. KEY FINDINGS & CRITICAL TELEMETRY", heading_style))
                for finding in key_findings:
                    story.append(Paragraph(f"• {finding}", body_style))
                story.append(Spacer(1, 10))

            if metrics:
                story.append(Paragraph("3. NETWORK & THREAT METRICS", heading_style))
                table_data = [["Metric Indicator", "Observed Value"]]
                for k, v in metrics.items():
                    table_data.append([k.replace("_", " ").title(), str(v)])

                t = Table(table_data, colWidths=[240, 280])
                t.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e293b")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, 0), 10),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f8fafc")),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
                    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                    ("PADDING", (0, 0), (-1, -1), 6),
                ]))
                story.append(t)
                story.append(Spacer(1, 15))

            story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#dc2626"), spaceBefore=20, spaceAfter=10))
            story.append(Paragraph(f"❖ {classification.upper()} — FOR LAW ENFORCEMENT USE ONLY ❖", header_style))

            doc.build(story)
            pdf_bytes = buffer.getvalue()
            buffer.close()
            return pdf_bytes
        except Exception:
            # Transparent fallback to pure Python PDF generator
            return generate_pure_python_pdf(
                report_number=report_number,
                title=title,
                classification=classification,
                author=author,
                summary=summary,
                key_findings=key_findings,
                ai_risk_score=ai_risk_score,
                metrics=metrics,
                target_entity=target_entity,
            )


report_generator = ReportGenerator()
