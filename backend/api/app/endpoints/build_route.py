from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.utils.calculate_route import calculate_route

router = APIRouter()


@router.get("/route", response_model=response_schemas.Route)
def get_route(
    latitude_to: float,
    longitude_to: float,
    latitude_from: float,
    longitude_from: float,
):
    return response_schemas.Route(
        **calculate_route(
            latitude_to=latitude_to,
            longitude_to=longitude_to,
            latitude_from=latitude_from,
            longitude_from=longitude_from,
        )
    )
