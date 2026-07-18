def predict_score(student):
    predicted_score = (
        student.previous_score + student.hours_studied * 2 + student.attendance * 0.1
    )

    if predicted_score > 100: 
        predicted_score = 100

    passed = predicted_score >= 60 and student.attendance >= 70

    return {
        "predicted_score": predicted_score,
        "passed": passed,
    }