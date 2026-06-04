def make_prediction_response(label, confidence):
    result = {
        "prediction": label,
        "confidence": confidence
    }

    return result


print(make_prediction_response("high risk", 0.87))
print(make_prediction_response("low risk", 0.41))