from fastapi import APIRouter, HTTPException

from app.db.fake_db import doctors
from app.schemas.doctor import (
    DoctorCreate,
    DoctorDeleteResponse,
    DoctorRead,
    DoctorUpdate,
)
from app.services.doctor_service import (
    create_doctor,
    delete_doctor,
    find_doctor_by_id,
    find_doctors_by_specialization,
    update_doctor,
)

router = APIRouter(prefix="/doctors", tags=["doctors"])


@router.get("", response_model=list[DoctorRead])
def get_doctors():
    return doctors


@router.get("/count")
def count_doctors():
    return {"count": len(doctors)}


@router.get("/search", response_model=list[DoctorRead])
def search_doctors(specialization: str):
    return find_doctors_by_specialization(specialization)


@router.post("", response_model=DoctorRead, status_code=201)
def add_doctor(doctor_data: DoctorCreate):
    return create_doctor(doctor_data.model_dump())


@router.get("/{doctor_id}", response_model=DoctorRead)
def get_doctor(doctor_id: int):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return doctor


@router.put("/{doctor_id}", response_model=DoctorRead)
def edit_doctor(doctor_id: int, doctor_data: DoctorUpdate):
    doctor = update_doctor(doctor_id, doctor_data.model_dump())

    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return doctor


@router.delete("/{doctor_id}", response_model=DoctorDeleteResponse)
def remove_doctor(doctor_id: int):
    doctor = delete_doctor(doctor_id)

    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return {"message": "Doctor deleted", "doctor": doctor}
