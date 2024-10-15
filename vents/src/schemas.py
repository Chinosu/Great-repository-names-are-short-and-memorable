"""
Type definitions for FastAPI request validation

NOTE: These are not directly used by SQLAlchemy
"""

from __future__ import annotations
from datetime import datetime
from typing import List

from pydantic import BaseModel, ConfigDict


class BaseEvent(BaseModel):
    data: str


class CreateEvent(BaseEvent):
    pass


class Event(BaseEvent):
    model_config = ConfigDict(from_attributes=True)
    id: str
    create_date: datetime
    sub_items: List[SubItem] = []


class BaseSubItem(BaseModel):
    data: str


class CreateSubItem(BaseSubItem):
    pass


class SubItem(BaseSubItem):
    model_config = ConfigDict(from_attributes=True)
    id: str
    event_id: str
