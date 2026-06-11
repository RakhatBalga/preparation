from fastapi import APIRouter 

from app.db.fake_db import doctors
from app.services.doctor_service import find_doctor_by_id, find_doctors_by_specialization

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("")
def get_doctors():
    return doctors

@router.get("/count")
def count_doctors():
    return {"count": len(doctors)}

@router.get("/search")
def search_doctors(specialization: str):
    return find_doctors_by_specialization

@router.get("/{doctor_id}")
def get_doctor(doctor_id: int):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None: 
        return {"message": "Doctor not found"}

    return doctor 