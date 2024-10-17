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
        response = await app.post(
            "/event", json={"data": "event", "when": "2"}
        )
        assert response.status_code == 200
        assert "id" in response.json()
        assert "when" in response.json()
        assert response.json()["data"] == "event"
        assert response.json()["sub_items"] == []

        response = await app.get("/event")
        assert response.status_code == 200
        assert len(response.json()) == 1


@pytest.mark.asyncio(loop_scope="session")
async def test_events_rage():
    async with connect() as app:
        response = await app.post(
            "/event", json={"data": "event1", "when": "2024-10-16T10:30:00Z"}
        )
        response = await app.post(
            "/event", json={"data": "event2", "when": "2024-10-18T010:14:00Z"}
        )
        response = await app.post(
            "/event", json={"data": "event3", "when": "2024-10-17T03:14:00Z"}
        )
        response = await app.post(
            "/event", json={"data": "event4", "when": "2024-10-17T22:30:00Z"}
        )
        response = await app.post(
            "/event", json={"data": "event5", "when": "2024-10-17T10:30:00Z"}
        )

        response = await app.get(
            "/event",
            params={
                "start_date": "2024-10-17T03:14:00Z",
                "end_date": "2024-10-17T22:30:00Z",
            },
        )
        assert response.status_code == 200
        assert len(response.json()) == 3
        assert {event["data"] for event in response.json()} == {
            "event3",
            "event4",
            "event5",
        }
