from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from typing import Annotated

from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.config import settings

router = APIRouter()


@router.get("/atms", response_model=response_schemas.AllAtms)
async def get_all_atms(
    latitude: float, longitude: float, db: Session = Depends(get_db)
):
    """
    Get all ATMs in the specified radius.
    """
    log.info(
        f"Get all ATMs in the specified radius. Latitude: {latitude}, Longitude: {longitude}"
    )
    return crud.get_all_atms(db, latitude, longitude)


@router.get("/departments", response_model=response_schemas.AllDepartments)
async def get_all_departments(
    latitude: float, longitude: float, db: Session = Depends(get_db)
):
    """
    Get all departments in the specified radius.
    """
    log.info(
        f"Get all departments in the specified radius. Latitude: {latitude}, Longitude: {longitude}"
    )
    return crud.get_all_departments(db, latitude, longitude)
