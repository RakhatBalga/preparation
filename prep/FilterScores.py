def categorize_scores(scores):
    result = {
        "fail": 0,
        "pass": 0,
        "excellent": 0
    }

    for score in scores:
        if score < 60:
            result["fail"] = result["fail"] + 1
        elif score >= 60 and score <= 89:
            result["pass"] = result["pass"] + 1
        else:
            result["excellent"] = result["excellent"] + 1

    return result

print(categorize_scores([45, 60, 72, 89, 90, 100]))