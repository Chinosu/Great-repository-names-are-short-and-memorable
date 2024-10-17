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


class SubItem(Base):
    __tablename__ = "sub_item"

    id: Mapped[str] = mapped_column(
        primary_key=True, default=lambda: uuid4().hex
    )
    event_id: Mapped[str] = mapped_column(ForeignKey("event.id"))
    data: Mapped[str]


class Event(Base):
    __tablename__ = "event"

    id: Mapped[str] = mapped_column(
        primary_key=True, default=lambda: uuid4().hex
    )
    data: Mapped[str]
    # when: Mapped[datetime] = mapped_column(server_default=func.now())
    when: Mapped[datetime]
    sub_items: Mapped[List[SubItem]] = relationship()


async def insert_objects(
    async_session: async_sessionmaker[AsyncSession],
) -> None:
    async with async_session() as session:
        async with session.begin():
            session.add_all(
                [
                    Event(
                        sub_items=[
                            SubItem(data="u1"),
                            SubItem(data="u2"),
                        ],
                        data="e1",
                    ),
                    Event(sub_items=[], data="e2"),
                    Event(
                        sub_items=[
                            SubItem(data="u3"),
                            SubItem(data="u4"),
                        ],
                        data="e3",
                    ),
                ]
            )


async def select_and_update_objects(
    async_session: async_sessionmaker[AsyncSession],
) -> None:
    async with async_session() as session:
        statement = (
            select(Event)
            .order_by(Event.id)
            .options(selectinload(Event.sub_items))
        )
        result = await session.execute(statement)

        for event in result.scalars():
            print(event, event.data)
            print(f"Created at: {event.when}")
            for sub_item in event.sub_items:
                print(sub_item, sub_item.data)

        result = await session.execute(
            select(Event).order_by(Event.id).limit(1)
        )
        event_1 = result.scalars().one()
        event_1.data = "new data"
        await session.commit()

        # access attribute subsequent to commit, this is what
        # expire_on_commit=False allows
        print(event_1.data)

        # alternatively, AsyncAttrs may be used to access any attribute
        # as an awaitable
        for sub_item in await event_1.awaitable_attrs.sub_items:
            print(sub_item, sub_item.data)


async def main() -> None:
    engine = create_async_engine("sqlite+aiosqlite://", echo=True)

    # async_sessionmaker: a factory for new AsyncSession objects
    # expire_on_commit - don't expire objects after transation commit
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    await insert_objects(async_session)
    await select_and_update_objects(async_session)

    # for AsyncEngine created in function scope, close and
    # clean up pooled connections
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())


# Exports
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
