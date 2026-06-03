def find_biggest(numbers):
    biggest = numbers[0]

    for number in numbers:
        if number > biggest:
            biggest = number

    return biggest

print(find_biggest([1, 5, 2, 9, 3]))
print(find_biggest([-10, -3, -20]))
print(find_biggest([7]))