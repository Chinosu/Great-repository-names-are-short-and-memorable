"""
Reference:
- https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html#synopsis-orm
"""

from __future__ import annotations

from uuid import uuid4
from random import randint
import asyncio
from datetime import datetime
from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import selectinload


class Base(AsyncAttrs, DeclarativeBase):
    pass


class Event(Base):
    __tablename__ = "event"

    id: Mapped[str] = mapped_column(
        primary_key=True, default=lambda: uuid4().hex
    )
    title: Mapped[str]
    description: Mapped[str]
    host: Mapped[str]
    start: Mapped[datetime]
    end: Mapped[datetime]
    location: Mapped[str]


async def reset():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


engine = create_async_engine(
    "sqlite+aiosqlite://",
    # echo=True,
)
async_session = async_sessionmaker(engine, expire_on_commit=False)


async def get_session():
    session = async_session()
    try:
        yield session
    finally:
        await session.close()
