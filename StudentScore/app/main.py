from fastapi import FastAPI, HTTPException

from app.prediction import predict_score
from app.schemas import StudentInput, Student, PredictionResponse

app = FastAPI()

students = [
    {"id": 1, "previous_score": 65, "hours_studied": 4, "attendance": 75},
    {"id": 2, "previous_score": 80, "hours_studied": 3, "attendance": 90},
    {"id": 3, "previous_score": 55, "hours_studied": 6, "attendance": 85},
]

@app.get("/")
def root():
    return {"message": "Student Score Predictor API"}


@app.post("/predict", response_model=PredictionResponse)
def predict(student: StudentInput):
    result = predict_score(student)
    return result

@app.get("/students", response_model=list[Student])
def get_students():
    return students

@app.post("/students", response_model=Student)
def create_student(student: StudentInput):
    new_id = students[-1]["id"] + 1

    new_student = { 
        "id": new_id, 
        "previous_score": student.previous_score,
        "hours_studied": student.hours_studied,
        "attendance": student.attendance,
    }

    students.append(new_student)
    return new_student

@app.get("/students/{student_id}", response_model=Student)
def get_student(student_id: int):
    for student in students:
        if student["id"] == student_id:
            return student

    raise HTTPException(status_code=404, detail="Student not found")

@app.delete("/students/{student_id}", response_model=Student)
def delete_student(student_id: int):
    for index, student in enumerate(students):
        if student["id"] == student_id:
            deleted_student = students.pop(index)
            return deleted_student

    raise HTTPException(status_code=404, detail="Student not found")

@app.put("/students/{student_id}", response_model=Student)
def update_student(student_id: int):
    for index, student in enumerate(students):
        if student["id"] == student_id:
            student_data = update_student.model_dump()
            student_data["id"] = student_id

            students[index] = student_data

            return student_data

        raise HTTPException(status_code=404, detail="Student not found")