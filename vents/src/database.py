"""
Reference:
- https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html#synopsis-orm
"""

from __future__ import annotations

from uuid import uuid4
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


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
    tags: Mapped[str]  # comma separated strings, i.e. `"Food,Online"`


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
