from fastapi import APIRouter

from app.endpoints.get import router as get_router
from app.endpoints.select import router as select_router
from app.endpoints.additional_info import router as additional_info_router
from app.endpoints.build_route import router as build_route_router
from app.endpoints.assistent import router as assistent_router

router = APIRouter(
    prefix="/api",
    responses={404: {"description": "Not found"}},
)

router.include_router(get_router)
router.include_router(select_router)
router.include_router(additional_info_router)
router.include_router(build_route_router)
router.include_router(assistent_router)
