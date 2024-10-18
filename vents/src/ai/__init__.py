import google.generativeai as genai
from dotenv import dotenv_values
from os import environ

api_key = dotenv_values(".env").get("GEMINI_KEY") or environ.get("GEMINI_KEY")
assert api_key, "Google Generative AI API key not found"
genai.configure(api_key=api_key)


__all__ = []
