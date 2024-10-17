import google.generativeai as genai
from dotenv import dotenv_values

api_key = dotenv_values(".env")["GEMINI_KEY"]
genai.configure(api_key=api_key)


__all__ = []
