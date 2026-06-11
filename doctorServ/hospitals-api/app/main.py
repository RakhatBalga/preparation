from fastapi import FastAPI

from app.api.doctors import router as doctors_router

app = FastAPI()

app.include_router(doctors_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Hospitals API"}
