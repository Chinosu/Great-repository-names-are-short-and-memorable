"""
To start, execute
`fastapi dev vents/src/main.py`
"""

from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select

from . import schemas
from . import database


@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.reset()
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/helloworld")
async def hello_world():
    return {"hello, world!"}


@app.post("/event")
async def post_event(
    event: schemas.CreateEvent,
    session: AsyncSession = Depends(database.get_session),
):
    query = await session.execute(
        select(database.Event)
        .where(database.Event.data == event.data)
        .limit(1),
    )
    existing_event = query.first()
    if existing_event is not None:
        raise HTTPException(status_code=400, detail="Data already exists")

    event = database.Event(data=event.data, sub_items=[])
    session.add_all([event])
    await session.commit()
    return schemas.Event.model_validate(event)


@app.get("/event")
async def get_event(session: AsyncSession = Depends(database.get_session)):
    query = (
        select(database.Event)
        .order_by(database.Event.id)
        .options(selectinload(database.Event.sub_items))
    )
    events = (await session.execute(query)).scalars()
    return [schemas.Event.model_validate(event) for event in events]
