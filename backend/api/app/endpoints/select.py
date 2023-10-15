from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.utils.calculate_route import add_routes

router = APIRouter(
    prefix="/select",
)


@router.post("/atm", response_model=response_schemas.Atm)
async def select_atm(
    atm: request_schemas.SelectAtm, db: Session = Depends(get_db)
):
    ...


@router.post("/department", response_model=response_schemas.Department)
async def select_department(
    department: request_schemas.SelectDepartment, db: Session = Depends(get_db)
):
    ...
