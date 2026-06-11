from app.db.fake_db import doctors

def find_doctor_by_id(doctor_id: int):
    for doctor in doctors: 
        if doctor["id"] == doctor_id:
            return doctor 

    return None

def find_doctors_by_specialization(specialization: str):
    result = []

    for doctor in doctors:
        if doctor["specialization"].lower() == specialization.lower():
            result.append(doctor)
    
    return result

def create_doctor(doctor_data: dict):
    new_id = len(doctors) + 1

    new_doctor = {
        "id": new_id,
        "name": doctor_data["name"],
        "specialization": doctor_data["specialization"],
    }

    doctors.append(new_doctor)
    return new_doctor

def update_doctor(doctor_id: int, doctor_data: dict):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None:
        return None

    doctor["name"] = doctor_data["name"]
    doctor["specialization"] = doctor_data["specialization"]

    return doctor

def delete_doctor(doctor_id: int):
    doctor = find_doctor_by_id(doctor_id)

    if doctor is None: 
        return None

    doctors.remove(doctor)

    return doctor