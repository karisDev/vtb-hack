from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.core.dependencies import get_db
from app.core import crud

router = APIRouter()

@router.get("/atm_additional", response_model=response_schemas.AdditionalInfo)
async def get_additional_info(
    id: str,
    db: Session = Depends(get_db),
):
    """
    Get additional info for a route
    """
    log.info(f"Get additional info for route {id}")
    return crud.get_additional_info(db, id)
