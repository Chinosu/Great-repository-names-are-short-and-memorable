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
            "/event",
            json={
                "title": "event1",
                "description": "",
                "host": "Bill",
                "start": "2024-10-18T10:14:00Z",
                "end": "2024-10-18T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Sport"],
            },
        )
        assert response.status_code == 200
        assert "id" in response.json()
        assert "start" in response.json()
        assert "end" in response.json()
        assert "description" in response.json()
        assert "host" in response.json()
        assert "location" in response.json()
        assert "tags" in response.json()
        assert response.json()["title"] == "event1"

        response = await app.get("/event")
        assert response.status_code == 200
        assert len(response.json()) == 1


@pytest.mark.asyncio(loop_scope="session")
async def test_events_range():
    async with connect() as app:
        response = await app.post(
            "/event",
            json={
                "title": "event1",
                "description": "",
                "host": "Bill",
                "start": "2024-10-18T10:14:00Z",
                "end": "2024-10-26T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Socialising"],
            },
        )
        assert response.status_code == 200
        response = await app.post(
            "/event",
            json={
                "title": "event2",
                "description": "",
                "host": "Bill",
                "start": "2024-10-18T10:14:00Z",
                "end": "2024-10-26T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Socialising"],
            },
        )
        assert response.status_code == 200
        response = await app.post(
            "/event",
            json={
                "title": "event3",
                "description": "",
                "host": "",
                "start": "2024-10-17T03:14:00Z",
                "end": "2024-10-26T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Socialising"],
            },
        )
        assert response.status_code == 200
        response = await app.post(
            "/event",
            json={
                "title": "event4",
                "description": "event4",
                "host": "event4",
                "start": "2024-10-17T22:30:00Z",
                "end": "2024-10-26T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Socialising"],
            },
        )
        assert response.status_code == 200
        response = await app.post(
            "/event",
            json={
                "title": "event5",
                "description": "event5",
                "host": "event5",
                "start": "2024-10-17T10:30:00Z",
                "end": "2024-10-26T10:14:00Z",
                "location": "Ainsworth",
                "tags": ["Food", "Socialising"],
            },
        )
        assert response.status_code == 200

        response = await app.get(
            "/event",
            params={
                "start_date": "2024-10-17T03:14:00Z",
                "end_date": "2024-10-17T22:30:00Z",
            },
        )
        assert response.status_code == 200
        assert len(response.json()) == 3
        assert {event["title"] for event in response.json()} == {
            "event3",
            "event4",
            "event5",
        }
