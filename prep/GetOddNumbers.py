def get_odd_numbers(numbers):

    odds = []

    for number in numbers:
        if number % 2 == 1:
            odds.append(number)

    return odds

print(get_odd_numbers([1, 2, 3, 4, 5, 6, 7]))

def count_odd_numbers(numbers):

    total = 0

    for number in numbers:
        if number % 2 == 1:
            total = total + 1
    return total 
print(count_odd_numbers([1, 2, 3, 4, 5, 6, 7]))