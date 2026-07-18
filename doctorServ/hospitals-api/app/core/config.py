import os
from dataclasses import dataclass


DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]


def parse_cors_origins(value: str | None) -> list[str]:
    if value is None or value.strip() == "":
        return DEFAULT_CORS_ORIGINS

    return [origin.strip() for origin in value.split(",") if origin.strip()]


@dataclass
class Settings:
    app_name: str
    cors_origins: list[str]


def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Hospitals API"),
        cors_origins=parse_cors_origins(os.getenv("CORS_ORIGINS")),
    )


settings = get_settings()
