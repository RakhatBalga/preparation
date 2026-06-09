import enum
from fastapi import FastAPI, HTTPException

app = FastAPI()

doctors = [
    {"id": 1, "name": "Dr. House", "specialization": "Diagnostics"},
    {"id": 2, "name": "Dr. Wilson", "specialization": "Oncology"},
    {"id": 3, "name": "Dr. Cuddy", "specialization": "Endocrinology"},
]

@app.get("/")
def home():
    return {"message": "Hospitals API"}

@app.get("/doctors")
def get_doctors():
    return doctors

@app.get("/doctors/{doctor_id}")
def get_doctor(doctor_id: int):
    for doctor in doctors: 
        if doctor["id"] == doctor_id:
            return doctor

    raise HTTPException(status_code=404, detail="Doctor not found")

@app.post("/doctors")
def create_doctor(doctor: dict):
    if "name" not in doctor or "specialization" not in doctor: 
        raise HTTPException(status_code=400, detail="Name and specialization are required")
    new_id = len(doctors) + 1
    doctor["id"] = new_id
    doctors.append(doctor)
    return doctor

