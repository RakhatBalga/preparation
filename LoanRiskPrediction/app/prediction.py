def predict_loan_risk(income, loan_amount, credit_score, age):

    if age < 18: 
        prediction = "rejected"
        confidence = 1.0

    elif credit_score < 600:
        prediction = "high risk"
        confidence = 0.9

    elif loan_amount > income * 4: 
        prediction = "high risk"
        confidence = 0.85
    elif loan_amount > income * 2:
        prediction = "medium risk"
        confidence = 0.65
    else: 
        prediction = "low risk"
        confidence = 0.35
    
    result = {
        "prediction": prediction, 
        "confidence": confidence
    }

    return result 

print(predict_loan_risk(400000, 700000, 700, 17))   # rejected
print(predict_loan_risk(400000, 700000, 550, 25))   # high risk
print(predict_loan_risk(400000, 2000000, 700, 25))  # high risk
print(predict_loan_risk(400000, 1000000, 700, 25))  # medium risk
print(predict_loan_risk(400000, 700000, 700, 25))   # low risk