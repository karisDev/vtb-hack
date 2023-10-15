from loguru import logger
from typing import Any, Dict, List, Optional, Union
from pydantic import PostgresDsn, validator
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

logger.add("debug.log", format="{time} {level} {message}", level="DEBUG")
log = logger


load_dotenv()


class Settings(BaseSettings):
    DOCKER_MODE: bool = True
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    POSTGRES_HOST: str = "db"
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: str
    POSTGRES_DB: str
    DATABASE_URI: Optional[PostgresDsn] = None

    @validator("DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v

        return (
            f'postgresql+psycopg2://{values["POSTGRES_USER"]}:{values["POSTGRES_PASSWORD"]}@'
            f'{values["POSTGRES_HOST"]}:{values["POSTGRES_PORT"]}/{values["POSTGRES_DB"]}'
        )

    class Config:
        case_sensitive = True
        env_file_encoding = "utf-8"
        env_file = ".env"


settings = Settings()  # type: ignore
