"""
Define schemas for Google Generative AI in Python code. `as_str`
returns all the class definitions in this file as a string.
"""

from typing import TypedDict
from datetime import datetime
from pathlib import Path
from contextlib import suppress
from itertools import dropwhile, takewhile
from re import match


class Tags(TypedDict):
    career_development_and_education: bool
    video_games: bool
    online: bool
    food: bool
    weekly_meetup: bool
    competition: bool
    sport: bool
    socialising: bool
    religious: bool


class Event(TypedDict):
    title: str
    description: str
    host: str
    start: datetime
    end: datetime
    location: str
    tags: list[Tags]


result = []
lines = Path(__file__).read_text().splitlines()
it = iter(lines)
with suppress(StopIteration):
    while True:
        it = dropwhile(lambda line: not line.startswith("class"), it)
        result.append(next(it))
        result.extend(takewhile(lambda line: match(r"\s", line), it))
result.append("\n")

schema = "\n".join(result)
