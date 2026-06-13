from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.doctors import router as doctors_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(doctors_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Hospitals API"}
