const STORAGE_KEY = "study-cards-state-v1";
const DEFAULT_TOPIC = "Без темы";
const DAY = 24 * 60 * 60 * 1000;
const SEED_VERSION = window.SEED_VERSION || "manual-v1";
const SEED_CARDS = Array.isArray(window.SEED_CARDS) ? window.SEED_CARDS : [];
const ESSAY_TYPE_LABELS = {
  opinion: "Opinion",
  discussion: "Discussion",
  "problem-solution": "Problem-Solution",
  "advantages-disadvantages": "Advantages/Disadvantages",
  "two-part-question": "Two-Part Question"
};
const VOCABULARY_CATEGORY_LABELS = {
  "general-academic": "Academic arguments",
  education: "Education / Development",
  technology: "Programming / Technology",
  "web-digital": "Web / Digital actions",
  environment: "Environment",
  society: "Society / Public issues",
  work: "Work / Career",
  "legal-official": "Legal / Official",
  property: "Work / Property"
};
const VOCABULARY_FLASHCARDS = [
  {
    "id": "vocab-001",
    "englishWord": "resilient",
    "pronunciation": "/rɪˈzɪliənt/",
    "pronunciationKk": "ризилиент",
    "definition": "Able to recover quickly after difficulty.",
    "partOfSpeech": "adjective",
    "exampleSentence": "She stayed resilient during the long interview process.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "work",
    "translationRu": "устойчивый, способный быстро восстановиться после трудностей"
  },
  {
    "id": "vocab-002",
    "englishWord": "concise",
    "pronunciation": "/kənˈsaɪs/",
    "pronunciationKk": "консайс",
    "definition": "Giving a lot of information clearly in a few words.",
    "partOfSpeech": "adjective",
    "exampleSentence": "Keep your answer concise when the interviewer asks about your last project.",
    "essayTypes": [
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "краткий и ясный"
  },
  {
    "id": "vocab-003",
    "englishWord": "iterate",
    "pronunciation": "/ˈɪtəreɪt/",
    "pronunciationKk": "итэрэйт",
    "definition": "To repeat a process and improve it step by step.",
    "partOfSpeech": "verb",
    "exampleSentence": "We iterate on the feature after each round of feedback.",
    "essayTypes": [
      "problem-solution",
      "discussion"
    ],
    "category": "technology",
    "translationRu": "повторять и улучшать шаг за шагом"
  },
  {
    "id": "vocab-004",
    "englishWord": "of paramount importance",
    "pronunciation": "/əv ˈpærəmaʊnt ɪmˈpɔːrtəns/",
    "pronunciationKk": "ов пэрэмаунт импортанс",
    "definition": "Исключительно важный, первостепенной важности.",
    "partOfSpeech": "phrase",
    "exampleSentence": "Road safety is of paramount importance to governments worldwide.",
    "essayTypes": [
      "opinion",
      "advantages-disadvantages"
    ],
    "category": "general-academic",
    "translationRu": "первостепенной важности, исключительно важный"
  },
  {
    "id": "vocab-005",
    "englishWord": "prevailing view",
    "pronunciation": "/prɪˈveɪlɪŋ vjuː/",
    "pronunciationKk": "привэйлиң вью",
    "definition": "Преобладающее мнение, общепринятая точка зрения.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "The prevailing view holds that technology improves education, though not everyone agrees.",
    "essayTypes": [
      "discussion",
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "преобладающее мнение, общепринятая точка зрения"
  },
  {
    "id": "vocab-006",
    "englishWord": "on the grounds that",
    "pronunciation": "/ɒn ðə ˈɡraʊndz ðæt/",
    "pronunciationKk": "он зэ граундз зэт",
    "definition": "На том основании, что / по причине того, что.",
    "partOfSpeech": "conjunction phrase",
    "exampleSentence": "She rejected the proposal on the grounds that it was too expensive.",
    "essayTypes": [
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "на том основании, что; по причине того, что"
  },
  {
    "id": "vocab-007",
    "englishWord": "owing to",
    "pronunciation": "/ˈoʊɪŋ tuː/",
    "pronunciationKk": "оуиң ту",
    "definition": "Благодаря, вследствие, из-за.",
    "partOfSpeech": "preposition",
    "exampleSentence": "Owing to limited funding, the project was delayed by a year.",
    "essayTypes": [
      "problem-solution",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "из-за, вследствие, благодаря"
  },
  {
    "id": "vocab-008",
    "englishWord": "exemplified by",
    "pronunciation": "/ɪɡˈzemplɪfaɪd baɪ/",
    "pronunciationKk": "игзэмплифайд бай",
    "definition": "Иллюстрируется, примером чего служит.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "The trend is exemplified by the rapid growth of remote work since 2020.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "иллюстрируется чем-либо; примером служит"
  },
  {
    "id": "vocab-009",
    "englishWord": "a pressing issue",
    "pronunciation": "/ə ˈpresɪŋ ˈɪʃuː/",
    "pronunciationKk": "э прэсиң ишу",
    "definition": "Острая/неотложная проблема.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Climate change remains a pressing issue for policymakers.",
    "essayTypes": [
      "problem-solution",
      "two-part-question"
    ],
    "category": "society",
    "translationRu": "острая, неотложная проблема"
  },
  {
    "id": "vocab-010",
    "englishWord": "play a pivotal role in",
    "pronunciation": "/pleɪ ə ˈpɪvətəl roʊl ɪn/",
    "pronunciationKk": "плэй э пивотал роул ин",
    "definition": "Играть ключевую/решающую роль в.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Education plays a pivotal role in reducing poverty.",
    "essayTypes": [
      "opinion",
      "advantages-disadvantages"
    ],
    "category": "education",
    "translationRu": "играть ключевую роль в чем-либо"
  },
  {
    "id": "vocab-011",
    "englishWord": "give rise to",
    "pronunciation": "/ɡɪv raɪz tuː/",
    "pronunciationKk": "гив райз ту",
    "definition": "Приводить к, порождать, вызывать.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Rapid urbanization has given rise to serious traffic congestion.",
    "essayTypes": [
      "problem-solution",
      "advantages-disadvantages"
    ],
    "category": "society",
    "translationRu": "приводить к, порождать, вызывать"
  },
  {
    "id": "vocab-012",
    "englishWord": "have a detrimental impact on",
    "pronunciation": "/hæv ə ˌdetrɪˈmentəl ˈɪmpækt ɒn/",
    "pronunciationKk": "хэв э дэтримэнтал импэкт он",
    "definition": "Оказывать пагубное/негативное влияние на.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Excessive screen time can have a detrimental impact on children's sleep.",
    "essayTypes": [
      "advantages-disadvantages",
      "problem-solution"
    ],
    "category": "society",
    "translationRu": "оказывать негативное, пагубное влияние на"
  },
  {
    "id": "vocab-013",
    "englishWord": "strike a balance between",
    "pronunciation": "/straɪk ə ˈbæləns bɪˈtwiːn/",
    "pronunciationKk": "страйк э бэлэнс битвин",
    "definition": "Найти баланс/равновесие между.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Governments must strike a balance between economic growth and environmental protection.",
    "essayTypes": [
      "discussion",
      "two-part-question"
    ],
    "category": "general-academic",
    "translationRu": "найти баланс между"
  },
  {
    "id": "vocab-014",
    "englishWord": "place a strain on",
    "pronunciation": "/pleɪs ə streɪn ɒn/",
    "pronunciationKk": "плэйс э стрэйн он",
    "definition": "Создавать нагрузку на, обременять.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "A growing population places a strain on public healthcare systems.",
    "essayTypes": [
      "problem-solution",
      "advantages-disadvantages"
    ],
    "category": "society",
    "translationRu": "создавать нагрузку на, обременять"
  },
  {
    "id": "vocab-015",
    "englishWord": "mitigate the effects of",
    "pronunciation": "/ˈmɪtɪɡeɪt ði ɪˈfekts əv/",
    "pronunciationKk": "митигэйт зи ифэктс ов",
    "definition": "Смягчать/снижать последствия.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Renewable energy can help mitigate the effects of climate change.",
    "essayTypes": [
      "problem-solution"
    ],
    "category": "environment",
    "translationRu": "смягчать или снижать последствия чего-либо"
  },
  {
    "id": "vocab-016",
    "englishWord": "foster a sense of",
    "pronunciation": "/ˈfɒstər ə sens əv/",
    "pronunciationKk": "фостэр э сэнс ов",
    "definition": "Способствовать формированию, воспитывать (чувство/атмосферу).",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Team projects foster a sense of collaboration among students.",
    "essayTypes": [
      "advantages-disadvantages",
      "opinion"
    ],
    "category": "education",
    "translationRu": "способствовать формированию чувства чего-либо"
  },
  {
    "id": "vocab-017",
    "englishWord": "congestion",
    "pronunciation": "/kənˈdʒestʃən/",
    "pronunciationKk": "кенджэсчэн",
    "definition": "Overcrowding or blockage caused by too much traffic or too many things in one place.",
    "partOfSpeech": "noun",
    "exampleSentence": "Traffic congestion in the city center gets worse every summer.",
    "essayTypes": [
      "problem-solution",
      "two-part-question"
    ],
    "category": "society",
    "translationRu": "затор, перегруженность, скопление"
  },
  {
    "id": "vocab-018",
    "englishWord": "cognitive development",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Умственное развитие; a more academic replacement for 'brain is developing'.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Learning a foreign language at school can support children's cognitive development.",
    "essayTypes": [
      "opinion",
      "advantages-disadvantages"
    ],
    "category": "education",
    "translationRu": "умственное развитие"
  },
  {
    "id": "vocab-019",
    "englishWord": "formative years",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Годы становления, ранний формирующий период; useful when discussing long-term impact at a young age.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Habits developed during the formative years often influence a person's future academic performance.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "education",
    "translationRu": "годы становления, ранний формирующий период"
  },
  {
    "id": "vocab-020",
    "englishWord": "absorb information",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Усваивать информацию; more natural than saying 'learn easier'.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "Young learners often absorb information more effectively when lessons are interactive.",
    "essayTypes": [
      "opinion",
      "advantages-disadvantages"
    ],
    "category": "education",
    "translationRu": "усваивать информацию"
  },
  {
    "id": "vocab-021",
    "englishWord": "academic workload",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Учебная нагрузка; a precise phrase for the amount of schoolwork students have.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "An excessive academic workload can reduce students' motivation and mental well-being.",
    "essayTypes": [
      "problem-solution",
      "advantages-disadvantages"
    ],
    "category": "education",
    "translationRu": "учебная нагрузка"
  },
  {
    "id": "vocab-022",
    "englishWord": "age-appropriate methods",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Методы, соответствующие возрасту; a general academic way to describe suitable teaching methods.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Foreign languages should be taught through age-appropriate methods rather than pressure and memorization.",
    "essayTypes": [
      "problem-solution",
      "opinion"
    ],
    "category": "education",
    "translationRu": "методы, соответствующие возрасту"
  },
  {
    "id": "vocab-023",
    "englishWord": "linguistic confusion / interference",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Путаница между языками; an academic term for mixing up words or structures from different languages.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Some parents worry that early bilingual education may cause linguistic interference.",
    "essayTypes": [
      "discussion",
      "advantages-disadvantages"
    ],
    "category": "education",
    "translationRu": "путаница между языками, языковая интерференция"
  },
  {
    "id": "vocab-024",
    "englishWord": "long-term retention",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Долгосрочное запоминание; stronger than simple memorization when discussing lasting benefit.",
    "partOfSpeech": "noun phrase",
    "exampleSentence": "Regular practice is essential for long-term retention of new vocabulary.",
    "essayTypes": [
      "opinion",
      "problem-solution"
    ],
    "category": "education",
    "translationRu": "долгосрочное запоминание"
  },
  {
    "id": "vocab-025",
    "englishWord": "outweigh the drawbacks / outweigh the benefits",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Перевешивать недостатки/преимущества; useful for stating a clear final position.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "In my view, the benefits of early language learning outweigh the drawbacks.",
    "essayTypes": [
      "advantages-disadvantages",
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "перевешивать недостатки / перевешивать преимущества"
  },
  {
    "id": "vocab-026",
    "englishWord": "provided that",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "При условии, что; a precise conditional connector stronger than 'if'.",
    "partOfSpeech": "conjunction",
    "exampleSentence": "Children can benefit from learning another language provided that the lessons are age-appropriate.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "при условии, что"
  },
  {
    "id": "vocab-027",
    "englishWord": "a case can be made that",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Можно утверждать, что; good for introducing a nuanced opinion.",
    "partOfSpeech": "introductory phrase",
    "exampleSentence": "A case can be made that early language education improves both communication skills and confidence.",
    "essayTypes": [
      "discussion",
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "можно утверждать, что"
  },
  {
    "id": "vocab-028",
    "englishWord": "not without merit",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Не лишено смысла; useful for acknowledging an opposing view without fully agreeing.",
    "partOfSpeech": "phrase",
    "exampleSentence": "The argument against homework is not without merit, especially when children already face a heavy workload.",
    "essayTypes": [
      "discussion",
      "advantages-disadvantages"
    ],
    "category": "general-academic",
    "translationRu": "не лишено смысла"
  },
  {
    "id": "vocab-029",
    "englishWord": "to a certain extent",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "В определённой степени; a natural hedge for nuanced academic positions.",
    "partOfSpeech": "adverbial phrase",
    "exampleSentence": "To a certain extent, technology can replace traditional classroom activities.",
    "essayTypes": [
      "discussion",
      "two-part-question"
    ],
    "category": "general-academic",
    "translationRu": "в определенной степени"
  },
  {
    "id": "vocab-030",
    "englishWord": "far outweighs any potential drawback",
    "pronunciation": "",
    "pronunciationKk": "",
    "definition": "Значительно перевешивает любые возможные недостатки.",
    "partOfSpeech": "verb phrase",
    "exampleSentence": "The long-term value of bilingual education far outweighs any potential drawback.",
    "essayTypes": [
      "advantages-disadvantages",
      "opinion"
    ],
    "category": "general-academic",
    "translationRu": "значительно перевешивает любой возможный недостаток"
  },
  {
    "id": "vocab-031",
    "englishWord": "warrant",
    "pronunciation": "/ˈwɔːrənt/",
    "pronunciationKk": "уорэнт",
    "definition": "A legal document that gives official permission for an action; as a verb, to justify or make something necessary.",
    "partOfSpeech": "noun / verb",
    "exampleSentence": "The police need a warrant to search private property.",
    "essayTypes": [
      "discussion",
      "problem-solution"
    ],
    "category": "legal-official",
    "translationRu": "ордер, официальное разрешение; оправдывать, служить основанием"
  },
  {
    "id": "vocab-032",
    "englishWord": "browse",
    "pronunciation": "/braʊz/",
    "pronunciationKk": "брауз",
    "definition": "To look through websites, pages, files, or items casually without searching for one exact thing.",
    "partOfSpeech": "verb",
    "exampleSentence": "Many students browse educational websites to find extra learning materials.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "web-digital",
    "translationRu": "просматривать сайты, страницы или материалы"
  },
  {
    "id": "vocab-033",
    "englishWord": "closures",
    "pronunciation": "/ˈkloʊʒərz/",
    "pronunciationKk": "клоужэрз",
    "definition": "Programming functions that remember variables from the scope where they were created.",
    "partOfSpeech": "plural noun",
    "exampleSentence": "Closures are useful when a function needs to keep access to private state.",
    "essayTypes": [],
    "category": "technology",
    "translationRu": "замыкания в программировании"
  },
  {
    "id": "vocab-034",
    "englishWord": "vacant",
    "pronunciation": "/ˈveɪkənt/",
    "pronunciationKk": "вэйкэнт",
    "definition": "Empty, available, or not currently occupied, especially for jobs, rooms, or seats.",
    "partOfSpeech": "adjective",
    "exampleSentence": "The company has several vacant positions for junior developers.",
    "essayTypes": [
      "problem-solution",
      "discussion"
    ],
    "category": "property",
    "translationRu": "свободный, незанятый, вакантный"
  },
  {
    "id": "vocab-035",
    "englishWord": "undeniable",
    "pronunciation": "/ˌʌndɪˈnaɪəbəl/",
    "pronunciationKk": "андинайэбл",
    "definition": "Clearly true or impossible to deny; useful for making a strong academic claim.",
    "partOfSpeech": "adjective",
    "exampleSentence": "It is undeniable that technology has changed the way students access information.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "неоспоримый, очевидный, такой, который невозможно отрицать"
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
  cardList: document.querySelector("#cardList"),
  exportButton: document.querySelector("#exportButton"),
  makeAllDueButton: document.querySelector("#makeAllDueButton"),
  vocabPosition: document.querySelector("#vocabPosition"),
  vocabAccuracy: document.querySelector("#vocabAccuracy"),
  vocabCard: document.querySelector("#vocabCard"),
  vocabCardInner: document.querySelector("#vocabCardInner"),
  vocabWord: document.querySelector("#vocabWord"),
  vocabPronunciation: document.querySelector("#vocabPronunciation"),
  vocabPronunciationKk: document.querySelector("#vocabPronunciationKk"),
  vocabPartOfSpeech: document.querySelector("#vocabPartOfSpeech"),
  vocabDefinition: document.querySelector("#vocabDefinition"),
  vocabTranslation: document.querySelector("#vocabTranslation"),
  vocabExample: document.querySelector("#vocabExample"),
  vocabTags: document.querySelector("#vocabTags"),
  vocabCategoryFilter: document.querySelector("#vocabCategoryFilter"),
  essayTypeFilter: document.querySelector("#essayTypeFilter"),
  vocabPrevious: document.querySelector("#vocabPrevious"),
  vocabNext: document.querySelector("#vocabNext"),
  vocabNeedReview: document.querySelector("#vocabNeedReview"),
  vocabGotIt: document.querySelector("#vocabGotIt"),
  vocabStatus: document.querySelector("#vocabStatus"),
  vocabForm: document.querySelector("#vocabForm"),
  newVocabWord: document.querySelector("#newVocabWord"),
  newVocabPronunciation: document.querySelector("#newVocabPronunciation"),
  newVocabPronunciationKk: document.querySelector("#newVocabPronunciationKk"),
  newVocabDefinition: document.querySelector("#newVocabDefinition"),
  newVocabTranslation: document.querySelector("#newVocabTranslation"),
  newVocabPartOfSpeech: document.querySelector("#newVocabPartOfSpeech"),
  newVocabCategory: document.querySelector("#newVocabCategory"),
  newVocabExample: document.querySelector("#newVocabExample"),
  newVocabEssayTypes: document.querySelectorAll('input[name="essayType"]')
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

elements.essayTypeFilter.addEventListener("change", () => {
  state.essayType = elements.essayTypeFilter.value;
  state.vocabIndex = 0;
  state.vocabFlipped = false;
  saveState();
  renderVocabulary();
});

elements.vocabCategoryFilter.addEventListener("change", () => {
  state.vocabCategory = elements.vocabCategoryFilter.value;
  state.vocabIndex = 0;
  state.vocabFlipped = false;
  saveState();
  renderVocabulary();
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
  const pronunciation = elements.newVocabPronunciation.value.trim();
  const pronunciationKk = elements.newVocabPronunciationKk.value.trim();
  const definition = elements.newVocabDefinition.value.trim();
  const translationRu = elements.newVocabTranslation.value.trim();
  const partOfSpeech = elements.newVocabPartOfSpeech.value.trim() || "word";
  const category = elements.newVocabCategory.value;
  const exampleSentence = elements.newVocabExample.value.trim();
  const essayTypes = Array.from(elements.newVocabEssayTypes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (!englishWord || !definition) {
    return;
  }

  const card = {
    id: createId(),
    englishWord,
    pronunciation,
    pronunciationKk,
    definition,
    translationRu,
    partOfSpeech,
    category,
    exampleSentence: exampleSentence || `I want to remember the word "${englishWord}".`,
    essayTypes
  };

  state.customVocabulary.push(card);
  state.vocabCategory = "all";
  state.essayType = "all";
  elements.vocabCategoryFilter.value = "all";
  elements.essayTypeFilter.value = "all";
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
  const cards = getFilteredCards()
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
  elements.vocabCategoryFilter.value = state.vocabCategory || "all";
  elements.essayTypeFilter.value = state.essayType || "all";

  const cards = getVocabularyCards();
  const progress = getVocabularyProgress();

  elements.vocabPosition.textContent = `${cards.length ? state.vocabIndex + 1 : 0} / ${cards.length}`;
  elements.vocabAccuracy.textContent = `${progress.accuracy}%`;

  if (!cards.length) {
    elements.vocabWord.textContent = "No words for this filter yet";
    elements.vocabPronunciation.textContent = "";
    elements.vocabPronunciationKk.textContent = "";
    elements.vocabPartOfSpeech.textContent = "";
    elements.vocabDefinition.textContent = "";
    elements.vocabTranslation.textContent = "";
    elements.vocabExample.textContent = "";
    elements.vocabTags.innerHTML = "";
    elements.vocabPrevious.disabled = true;
    elements.vocabNext.disabled = true;
    elements.vocabStatus.textContent = "Try a different category or essay type filter.";
    return;
  }

  const card = getCurrentVocabularyCard();

  elements.vocabWord.textContent = card.englishWord;
  elements.vocabPronunciation.textContent = card.pronunciation || "";
  elements.vocabPronunciationKk.textContent = card.pronunciationKk || "";
  elements.vocabPartOfSpeech.textContent = card.partOfSpeech;
  elements.vocabDefinition.textContent = card.definition;
  elements.vocabTranslation.textContent = card.translationRu || "";
  elements.vocabExample.textContent = card.exampleSentence;
  elements.vocabTags.innerHTML = [
    card.category
      ? `<span class="tag-pill tag-pill-strong">${escapeHtml(VOCABULARY_CATEGORY_LABELS[card.category] || card.category)}</span>`
      : "",
    ...(card.essayTypes || []).map((type) => `<span class="tag-pill">${escapeHtml(ESSAY_TYPE_LABELS[type] || type)}</span>`)
  ]
    .filter(Boolean)
    .join("");
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
  const cards = [...VOCABULARY_FLASHCARDS, ...state.customVocabulary];
  const categoryFilteredCards =
    !state.vocabCategory || state.vocabCategory === "all"
      ? cards
      : cards.filter((card) => card.category === state.vocabCategory);

  if (!state.essayType || state.essayType === "all") {
    return categoryFilteredCards;
  }

  return categoryFilteredCards.filter((card) => (card.essayTypes || []).includes(state.essayType));
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
      essayType: parsed.essayType === "all" || parsed.essayType in ESSAY_TYPE_LABELS ? parsed.essayType : "all",
      vocabCategory:
        parsed.vocabCategory === "all" || parsed.vocabCategory in VOCABULARY_CATEGORY_LABELS
          ? parsed.vocabCategory
          : "all",
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
    customVocabulary: [],
    essayType: "all",
    vocabCategory: "all"
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

  const seedCards = getSeedCards();
  const seedById = new Map(seedCards.map((card) => [card.id, card]));
  const seedByQuestion = new Map(seedCards.map((card) => [card.question, card]));
  const updatedCards = loadedState.cards.map((card) => {
    const seedCard = seedById.get(card.id) || seedByQuestion.get(card.question);

    if (!seedCard) {
      return card;
    }

    return {
      ...card,
      topic: seedCard.topic,
      question: seedCard.question,
      options: seedCard.options,
      correctOption: seedCard.correctOption,
      answer: seedCard.answer,
      updatedAt: seedCard.updatedAt
    };
  });
  const existing = new Set([
    ...updatedCards.map((card) => card.id),
    ...updatedCards.map((card) => card.question)
  ]);
  const missingSeeds = seedCards.filter(
    (card) => !existing.has(card.id) && !existing.has(card.question)
  );

  return {
    ...loadedState,
    seedVersion: SEED_VERSION,
    cards: [...missingSeeds, ...updatedCards],
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
    translationRu: String(card.translationRu || "").trim(),
    partOfSpeech: String(card.partOfSpeech || "word").trim(),
    exampleSentence: String(card.exampleSentence || "").trim(),
    pronunciation: String(card.pronunciation || "").trim(),
    pronunciationKk: String(card.pronunciationKk || "").trim(),
    essayTypes: Array.isArray(card.essayTypes) ? card.essayTypes.filter((type) => type in ESSAY_TYPE_LABELS) : [],
    category: card.category in VOCABULARY_CATEGORY_LABELS ? card.category : "general-academic"
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
