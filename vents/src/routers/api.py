"""
[Routers and more]
https://fastapi.tiangolo.com/tutorial/bigger-applications/#how-relative-imports-work
"""

from datetime import datetime

from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .. import schemas, database

router = APIRouter()


@router.post("/event")
async def post_event(
    event: schemas.CreateEvent,
    session: AsyncSession = Depends(database.get_session),
):
    # query = await session.execute(
    #     select(database.Event)
    #     .where(database.Event.data == event.data)
    #     .limit(1),
    # )
    # existing_event = query.first()
    # if existing_event is not None:
    #     raise HTTPException(status_code=400, detail="Data already exists")

    event = database.Event(
        title=event.title,
        description=event.description,
        host=event.host,
        start=event.start,
        end=event.end,
        location=event.location,
    )
    session.add_all([event])
    await session.commit()
    return schemas.Event.model_validate(event)


@router.get("/event")
async def get_event(
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    session: AsyncSession = Depends(database.get_session),
):
    if start_date and end_date:
        query = (
            select(database.Event)
            .where(database.Event.start <= end_date)
            .where(start_date <= database.Event.start)
            .order_by(database.Event.id)
        )
    else:
        query = select(database.Event).order_by(database.Event.id)

    events = (await session.execute(query)).scalars()
    return [schemas.Event.model_validate(event) for event in events]
