def count_even_number(numbers):

    total = 0

    for number in numbers:

        if number % 2 == 0:
            total = total + 1

    return total 

print(count_even_number([1,2,3,45,5,6,7,9,8]))