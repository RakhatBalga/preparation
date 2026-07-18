def validate_user(user):
    if user["age"] < 18:
        return "too young"
    elif user["name"] == "":
        return "missing name"
    else: 
        return "valid user"

print(validate_user({
    "name": "Ali",
    "age": 17,
    "city": "Almaty"
}))