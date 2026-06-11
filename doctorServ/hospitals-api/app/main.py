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


@app.get("/doctors/count")
def get_doctors_count():
    return {"count": len(doctors)}

@app.get("/doctors/search")
def search_doctors(specialization: str):
    result = []

    for doctor in doctors: 
        if doctor["specialization"].lower() == specialization.lower():
            result.append(doctor)

    return result

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

    if doctors:
        new_id = max(existing_doctor["id"] for existing_doctor in doctors) + 1
    else:
        new_id = 1

    doctor["id"] = new_id
    doctors.append(doctor)
    return doctor


@app.put("/doctors/{doctor_id}")
def update_doctor(doctor_id: int, updated_doctor: dict):
    if "name" not in updated_doctor or "specialization" not in updated_doctor:
        raise HTTPException(status_code=400, detail="Name and specialization are required")

    for doctor in doctors:
        if doctor["id"] == doctor_id:
            doctor["name"] = updated_doctor["name"]
            doctor["specialization"] = updated_doctor["specialization"]
            return doctor

    raise HTTPException(status_code=404, detail="Doctor not found")


@app.delete("/doctors/{doctor_id}")
def delete_doctor(doctor_id: int):
    for doctor in doctors:
        if doctor["id"] == doctor_id:
            doctors.remove(doctor)
            return {"message": "Doctor deleted"}

    raise HTTPException(status_code=404, detail="Doctor not found")