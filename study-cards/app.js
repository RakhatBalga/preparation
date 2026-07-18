const STORAGE_KEY = "study-cards-state-v1";
const DEFAULT_TOPIC = "Без темы";
const DAY = 24 * 60 * 60 * 1000;
const SEED_VERSION = window.SEED_VERSION || "manual-v1";
const SEED_CARDS = Array.isArray(window.SEED_CARDS) ? window.SEED_CARDS : [];
const VOCABULARY_FLASHCARDS = [
  {
    id: "vocab-001",
    englishWord: "resilient",
    definition: "Able to recover quickly after difficulty.",
    partOfSpeech: "adjective",
    exampleSentence: "She stayed resilient during the long interview process."
  },
  {
    id: "vocab-002",
    englishWord: "concise",
    definition: "Giving a lot of information clearly in a few words.",
    partOfSpeech: "adjective",
    exampleSentence: "Keep your answer concise when the interviewer asks about your last project."
  },
  {
    id: "vocab-003",
    englishWord: "iterate",
    definition: "To repeat a process and improve it step by step.",
    partOfSpeech: "verb",
    exampleSentence: "We iterate on the feature after each round of feedback."
  }
];

const state = loadState();

const elements = {
  totalCount: document.querySelector("#totalCount"),
  questionsView: document.querySelector("#questionsView"),
  vocabularyView: document.querySelector("#vocabularyView"),
  viewButtons: document.querySelectorAll(".view-button"),
  dueCount: document.querySelector("#dueCount"),
  masteredCount: document.querySelector("#masteredCount"),
  mistakesCount: document.querySelector("#mistakesCount"),
  accuracyValue: document.querySelector("#accuracyValue"),
  sessionHint: document.querySelector("#sessionHint"),
  topicFilter: document.querySelector("#topicFilter"),
  modeButtons: document.querySelectorAll(".mode-button"),
  reviewArea: document.querySelector("#reviewArea"),
  cardForm: document.querySelector("#cardForm"),
  topicInput: document.querySelector("#topicInput"),
  questionInput: document.querySelector("#questionInput"),
  answerInput: document.querySelector("#answerInput"),
  saveCardButton: document.querySelector("#saveCardButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  importInput: document.querySelector("#importInput"),
  importButton: document.querySelector("#importButton"),
  importStatus: document.querySelector("#importStatus"),
  loadSampleButton: document.querySelector("#loadSampleButton"),
  searchInput: document.querySelector("#searchInput"),
  cardList: document.querySelector("#cardList"),
  exportButton: document.querySelector("#exportButton"),
  makeAllDueButton: document.querySelector("#makeAllDueButton"),
  vocabPosition: document.querySelector("#vocabPosition"),
  vocabAccuracy: document.querySelector("#vocabAccuracy"),
  vocabCard: document.querySelector("#vocabCard"),
  vocabCardInner: document.querySelector("#vocabCardInner"),
  vocabWord: document.querySelector("#vocabWord"),
  vocabPartOfSpeech: document.querySelector("#vocabPartOfSpeech"),
  vocabDefinition: document.querySelector("#vocabDefinition"),
  vocabExample: document.querySelector("#vocabExample"),
  vocabPrevious: document.querySelector("#vocabPrevious"),
  vocabNext: document.querySelector("#vocabNext"),
  vocabNeedReview: document.querySelector("#vocabNeedReview"),
  vocabGotIt: document.querySelector("#vocabGotIt"),
  vocabStatus: document.querySelector("#vocabStatus"),
  vocabForm: document.querySelector("#vocabForm"),
  newVocabWord: document.querySelector("#newVocabWord"),
  newVocabDefinition: document.querySelector("#newVocabDefinition"),
  newVocabPartOfSpeech: document.querySelector("#newVocabPartOfSpeech"),
  newVocabExample: document.querySelector("#newVocabExample")
};

let editingId = null;

render();
saveState();

elements.viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeView = button.dataset.view;
    saveState();
    render();
  });
});

elements.cardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = elements.questionInput.value.trim();
  const answer = elements.answerInput.value.trim();
  const topic = cleanTopic(elements.topicInput.value);

  if (!question || !answer) {
    return;
  }

  if (editingId) {
    const card = findCard(editingId);
    if (card) {
      card.question = question;
      card.answer = answer;
      card.topic = topic;
      card.updatedAt = new Date().toISOString();
    }
    editingId = null;
  } else {
    const card = createCard({ question, answer, topic });
    state.cards.unshift(card);
    state.currentIndex = 0;
    state.currentId = card.id;
  }

  elements.cardForm.reset();
  elements.saveCardButton.textContent = "Добавить";
  elements.cancelEditButton.classList.add("hidden");
  resetAnswerView();
  saveState();
  render();
});

elements.cancelEditButton.addEventListener("click", () => {
  editingId = null;
  elements.cardForm.reset();
  elements.saveCardButton.textContent = "Добавить";
  elements.cancelEditButton.classList.add("hidden");
});

elements.topicFilter.addEventListener("change", () => {
  state.topic = elements.topicFilter.value;
  state.currentIndex = 0;
  state.currentId = null;
  resetAnswerView();
  saveState();
  render();
});

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    state.currentIndex = 0;
    state.currentId = null;
    resetAnswerView();
    saveState();
    render();
  });
});

elements.searchInput.addEventListener("input", renderLibrary);

elements.reviewArea.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === "prev") {
    navigateReview(-1);
    return;
  }

  if (action === "next" || action === "skip") {
    navigateReview(1);
    return;
  }

  if (action === "reveal") {
    const card = getCurrentCard();
    state.answeredCardId = card ? card.id : null;
    state.answerVisible = true;
    saveState();
    render();
    return;
  }

  if (action === "pick-option") {
    answerCurrentCard(button.dataset.option);
    return;
  }

  if (["again", "hard", "good"].includes(action)) {
    rateCurrentCard(action);
    navigateReview(1, { alreadySaved: true });
  }
});

elements.cardList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const card = findCard(button.dataset.id);
  if (!card) {
    return;
  }

  if (button.dataset.action === "open") {
    openCardInAnswers(card.id);
    return;
  }

  if (button.dataset.action === "edit") {
    editingId = card.id;
    elements.topicInput.value = card.topic === DEFAULT_TOPIC ? "" : card.topic;
    elements.questionInput.value = card.question;
    elements.answerInput.value = card.answer;
    elements.saveCardButton.textContent = "Сохранить";
    elements.cancelEditButton.classList.remove("hidden");
    elements.questionInput.focus();
    return;
  }

  if (button.dataset.action === "reset") {
    resetProgress(card);
    saveState();
    render();
    return;
  }

  if (button.dataset.action === "delete") {
    const shouldDelete = window.confirm("Удалить карточку?");
    if (!shouldDelete) {
      return;
    }
    state.cards = state.cards.filter((item) => item.id !== card.id);
    state.currentIndex = clampIndex(state.currentIndex, getReviewCards().length);
    if (state.currentId === card.id) {
      state.currentId = null;
      resetAnswerView();
    }
    saveState();
    render();
  }
});

elements.importButton.addEventListener("click", () => {
  const raw = elements.importInput.value.trim();
  if (!raw) {
    setImportStatus("Вставь JSON или текст с вопросами.", true);
    return;
  }

  try {
    const cards = parseImport(raw);
    if (!cards.length) {
      setImportStatus("Не нашел ни одного вопроса.", true);
      return;
    }

    state.cards = [...cards.map(createCard), ...state.cards];
    state.currentIndex = 0;
    state.currentId = state.cards[0] ? state.cards[0].id : null;
    resetAnswerView();
    elements.importInput.value = "";
    saveState();
    render();
    setImportStatus(`Импортировано: ${cards.length}`);
  } catch (error) {
    setImportStatus(error.message, true);
  }
});

elements.loadSampleButton.addEventListener("click", () => {
  elements.importInput.value = JSON.stringify(
    [
      {
        topic: "Пример",
        question: "Что делает режим повторения?",
        answer: "Показывает вопрос, затем ответ и переносит карточку на следующую дату по твоей оценке."
      },
      {
        topic: "Пример",
        question: "Можно ли добавить вопросы позже?",
        answer: "Да. Их можно добавить вручную или импортировать списком."
      }
    ],
    null,
    2
  );
  setImportStatus("");
});

elements.exportButton.addEventListener("click", () => {
  const payload = state.cards.map((card) => ({
    topic: card.topic,
    question: card.question,
    options: card.options,
    correctOption: card.correctOption,
    answer: card.answer,
    progress: {
      box: card.box,
      dueAt: card.dueAt,
      reviews: card.reviews,
      correct: card.correct,
      wrong: card.wrong,
      lastPickedOption: card.lastPickedOption,
      lastResult: card.lastResult,
      lastReviewedAt: card.lastReviewedAt
    }
  }));

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `study-cards-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

elements.makeAllDueButton.addEventListener("click", () => {
  const now = Date.now();
  state.cards.forEach((card) => {
    card.dueAt = now;
  });
  state.mode = "practice";
  state.currentIndex = 0;
  state.currentId = null;
  resetAnswerView();
  saveState();
  render();
});

elements.vocabCard.addEventListener("click", () => {
  toggleVocabularyCard();
});

elements.vocabPrevious.addEventListener("click", () => {
  navigateVocabulary(-1);
});

elements.vocabNext.addEventListener("click", () => {
  navigateVocabulary(1);
});

elements.vocabGotIt.addEventListener("click", () => {
  rateVocabularyCard("got");
});

elements.vocabNeedReview.addEventListener("click", () => {
  rateVocabularyCard("review");
});

elements.vocabForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const englishWord = elements.newVocabWord.value.trim();
  const definition = elements.newVocabDefinition.value.trim();
  const partOfSpeech = elements.newVocabPartOfSpeech.value.trim() || "word";
  const exampleSentence = elements.newVocabExample.value.trim();

  if (!englishWord || !definition) {
    return;
  }

  const card = {
    id: createId(),
    englishWord,
    definition,
    partOfSpeech,
    exampleSentence: exampleSentence || `I want to remember the word "${englishWord}".`
  };

  state.customVocabulary.push(card);
  state.vocabIndex = getVocabularyCards().length - 1;
  state.vocabFlipped = false;
  elements.vocabForm.reset();
  saveState();
  renderVocabulary();
});

document.addEventListener("keydown", (event) => {
  if (state.activeView !== "vocabulary" || isTypingTarget(event.target)) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    toggleVocabularyCard();
  }

  if (event.key === "ArrowLeft") {
    navigateVocabulary(-1);
  }

  if (event.key === "ArrowRight") {
    navigateVocabulary(1);
  }
});

function render() {
  renderActiveView();
  renderStats();
  renderTopics();
  renderModeButtons();
  renderReview();
  renderLibrary();
  renderVocabulary();
}

function renderActiveView() {
  const activeView = state.activeView === "vocabulary" ? "vocabulary" : "questions";
  state.activeView = activeView;
  elements.questionsView.classList.toggle("hidden", activeView !== "questions");
  elements.vocabularyView.classList.toggle("hidden", activeView !== "vocabulary");
  elements.viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === activeView);
  });
}

function renderStats() {
  const total = state.cards.length;
  const due = getFilteredCards().filter(isDue).length;
  const mastered = state.cards.filter((card) => card.box >= 4).length;
  const mistakes = state.cards.filter((card) => card.wrong > 0).length;
  const attempts = state.cards.reduce((sum, card) => sum + card.correct + card.wrong, 0);
  const correct = state.cards.reduce((sum, card) => sum + card.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;

  elements.totalCount.textContent = total;
  elements.dueCount.textContent = due;
  elements.masteredCount.textContent = mastered;
  elements.mistakesCount.textContent = mistakes;
  elements.accuracyValue.textContent = `${accuracy}%`;
}

function renderTopics() {
  const previous = state.topic || "all";
  const topics = [...new Set(state.cards.map((card) => card.topic))].sort((a, b) =>
    a.localeCompare(b, "ru")
  );

  elements.topicFilter.innerHTML = [
    `<option value="all">Все темы</option>`,
    ...topics.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`)
  ].join("");

  elements.topicFilter.value = topics.includes(previous) ? previous : "all";
  state.topic = elements.topicFilter.value;
}

function renderModeButtons() {
  elements.modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });
}

function renderReview() {
  const allCards = getFilteredCards();
  const cards = getReviewCards();

  if (!allCards.length) {
    elements.sessionHint.textContent = "Добавь вопросы или импортируй готовый список.";
    elements.reviewArea.innerHTML = `
      <p class="empty-title">Пока нет карточек</p>
      <p class="empty-text">Когда вопросы появятся, здесь будет основной режим тренировки.</p>
    `;
    return;
  }

  if (!cards.length) {
    renderEmptyMode(allCards);
    return;
  }

  state.currentIndex = clampIndex(state.currentIndex, cards.length);
  const card = cards[state.currentIndex];
  state.currentId = card.id;

  const position = `${state.currentIndex + 1} / ${cards.length}`;
  const showAnswer = state.mode !== "practice" || state.answerVisible;
  const cardStatus = getCardProgressSummary(card);
  elements.sessionHint.textContent = getSessionHint(cards.length, position);

  elements.reviewArea.innerHTML = `
    <div class="review-toolbar">
      <span>${escapeHtml(getModeLabel(state.mode))}</span>
      <strong>${position}</strong>
    </div>
    <div>
      <p class="question-label">${escapeHtml(card.topic)} · ${escapeHtml(cardStatus)}</p>
      <p class="question-text">${escapeHtml(card.question)}</p>
    </div>
    ${renderOptions(card, showAnswer)}
    ${showAnswer ? renderAnswer(card) : ""}
    ${renderReviewControls(card, showAnswer)}
  `;
}

function renderEmptyMode(allCards) {
  if (state.mode === "practice") {
    const nextCard = [...allCards].sort((a, b) => a.dueAt - b.dueAt)[0];
    elements.sessionHint.textContent = `Следующее повторение: ${formatDateTime(nextCard.dueAt)}`;
    elements.reviewArea.innerHTML = `
      <p class="empty-title">На сегодня все</p>
      <p class="empty-text">Можно нажать «Повторить все», если хочешь прогнать карточки еще раз.</p>
    `;
    return;
  }

  if (state.mode === "mistakes") {
    elements.sessionHint.textContent = "Ошибок пока нет.";
    elements.reviewArea.innerHTML = `
      <p class="empty-title">Ошибок нет</p>
      <p class="empty-text">Когда ответишь неправильно, карточки появятся здесь.</p>
    `;
  }
}

function renderOptions(card, showAnswer) {
  if (!card.options.length) {
    return "";
  }

  return `
    <div class="option-list" aria-label="Варианты ответа">
      ${card.options
        .map((option) => {
          const picked = state.selectedOption === option.key;
          const wasLastPicked = state.mode === "mistakes" && card.lastPickedOption === option.key;
          const isCorrect = option.key === card.correctOption;
          const statusClass = showAnswer
            ? isCorrect
              ? "is-correct"
              : picked || wasLastPicked
                ? "is-wrong"
                : ""
            : "";
          const disabled = showAnswer || state.mode !== "practice" ? "disabled" : "";

          return `
            <button class="option-button ${statusClass}" data-action="pick-option" data-option="${escapeHtml(option.key)}" type="button" ${disabled}>
              <strong>${escapeHtml(option.key)}</strong>
              <span>${escapeHtml(option.text)}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAnswer(card) {
  const pickedOption = getOptionText(card, state.selectedOption);
  const lastPickedOption = getOptionText(card, card.lastPickedOption);
  const selectedFeedback = state.selectedOption
    ? state.selectedOption === card.correctOption
      ? `<p class="answer-feedback is-correct-text">Правильно: ${escapeHtml(pickedOption)}</p>`
      : `<p class="answer-feedback is-wrong-text">Ошибка: выбран ${escapeHtml(pickedOption)}</p>`
    : "";
  const lastMistake =
    state.mode === "mistakes" && card.lastPickedOption && card.lastPickedOption !== card.correctOption
      ? `<p class="answer-feedback is-wrong-text">Последняя ошибка: ${escapeHtml(lastPickedOption)}</p>`
      : "";

  return `
    <div class="answer-box">
      <p class="question-label">Правильный ответ</p>
      <p class="answer-text">${escapeHtml(card.answer || getOptionText(card, card.correctOption))}</p>
      ${selectedFeedback || lastMistake}
    </div>
  `;
}

function renderReviewControls(card, showAnswer) {
  const previousDisabled = state.currentIndex <= 0 ? "disabled" : "";
  const nextDisabled = state.currentIndex >= getReviewCards().length - 1 ? "disabled" : "";
  const practiceActions =
    state.mode === "practice"
      ? renderPracticeActions(card, showAnswer)
      : "";

  return `
    <div class="review-controls">
      <div class="nav-actions">
        <button class="button button-secondary" data-action="prev" type="button" ${previousDisabled}>Назад</button>
        <button class="button button-secondary" data-action="next" type="button" ${nextDisabled}>Вперед</button>
      </div>
      ${practiceActions}
    </div>
  `;
}

function renderPracticeActions(card, showAnswer) {
  if (!showAnswer) {
    return `
      <div class="rating-actions">
        <button class="button button-primary" data-action="reveal" type="button">Показать ответ</button>
        <button class="button button-secondary" data-action="skip" type="button">Пропустить</button>
      </div>
    `;
  }

  if (card.options.length && state.selectedOption) {
    return `
      <div class="rating-actions">
        <button class="button button-primary" data-action="next" type="button">Дальше</button>
      </div>
    `;
  }

  return `
    <div class="rating-actions" aria-label="Оценка ответа">
      <button class="button button-secondary" data-action="again" type="button">Не знаю</button>
      <button class="button button-secondary" data-action="hard" type="button">Сложно</button>
      <button class="button button-primary" data-action="good" type="button">Знаю</button>
    </div>
  `;
}

function renderLibrary() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const cards = getFilteredCards()
    .filter((card) => {
      if (!query) {
        return true;
      }
      return `${card.question} ${card.answer} ${card.topic}`.toLowerCase().includes(query);
    })
    .sort((a, b) => Number(isDue(b)) - Number(isDue(a)) || a.createdAt.localeCompare(b.createdAt));

  if (!cards.length) {
    elements.cardList.innerHTML = `<p class="empty-text">Здесь пока ничего нет.</p>`;
    return;
  }

  elements.cardList.innerHTML = cards
    .map((card) => {
      const dueText = isDue(card) ? "к повторению" : `след.: ${formatDateTime(card.dueAt)}`;
      const mistakeText = card.wrong ? `ошибок: ${card.wrong}` : "ошибок нет";
      return `
        <article class="library-item">
          <p class="card-title">${escapeHtml(trimText(card.question, 120))}</p>
          <p class="card-meta">${escapeHtml(card.topic)} · ${dueText} · ${mistakeText} · ${getCardAccuracy(card)}</p>
          <div class="card-actions">
            <button class="button button-secondary small-button" data-action="open" data-id="${card.id}" type="button">Открыть</button>
            <button class="button button-secondary small-button" data-action="edit" data-id="${card.id}" type="button">Править</button>
            <button class="button button-secondary small-button" data-action="reset" data-id="${card.id}" type="button">Сброс</button>
            <button class="button button-secondary button-danger small-button" data-action="delete" data-id="${card.id}" type="button">Удалить</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderVocabulary() {
  const cards = getVocabularyCards();
  const card = getCurrentVocabularyCard();
  const position = `${state.vocabIndex + 1} / ${cards.length}`;
  const progress = getVocabularyProgress();

  elements.vocabPosition.textContent = position;
  elements.vocabAccuracy.textContent = `${progress.accuracy}%`;
  elements.vocabWord.textContent = card.englishWord;
  elements.vocabPartOfSpeech.textContent = card.partOfSpeech;
  elements.vocabDefinition.textContent = card.definition;
  elements.vocabExample.textContent = card.exampleSentence;
  elements.vocabCardInner.classList.toggle("is-flipped", state.vocabFlipped);
  elements.vocabPrevious.disabled = state.vocabIndex === 0;
  elements.vocabNext.disabled = state.vocabIndex === cards.length - 1;
  elements.vocabStatus.textContent = getVocabularyStatusText(card);
}

function answerCurrentCard(optionKey) {
  const card = getCurrentCard();
  if (!card || state.answerVisible || state.mode !== "practice") {
    return;
  }

  state.currentId = card.id;
  state.answeredCardId = card.id;
  const isCorrect = optionKey === card.correctOption;
  updateProgressFromAnswer(card, isCorrect, optionKey);
  state.selectedOption = optionKey;
  state.answerVisible = true;
  saveState();
  render();
}

function rateCurrentCard(rating) {
  const card = getCurrentCard();
  if (!card) {
    return;
  }

  state.currentId = card.id;
  state.answeredCardId = card.id;
  const now = Date.now();
  card.reviews += 1;
  card.lastPickedOption = null;
  card.lastReviewedAt = new Date(now).toISOString();

  if (rating === "again") {
    card.wrong += 1;
    card.box = 0;
    card.dueAt = now + 10 * 60 * 1000;
    card.lastResult = "wrong";
  }

  if (rating === "hard") {
    card.correct += 1;
    card.box = Math.max(1, card.box);
    card.dueAt = now + DAY;
    card.lastResult = "correct";
  }

  if (rating === "good") {
    card.correct += 1;
    card.box = Math.min(5, card.box + 1);
    card.dueAt = now + getIntervalDays(card.box) * DAY;
    card.lastResult = "correct";
  }

  saveState();
}

function updateProgressFromAnswer(card, isCorrect, optionKey) {
  const now = Date.now();
  card.reviews += 1;
  card.lastPickedOption = optionKey;
  card.lastResult = isCorrect ? "correct" : "wrong";
  card.lastReviewedAt = new Date(now).toISOString();

  if (isCorrect) {
    card.correct += 1;
    card.box = Math.min(5, card.box + 1);
    card.dueAt = now + getIntervalDays(card.box) * DAY;
    return;
  }

  card.wrong += 1;
  card.box = 0;
  card.dueAt = now + 10 * 60 * 1000;
}

function resetProgress(card) {
  card.box = 0;
  card.dueAt = Date.now();
  card.reviews = 0;
  card.correct = 0;
  card.wrong = 0;
  card.lastPickedOption = null;
  card.lastResult = null;
  card.lastReviewedAt = null;
}

function navigateReview(delta, options = {}) {
  const cardsBefore = getReviewCards();
  if (!cardsBefore.length) {
    return;
  }

  const previousIndex = state.currentIndex;
  const previousCard =
    state.answeredCardId && state.answerVisible
      ? cardsBefore.find((card) => card.id === state.answeredCardId)
      : cardsBefore[previousIndex];
  const wasShowingPracticeAnswer = state.mode === "practice" && state.answerVisible;
  resetAnswerView();
  const cardsAfter = getReviewCards();
  const previousCardStillVisible = cardsAfter.some((card) => card.id === previousCard?.id);
  const targetIndex =
    wasShowingPracticeAnswer && delta > 0 && !previousCardStillVisible
      ? previousIndex
      : previousIndex + delta;

  state.currentIndex = clampIndex(targetIndex, cardsAfter.length);
  state.currentId = cardsAfter[state.currentIndex] ? cardsAfter[state.currentIndex].id : null;

  if (!options.alreadySaved) {
    saveState();
  } else {
    saveState();
  }

  render();
}

function openCardInAnswers(cardId) {
  state.mode = "answers";
  resetAnswerView();
  const cards = getReviewCards("answers");
  const index = cards.findIndex((card) => card.id === cardId);
  state.currentIndex = Math.max(0, index);
  state.currentId = cardId;
  saveState();
  render();
}

function resetAnswerView() {
  state.answerVisible = false;
  state.selectedOption = null;
  state.answeredCardId = null;
}

function toggleVocabularyCard() {
  state.vocabFlipped = !state.vocabFlipped;
  saveState();
  renderVocabulary();
}

function navigateVocabulary(delta) {
  state.vocabIndex = clampIndex(state.vocabIndex + delta, getVocabularyCards().length);
  state.vocabFlipped = false;
  saveState();
  renderVocabulary();
}

function rateVocabularyCard(result) {
  const card = getCurrentVocabularyCard();
  const progress = state.vocabProgress[card.id] || { got: 0, review: 0, lastResult: null };

  if (result === "got") {
    progress.got += 1;
    progress.lastResult = "Got it";
  } else {
    progress.review += 1;
    progress.lastResult = "Need Review";
  }

  progress.lastReviewedAt = new Date().toISOString();
  state.vocabProgress[card.id] = progress;
  saveState();
  renderVocabulary();
}

function getCurrentVocabularyCard() {
  const cards = getVocabularyCards();
  state.vocabIndex = clampIndex(state.vocabIndex, cards.length);
  return cards[state.vocabIndex];
}

function getVocabularyCards() {
  return [...VOCABULARY_FLASHCARDS, ...state.customVocabulary];
}

function getVocabularyProgress() {
  const totals = Object.values(state.vocabProgress).reduce(
    (accumulator, item) => ({
      got: accumulator.got + Number(item.got || 0),
      review: accumulator.review + Number(item.review || 0)
    }),
    { got: 0, review: 0 }
  );
  const attempts = totals.got + totals.review;
  return {
    ...totals,
    accuracy: attempts ? Math.round((totals.got / attempts) * 100) : 0
  };
}

function getVocabularyStatusText(card) {
  const progress = state.vocabProgress[card.id];

  if (!progress || !progress.lastResult) {
    return "No review yet for this word.";
  }

  return `${progress.lastResult} · got ${progress.got || 0} · review ${progress.review || 0}`;
}

function getCurrentCard() {
  const cards = getReviewCards();
  state.currentIndex = clampIndex(state.currentIndex, cards.length);
  return cards[state.currentIndex] || null;
}

function getReviewCards(mode = state.mode) {
  const cards = getFilteredCards();

  if (mode === "answers") {
    return cards;
  }

  if (mode === "mistakes") {
    return cards.filter((card) => card.wrong > 0);
  }

  const dueCards = cards.filter(isDue);

  if (mode === "practice" && state.answerVisible && state.answeredCardId) {
    const currentCard = cards.find((card) => card.id === state.answeredCardId);
    const alreadyVisible = dueCards.some((card) => card.id === state.answeredCardId);
    if (currentCard && !alreadyVisible) {
      const insertAt = clampIndex(state.currentIndex, dueCards.length + 1);
      return [
        ...dueCards.slice(0, insertAt),
        currentCard,
        ...dueCards.slice(insertAt)
      ];
    }
  }

  return dueCards;
}

function getFilteredCards() {
  if (!state.topic || state.topic === "all") {
    return state.cards;
  }
  return state.cards.filter((card) => card.topic === state.topic);
}

function isDue(card) {
  return Number(card.dueAt || 0) <= Date.now();
}

function findCard(id) {
  return state.cards.find((card) => card.id === id);
}

function createCard(input) {
  const now = new Date().toISOString();
  const progress = input.progress || {};
  const options = normalizeOptions(input.options);
  const correctOption = String(input.correctOption || input.correct || "").trim().toUpperCase();
  const correctText = getOptionText({ options }, correctOption);

  return {
    id: input.id || createId(),
    topic: cleanTopic(input.topic),
    question: String(input.question || input.q || "").trim(),
    options,
    correctOption,
    answer: String(input.answer || input.a || correctText || "").trim(),
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
    box: Number(progress.box ?? input.box ?? 0),
    dueAt: Number(progress.dueAt ?? input.dueAt ?? Date.now()),
    reviews: Number(progress.reviews ?? input.reviews ?? 0),
    correct: Number(progress.correct ?? input.correctCount ?? input.correctAnswers ?? 0),
    wrong: Number(progress.wrong ?? input.wrong ?? 0),
    lastPickedOption: progress.lastPickedOption || input.lastPickedOption || null,
    lastResult: progress.lastResult || input.lastResult || null,
    lastReviewedAt: progress.lastReviewedAt || input.lastReviewedAt || null
  };
}

function normalizeOptions(options) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options
    .map((option, index) => {
      if (typeof option === "string") {
        const match = option.trim().match(/^([A-D])\)\s*(.*)$/i);
        return {
          key: match ? match[1].toUpperCase() : String.fromCharCode(65 + index),
          text: match ? match[2].trim() : option.trim()
        };
      }

      return {
        key: String(option.key || String.fromCharCode(65 + index)).trim().toUpperCase(),
        text: String(option.text || option.value || "").trim()
      };
    })
    .filter((option) => option.key && option.text);
}

function parseImport(raw) {
  const parsedCards = parseJsonImport(raw) || parsePlainTextImport(raw);
  return parsedCards
    .map((item) => ({
      topic: cleanTopic(item.topic || item.category || item.subject),
      question: String(item.question || item.q || "").trim(),
      options: item.options,
      correctOption: item.correctOption || item.correct,
      answer: String(item.answer || item.a || "").trim(),
      progress: item.progress,
      box: item.box,
      dueAt: item.dueAt,
      reviews: item.reviews,
      correctCount: item.correctCount,
      correctAnswers: item.correctAnswers,
      wrong: item.wrong,
      lastPickedOption: item.lastPickedOption,
      lastResult: item.lastResult,
      lastReviewedAt: item.lastReviewedAt
    }))
    .filter((item) => item.question && (item.answer || item.correctOption));
}

function parseJsonImport(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (Array.isArray(parsed.cards)) {
      return parsed.cards;
    }
    if (Array.isArray(parsed.questions)) {
      return parsed.questions;
    }
    return null;
  } catch {
    return null;
  }
}

function parsePlainTextImport(raw) {
  return raw
    .split(/\n\s*\n/g)
    .map((block) => {
      const questionMatch = block.match(/(?:^|\n)\s*(?:q|вопрос)\s*:\s*([\s\S]*?)(?=\n\s*(?:a|ответ)\s*:)/i);
      const answerMatch = block.match(/(?:^|\n)\s*(?:a|ответ)\s*:\s*([\s\S]*)/i);
      return {
        question: questionMatch ? questionMatch[1].trim() : "",
        answer: answerMatch ? answerMatch[1].trim() : ""
      };
    })
    .filter((item) => item.question && item.answer);
}

function loadState() {
  const fallback = defaultState(getSeedCards());

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || !Array.isArray(parsed.cards)) {
      return fallback;
    }

    return applySeedData({
      ...defaultState(),
      ...parsed,
      activeView: parsed.activeView === "vocabulary" ? "vocabulary" : "questions",
      mode: isValidMode(parsed.mode) ? parsed.mode : "practice",
      currentIndex: Number.isFinite(parsed.currentIndex) ? parsed.currentIndex : 0,
      selectedOption: parsed.selectedOption || null,
      answeredCardId: parsed.answeredCardId || null,
      vocabIndex: Number.isFinite(parsed.vocabIndex) ? parsed.vocabIndex : 0,
      vocabFlipped: Boolean(parsed.vocabFlipped),
      vocabProgress: parsed.vocabProgress || {},
      customVocabulary: Array.isArray(parsed.customVocabulary)
        ? parsed.customVocabulary.map(normalizeVocabularyCard).filter(Boolean)
        : [],
      cards: parsed.cards.map(createCard)
    });
  } catch {
    return fallback;
  }
}

function defaultState(cards = []) {
  return {
    cards,
    seedVersion: SEED_VERSION,
    activeView: "questions",
    topic: "all",
    mode: "practice",
    currentIndex: 0,
    currentId: null,
    answerVisible: false,
    selectedOption: null,
    answeredCardId: null,
    vocabIndex: 0,
    vocabFlipped: false,
    vocabProgress: {},
    customVocabulary: []
  };
}

function getSeedCards() {
  return SEED_CARDS.map((card) =>
    createCard({
      ...card,
      createdAt: "2026-07-17T00:00:00.000Z",
      updatedAt: "2026-07-17T00:00:00.000Z"
    })
  );
}

function applySeedData(loadedState) {
  if (loadedState.seedVersion === SEED_VERSION) {
    return loadedState;
  }

  const existing = new Set([
    ...loadedState.cards.map((card) => card.id),
    ...loadedState.cards.map((card) => card.question)
  ]);
  const missingSeeds = getSeedCards().filter(
    (card) => !existing.has(card.id) && !existing.has(card.question)
  );

  return {
    ...loadedState,
    seedVersion: SEED_VERSION,
    cards: [...missingSeeds, ...loadedState.cards],
    currentIndex: 0
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isValidMode(mode) {
  return ["practice", "answers", "mistakes"].includes(mode);
}

function cleanTopic(topic) {
  const value = String(topic || "").trim();
  return value || DEFAULT_TOPIC;
}

function getIntervalDays(box) {
  return [0, 1, 3, 7, 14, 30][box] || 30;
}

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `card-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSessionHint(count, position) {
  if (state.mode === "answers") {
    return `Все ответы · ${position}`;
  }

  if (state.mode === "mistakes") {
    return `Карточки с ошибками · ${position}`;
  }

  return `${count} ${pluralize(count, ["карточка", "карточки", "карточек"])} к повторению · ${position}`;
}

function getModeLabel(mode) {
  if (mode === "answers") {
    return "Все ответы";
  }
  if (mode === "mistakes") {
    return "Ошибки";
  }
  return "Тренировка";
}

function getOptionText(card, optionKey) {
  if (!optionKey || !Array.isArray(card.options)) {
    return "";
  }
  const option = card.options.find((item) => item.key === optionKey);
  return option ? `${option.key}) ${option.text}` : "";
}

function getCardProgressSummary(card) {
  return `попыток: ${card.reviews} · ${getCardAccuracy(card)}`;
}

function getCardAccuracy(card) {
  const attempts = card.correct + card.wrong;
  if (!attempts) {
    return "точность 0%";
  }
  return `точность ${Math.round((card.correct / attempts) * 100)}%`;
}

function clampIndex(index, length) {
  if (!length) {
    return 0;
  }
  return Math.min(Math.max(Number(index) || 0, 0), length - 1);
}

function isTypingTarget(target) {
  const tagName = target && target.tagName ? target.tagName.toLowerCase() : "";
  return tagName === "input" || tagName === "textarea" || tagName === "select";
}

function normalizeVocabularyCard(card) {
  if (!card || !card.englishWord || !card.definition) {
    return null;
  }

  return {
    id: card.id || createId(),
    englishWord: String(card.englishWord).trim(),
    definition: String(card.definition).trim(),
    partOfSpeech: String(card.partOfSpeech || "word").trim(),
    exampleSentence: String(card.exampleSentence || "").trim()
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trimText(value, length) {
  const text = String(value);
  return text.length > length ? `${text.slice(0, length - 1)}...` : text;
}

function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

function pluralize(count, forms) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return forms[0];
  }
  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return forms[1];
  }
  return forms[2];
}

function setImportStatus(message, isError = false) {
  elements.importStatus.textContent = message;
  elements.importStatus.classList.toggle("tone-warning", isError);
}
