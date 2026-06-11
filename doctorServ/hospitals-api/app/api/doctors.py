from fastapi import APIRouter 

from app.db.fake_db import doctors
from app.service.doctor_service import find_doctor_by_id

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("")
def get_doctors():
    return doctors

@router.get("/{doctor_id}")
def get_doctor(doctor_id: int):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None: 
        return {"message": "Doctor not found"}

    return doctor 