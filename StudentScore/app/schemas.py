from pydantic import BaseModel, Field


class StudentInput(BaseModel):
    previous_score: float = Field(..., ge=0, le=100)
    hours_studied: float = Field(..., ge=0, le=24)
    attendance: float = Field(..., ge=0, le=100)


class Student(StudentInput):
    id: int


class PredictionResponse(BaseModel):
    predicted_score: float
    passed: bool