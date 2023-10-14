from fastapi import APIRouter

from app.endpoints.get import router as get_router

router = APIRouter(
    prefix="/api",
    responses={404: {"description": "Not found"}},
)

router.include_router(get_router)
