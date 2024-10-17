"""
To start, execute
`fastapi dev vents/src/main.py`
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from . import database
from .routers import api, fe


@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.reset()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(api.router)
app.include_router(fe.router)


@app.get("/helloworld")
async def hello_world():
    return {"hello, world!"}
