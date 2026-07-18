def get_user_city(user):
    return user["city"]

print(get_user_city({
    "name": "Ali",
    "age": 23,
    "city": "Astana"
}))