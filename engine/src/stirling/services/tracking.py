from __future__ import annotations

from contextvars import ContextVar

from opentelemetry.sdk.trace import TracerProvider

from stirling.config import AppSettings

# Per-request user ID, set by middleware from the X-User-Id header.
current_user_id: ContextVar[str | None] = ContextVar("current_user_id", default=None)


def setup_tracking(_settings: AppSettings) -> TracerProvider | None:
    """Telemetry removed. Always returns None."""
    return None
