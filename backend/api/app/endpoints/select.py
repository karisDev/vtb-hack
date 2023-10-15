from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.utils.calculate_route import add_routes
from app.ml.departments_analysis import main_departments, predict_1_department 


router = APIRouter(
    prefix="/select",
)


@router.post("/atm", response_model=response_schemas.Atm)
async def select_atm(
    atm: request_schemas.SelectAtm, db: Session = Depends(get_db)
):
    ...


@router.post("/department", response_model=None)
async def select_department(
    department: request_schemas.SelectDepartment, db: Session = Depends(get_db)
):
    top_departments = main_departments(
        path_to_df="app/data/departments.csv",
        cur_location=[department.latitude, department.longitude],
        operation=department.service.value,
        is_vip=department.is_prime,
        is_person=department.is_person,
        is_juridical=department.is_juridical,
        is_disabled=department.is_disabled,
    )


