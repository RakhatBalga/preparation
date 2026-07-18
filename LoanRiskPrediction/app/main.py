from fastapi import FastAPI

from app.schemas import LoanRequest, PredictionResponse
from app.prediction import predict_loan_risk

app = FastAPI()

@app.post("/predict", response_model=PredictionResponse)
def predict(request: LoanRequest):
    result = predict_loan_risk(
        income=request.income,
        loan_amount=request.loan_amount,
        credit_score=request.credit_score,
        age=request.age
    )

    return result