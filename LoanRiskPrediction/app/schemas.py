from pydantic import BaseModel, Field


class LoanRequest(BaseModel):
    income: float = Field(gt=0)
    loan_amount: float = Field(gt=0)
    credit_score: int = Field(ge=300, le=850)
    age: int = Field(ge=0)


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float = Field(ge=0, le=1)
