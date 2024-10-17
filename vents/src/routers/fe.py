"""
Routes for societies to manage events
"""

from fastapi import APIRouter, HTTPException, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")

items = ["Item 1", "Item 2"]


@router.get("/", response_class=HTMLResponse)
def get_items(request: Request):
    return templates.TemplateResponse(
        "items.html", {"request": request, "items": items}
    )


@router.post("/add-item")
def add_item(request: Request, item: str = Form(...)):
    items.append(item)
    return templates.TemplateResponse(
        "partials/item.html", {"request": request, "item": item}
    )
