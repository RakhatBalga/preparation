def get_big_numbers(numbers):

    big_list = []

    for number in numbers:
        if number > 10:
            big_list.append(number)
    return big_list

print(get_big_numbers([3, 12, 7, 25, 10, 18]))