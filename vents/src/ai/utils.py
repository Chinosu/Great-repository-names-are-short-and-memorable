from contextlib import contextmanager
from os import PathLike
from pathlib import Path
from io import IOBase

import google.generativeai as genai


@contextmanager
def upload_file(
    path: str | Path | PathLike | IOBase, display_name: str | None = None
):
    file = genai.upload_file(path=path, display_name=display_name)
    yield file
    genai.delete_file(file.name)
