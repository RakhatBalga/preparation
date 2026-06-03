def count_long_words(words):
    total = 0

    for word in words:
        if len(word) > 3:
            total = total + 1

    return total
print(count_long_words(["cat", "window", "sun", "code"]))  # 2
print(count_long_words(["hi", "to", "yes"]))              # 0
print(count_long_words(["python", "is", "fun"]))          # 1