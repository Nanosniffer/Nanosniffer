import json
import logging
from typing import Dict, List, Set
from fastapi import WebSocket

logger = logging.getLogger(__name__)


class NotificationManager:
    """Manages active WebSocket subscribers for live threat alerts and intelligence broadcasts."""

    def __init__(self):
        self.active_connections: Set[WebSocket] = set()

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.add(websocket)
        logger.info(f"WebSocket client connected. Active connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket) -> None:
        self.active_connections.discard(websocket)
        logger.info(f"WebSocket client disconnected. Active connections: {len(self.active_connections)}")

    async def broadcast_alert(self, alert_data: Dict) -> None:
        """Broadcast a newly triggered or updated alert to all connected UI clients."""
        payload = json.dumps({"event": "ALERT_NOTIFICATION", "data": alert_data})
        dead_connections = []
        for ws in self.active_connections:
            try:
                await ws.send_text(payload)
            except Exception as e:
                logger.warning(f"Failed to send to WebSocket client: {e}")
                dead_connections.append(ws)

        for ws in dead_connections:
            self.disconnect(ws)

    async def broadcast_event(self, event_type: str, data: Dict) -> None:
        """Broadcast any generic system event (e.g. AI job completion, graph update)."""
        payload = json.dumps({"event": event_type, "data": data})
        dead_connections = []
        for ws in self.active_connections:
            try:
                await ws.send_text(payload)
            except Exception:
                dead_connections.append(ws)

        for ws in dead_connections:
            self.disconnect(ws)


notification_manager = NotificationManager()
