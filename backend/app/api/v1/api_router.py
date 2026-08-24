from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.cases import router as cases_router
from app.api.v1.entities import router as entities_router
from app.api.v1.relationships import router as relationships_router
from app.api.v1.network import router as network_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.ai import router as ai_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.files import router as files_router
from app.api.v1.reports import router as reports_router
from app.api.v1.alerts import router as alerts_router
from app.api.v1.audit import router as audit_router
from app.api.v1.websocket import router as ws_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(cases_router)
api_v1_router.include_router(entities_router)
api_v1_router.include_router(relationships_router)
api_v1_router.include_router(network_router)
api_v1_router.include_router(analytics_router)
api_v1_router.include_router(ai_router)
api_v1_router.include_router(dashboard_router)
api_v1_router.include_router(files_router)
api_v1_router.include_router(reports_router)
api_v1_router.include_router(alerts_router)
api_v1_router.include_router(audit_router)
api_v1_router.include_router(ws_router)
