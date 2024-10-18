"""
Type definitions for FastAPI request validation

NOTE: These are not directly used by SQLAlchemy
"""

from __future__ import annotations
from datetime import datetime
from typing import List

from pydantic import BaseModel, ConfigDict


class BaseEvent(BaseModel):
    title: str
    description: str
    host: str
    start: datetime
    end: datetime
    location: str


class CreateEvent(BaseEvent):
    pass


class Event(BaseEvent):
    model_config = ConfigDict(from_attributes=True)
    id: str
