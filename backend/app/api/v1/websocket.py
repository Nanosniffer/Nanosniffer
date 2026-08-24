import asyncio
import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.notification_service import notification_manager

logger = logging.getLogger(__name__)
router = APIRouter(tags=["WebSocket Real-Time Stream"])


@router.websocket("/ws/alerts")
async def websocket_alerts_endpoint(websocket: WebSocket):
    """Real-time bidirectional WebSocket channel for threat alerts and operational intelligence updates."""
    await notification_manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and listen for client pings or filters
            data = await websocket.receive_text()
            # Send echo acknowledgement
            await websocket.send_text('{"event": "PONG", "status": "connected"}')
    except WebSocketDisconnect:
        notification_manager.disconnect(websocket)
    except Exception as e:
        logger.warning(f"WebSocket error: {e}")
        notification_manager.disconnect(websocket)
