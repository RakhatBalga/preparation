from fastapi import APIRouter 

from app.db.fake_db import doctors
from app.services.doctor_service import find_doctor_by_id, find_doctors_by_specialization, create_doctor, update_doctor, delete_doctor

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("")
def get_doctors():
    return doctors

@router.get("/count")
def count_doctors():
    return {"count": len(doctors)}

@router.get("/search")
def search_doctors(specialization: str):
    return find_doctors_by_specialization(specialization)

@router.post("")
def add_doctor(doctor_data: dict):
    return create_doctor(doctor_data)

@router.get("/{doctor_id}")
def get_doctor(doctor_id: int):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None: 
        return {"message": "Doctor not found"}

    return doctor 

@router.put("/{doctor_id}")
def edit_doctor(doctor_id: int, doctor_data: dict):
    doctor = update_doctor(doctor_id, doctor_data)

    if doctor is None:
        return {"message": "Doctor not found"}

    return doctor

@router.delete("/{doctor_id}")
def remove_doctor(doctor_id: int):
    doctor = delete_doctor(doctor_id)

    if doctor is None: 
        return {"message": "Doctor not found"}

    return {"message": "Doctor deleted", "doctor": doctor}