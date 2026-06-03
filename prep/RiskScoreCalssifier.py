def classify_risk(age, income, has_debt):
    risk_score = 0

    if age < 25:
        risk_score = risk_score + 1

    if income < 30000:
        risk_score = risk_score + 1

    if has_debt == True:
        risk_score = risk_score + 1

    if risk_score == 0:
        return "low risk"

    elif risk_score == 1:
        return "medium_risk"

    else: 
        return "high risk"

print(classify_risk(22, 25000, True))    # high risk
print(classify_risk(30, 50000, False))   # low risk
print(classify_risk(23, 50000, False))   # medium risk
print(classify_risk(40, 20000, True))    # high risk