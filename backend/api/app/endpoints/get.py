from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas
from app.core.dependencies import get_db
from app.core import crud

router = APIRouter()


@router.get("/atms", response_model=response_schemas.AllAtms)
async def get_all_atms(
    db: Session = Depends(get_db)
):
    """
    Get all ATMs in the specified radius.
    """
    return crud.get_all_atms(db)


@router.get("/departments", response_model=response_schemas.AllDepartments)
async def get_all_departments(
    db: Session = Depends(get_db)
):
    """
    Get all departments in the specified radius.
    """
    return crud.get_all_departments(db)

