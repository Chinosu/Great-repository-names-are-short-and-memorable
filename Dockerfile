# For vents

FROM python

RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["fastapi", "run", "vents/src/main.py"]
