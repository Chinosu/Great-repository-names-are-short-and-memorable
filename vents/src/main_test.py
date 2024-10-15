from contextlib import asynccontextmanager

import pytest
from httpx import AsyncClient, ASGITransport
from asgi_lifespan import LifespanManager

from .main import app


@asynccontextmanager
async def connect():
    # # alternative to asgi_lifespan
    # await database.reset()

    async with LifespanManager(app):
        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://127.0.0.1:8000"
        ) as async_client:
            yield async_client


@pytest.mark.asyncio(loop_scope="session")
async def test_hello_world():
    async with connect() as app:
        response = await app.get("/helloworld")
    assert response.status_code == 200


@pytest.mark.asyncio(loop_scope="session")
async def test_post_and_get_event():
    async with connect() as app:
        response = await app.post("/event", json={"data": "event"})
        assert response.status_code == 200
        assert "id" in response.json()
        assert "create_date" in response.json()
        assert response.json()["data"] == "event"
        assert response.json()["sub_items"] == []

        response = await app.get("/event")
        assert response.status_code == 200
        assert len(response.json()) == 1
