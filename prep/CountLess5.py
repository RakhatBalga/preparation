def count_less_than_5(numbers):

    total = 0

    for number in numbers:
        if number < 5:
            total = total + 1

    return total 

print(count_less_than_5([1, 7, 3, 5, 0, 9]))