from app.config import log
from app.core.database import init_db
from app.config import settings

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


async def startup():
    try:
        init_db()
    except Exception as ex:
        log.exception(f"failed to preparedb {ex}")
        pass


async def shutdown():
    log.info("shutting down")
    pass


def create_app() -> FastAPI:
    """Creating FastAPI object

    Returns:
        FastAPI:
    """
    init_db()
    _app = FastAPI()

    # region middleware

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # endregion

    # region import APIrouters from endpoints

    from app.endpoints.api import router

    _app.include_router(router)

    # endregion

    # adding event handlers
    _app.add_event_handler("startup", startup)
    _app.add_event_handler("shutdown", shutdown)

    return _app
