import json

from ai.utils import upload_file
from ai.schema import schema

import google.generativeai as genai


prompt = f"""
Parse event details in the image.
Return a Event.

Follow this schema to generate JSON:

{schema}
"""


def query(path: str):
    with upload_file(path=path) as file:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
        response = model.generate_content(
            [prompt, file],
            generation_config={"response_mime_type": "application/json"},
        )

        print(json.dumps(json.loads(response.text), indent=4))
