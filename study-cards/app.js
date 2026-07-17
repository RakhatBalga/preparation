const STORAGE_KEY = "study-cards-state-v1";
const DEFAULT_TOPIC = "Без темы";
const DAY = 24 * 60 * 60 * 1000;

const state = loadState();

const elements = {
  totalCount: document.querySelector("#totalCount"),
  dueCount: document.querySelector("#dueCount"),
  masteredCount: document.querySelector("#masteredCount"),
  accuracyValue: document.querySelector("#accuracyValue"),
  sessionHint: document.querySelector("#sessionHint"),
  topicFilter: document.querySelector("#topicFilter"),
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
  makeAllDueButton: document.querySelector("#makeAllDueButton")
};

let editingId = null;

render();

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
    state.currentId = card.id;
  }

  elements.cardForm.reset();
  elements.saveCardButton.textContent = "Добавить";
  elements.cancelEditButton.classList.add("hidden");
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
  state.currentId = null;
  state.answerVisible = false;
  saveState();
  render();
});

elements.searchInput.addEventListener("input", renderLibrary);

elements.reviewArea.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) {
    return;
  }

  if (action === "reveal") {
    state.answerVisible = true;
    saveState();
    renderReview();
    return;
  }

  if (action === "skip") {
    state.currentId = pickNextCardId({ skipId: state.currentId });
    state.answerVisible = false;
    saveState();
    renderReview();
    return;
  }

  if (["again", "hard", "good"].includes(action)) {
    rateCurrentCard(action);
    state.currentId = pickNextCardId();
    state.answerVisible = false;
    saveState();
    render();
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
    if (state.currentId === card.id) {
      state.currentId = null;
      state.answerVisible = false;
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
    state.currentId = cards[0] ? state.cards[0].id : state.currentId;
    state.answerVisible = false;
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
    answer: card.answer,
    progress: {
      box: card.box,
      dueAt: card.dueAt,
      reviews: card.reviews,
      correct: card.correct,
      wrong: card.wrong,
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
  state.currentId = pickNextCardId();
  state.answerVisible = false;
  saveState();
  render();
});

function render() {
  renderStats();
  renderTopics();
  renderReview();
  renderLibrary();
}

function renderStats() {
  const total = state.cards.length;
  const due = getFilteredCards().filter(isDue).length;
  const mastered = state.cards.filter((card) => card.box >= 4).length;
  const attempts = state.cards.reduce((sum, card) => sum + card.correct + card.wrong, 0);
  const correct = state.cards.reduce((sum, card) => sum + card.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;

  elements.totalCount.textContent = total;
  elements.dueCount.textContent = due;
  elements.masteredCount.textContent = mastered;
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

function renderReview() {
  const cards = getFilteredCards();

  if (!cards.length) {
    elements.sessionHint.textContent = "Добавь вопросы или импортируй готовый список.";
    elements.reviewArea.innerHTML = `
      <p class="empty-title">Пока нет карточек</p>
      <p class="empty-text">Когда вопросы появятся, здесь будет основной режим тренировки.</p>
    `;
    return;
  }

  const dueCards = cards.filter(isDue);
  if (!dueCards.length) {
    const nextCard = [...cards].sort((a, b) => a.dueAt - b.dueAt)[0];
    elements.sessionHint.textContent = `Следующее повторение: ${formatDateTime(nextCard.dueAt)}`;
    elements.reviewArea.innerHTML = `
      <p class="empty-title">На сегодня все</p>
      <p class="empty-text">Можно нажать «Повторить все», если хочешь прогнать карточки еще раз.</p>
    `;
    return;
  }

  if (!state.currentId || !dueCards.some((card) => card.id === state.currentId)) {
    state.currentId = pickNextCardId();
    state.answerVisible = false;
    saveState();
  }

  const card = findCard(state.currentId);
  if (!card) {
    return;
  }

  elements.sessionHint.textContent = `${dueCards.length} ${pluralize(dueCards.length, [
    "карточка",
    "карточки",
    "карточек"
  ])} к повторению`;

  elements.reviewArea.innerHTML = `
    <div>
      <p class="question-label">${escapeHtml(card.topic)} · повторений: ${card.reviews}</p>
      <p class="question-text">${escapeHtml(card.question)}</p>
    </div>
    ${
      state.answerVisible
        ? `<div class="answer-box">
            <p class="question-label">Ответ</p>
            <p class="answer-text">${escapeHtml(card.answer)}</p>
          </div>
          <div class="rating-actions" aria-label="Оценка ответа">
            <button class="button button-secondary" data-action="again" type="button">Не знаю</button>
            <button class="button button-secondary" data-action="hard" type="button">Сложно</button>
            <button class="button button-primary" data-action="good" type="button">Знаю</button>
          </div>`
        : `<div class="rating-actions">
            <button class="button button-primary" data-action="reveal" type="button">Показать ответ</button>
            <button class="button button-secondary" data-action="skip" type="button">Пропустить</button>
          </div>`
    }
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
    .sort((a, b) => Number(isDue(b)) - Number(isDue(a)) || b.createdAt.localeCompare(a.createdAt));

  if (!cards.length) {
    elements.cardList.innerHTML = `<p class="empty-text">Здесь пока ничего нет.</p>`;
    return;
  }

  elements.cardList.innerHTML = cards
    .map((card) => {
      const dueText = isDue(card) ? "к повторению" : `след.: ${formatDateTime(card.dueAt)}`;
      return `
        <article class="library-item">
          <p class="card-title">${escapeHtml(trimText(card.question, 120))}</p>
          <p class="card-meta">${escapeHtml(card.topic)} · ${dueText} · уровень ${card.box}</p>
          <div class="card-actions">
            <button class="button button-secondary small-button" data-action="edit" data-id="${card.id}" type="button">Править</button>
            <button class="button button-secondary small-button" data-action="reset" data-id="${card.id}" type="button">Сброс</button>
            <button class="button button-secondary button-danger small-button" data-action="delete" data-id="${card.id}" type="button">Удалить</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function rateCurrentCard(rating) {
  const card = findCard(state.currentId);
  if (!card) {
    return;
  }

  const now = Date.now();
  card.reviews += 1;
  card.lastReviewedAt = new Date(now).toISOString();

  if (rating === "again") {
    card.wrong += 1;
    card.box = 0;
    card.dueAt = now + 10 * 60 * 1000;
  }

  if (rating === "hard") {
    card.correct += 1;
    card.box = Math.max(1, card.box);
    card.dueAt = now + DAY;
  }

  if (rating === "good") {
    card.correct += 1;
    card.box = Math.min(5, card.box + 1);
    card.dueAt = now + getIntervalDays(card.box) * DAY;
  }
}

function resetProgress(card) {
  card.box = 0;
  card.dueAt = Date.now();
  card.reviews = 0;
  card.correct = 0;
  card.wrong = 0;
  card.lastReviewedAt = null;
}

function pickNextCardId(options = {}) {
  const dueCards = getFilteredCards()
    .filter((card) => isDue(card) && card.id !== options.skipId)
    .sort((a, b) => a.dueAt - b.dueAt || a.createdAt.localeCompare(b.createdAt));

  if (dueCards.length) {
    return dueCards[0].id;
  }

  if (options.skipId) {
    return options.skipId;
  }

  return null;
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
  return {
    id: input.id || createId(),
    topic: cleanTopic(input.topic),
    question: String(input.question || input.q || "").trim(),
    answer: String(input.answer || input.a || "").trim(),
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
    box: Number(progress.box ?? input.box ?? 0),
    dueAt: Number(progress.dueAt ?? input.dueAt ?? Date.now()),
    reviews: Number(progress.reviews ?? input.reviews ?? 0),
    correct: Number(progress.correct ?? input.correct ?? 0),
    wrong: Number(progress.wrong ?? input.wrong ?? 0),
    lastReviewedAt: progress.lastReviewedAt || input.lastReviewedAt || null
  };
}

function parseImport(raw) {
  const parsedCards = parseJsonImport(raw) || parsePlainTextImport(raw);
  return parsedCards
    .map((item) => ({
      topic: cleanTopic(item.topic || item.category || item.subject),
      question: String(item.question || item.q || "").trim(),
      answer: String(item.answer || item.a || "").trim(),
      progress: item.progress,
      box: item.box,
      dueAt: item.dueAt,
      reviews: item.reviews,
      correct: item.correct,
      wrong: item.wrong,
      lastReviewedAt: item.lastReviewedAt
    }))
    .filter((item) => item.question && item.answer);
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
  const fallback = {
    cards: [],
    topic: "all",
    currentId: null,
    answerVisible: false
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || !Array.isArray(parsed.cards)) {
      return fallback;
    }

    return {
      ...fallback,
      ...parsed,
      cards: parsed.cards.map(createCard)
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
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
