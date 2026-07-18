def get_short_words(words):
    shorts = []

    for word in words:
        if len(word) <= 3:
            shorts.append(word)
    return shorts

print(get_short_words(["cat", "elephant", "dog", "hi", "computer"]))