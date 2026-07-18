from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.doctors import router as doctors_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(doctors_router)


@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.app_name}"}
