"""
Type definitions for FastAPI request validation

NOTE: These are not directly used by SQLAlchemy
"""

from __future__ import annotations
from datetime import datetime
from typing import List, Literal
from enum import Enum

from pydantic import BaseModel, ConfigDict, field_validator

tags = {
    "Career Development and Education",
    "Video Games",
    "Online",
    "Food",
    "Weekly Meetup",
    "Competition",
    "Sport",
    "Socialising",
    "Religious",
}


class BaseEvent(BaseModel):
    title: str
    description: str
    host: str
    start: datetime
    end: datetime
    location: str
    tags: (
        List[
            Literal[
                "Career Development and Education",
                "Video Games",
                "Online",
                "Food",
                "Weekly Occurrence",
                "Competition",
                "Sport",
                "Socialising",
                "Religious",
            ]
        ]
        | str
    )  # ideally list but also csv str for db

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, value):
        if isinstance(value, str):
            value = [tag for tag in value.split(",") if tag]
        # if isinstance(value, list):
        #     assert all(tag in tags for tag in value)
        return value


class CreateEvent(BaseEvent):
    pass


class Event(BaseEvent):
    model_config = ConfigDict(from_attributes=True)
    id: str
