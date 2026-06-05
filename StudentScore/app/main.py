from fastapi import FastAPI

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