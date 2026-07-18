def make_uppercase(words):
    upper_words = []

    for word in words:
        upper_words.append(word.upper())

    return upper_words

print(make_uppercase(["cat", "dog", "sun"]))
print(make_uppercase(["hello", "Python"]))
print(make_uppercase([]))