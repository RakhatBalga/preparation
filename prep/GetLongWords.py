def long_words(words):

    longs = []

    for word in words: 
        if len(word) >= 3:
            longs.append(word)
    return longs


print(long_words(["cat", "elephant", "dog", "hi", "computer"]))