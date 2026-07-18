def get_numbers_between_5_and_15(numbers):
    between = []

    for number in numbers:
        if number >= 5 and number <= 15:
            between.append(number)
    return between

print(get_numbers_between_5_and_15([2, 5, 8, 15, 20, 3, 14]))
