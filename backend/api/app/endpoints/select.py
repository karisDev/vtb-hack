from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud
from app.utils.calculate_route import add_routes
from app.ml.departments_analysis import main_departments, predict_1_department
from app.ml.bancomat_analysis import main_bancomats, predict_1_bancomat


router = APIRouter(
    prefix="/select",
)


@router.post("/atm", response_model=response_schemas.SelectedOne)
async def select_atm(atm: request_schemas.SelectAtm):
    top_atms = main_bancomats(
        path_to_df="app/data/atms.csv",
        cur_location=[atm.latitude, atm.longitude]
    )

    top_atms = add_routes(
        top_atms,
        atm.latitude,
        atm.longitude
    )

    selected_atm = predict_1_bancomat(top_atms)

    return response_schemas.SelectedOne(
        id=str(selected_atm)
    )


@router.post("/department", response_model=response_schemas.SelectedOne)
async def select_department(
    department: request_schemas.SelectDepartment,
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

    top_departments = add_routes(
        top_departments,
        department.latitude,
        department.longitude,
    )

    selected_department = predict_1_department(top_departments)

    return response_schemas.SelectedOne(
        id=str(selected_department)
    )
