const STORAGE_KEY = "study-cards-state-v1";
const BACKUP_FORMAT = "preparation-backup-v1";
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
    "definition": "Extremely important or more important than anything else.",
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
    "definition": "An opinion or belief that is most common or widely accepted.",
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
    "definition": "Because of a particular reason or justification.",
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
    "definition": "Because of, or as a result of, a particular cause.",
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
    "definition": "Clearly illustrated or demonstrated by a specific example.",
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
    "definition": "An urgent and important problem that requires immediate attention.",
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
    "definition": "To be extremely important in determining an outcome.",
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
    "definition": "To cause something to happen or develop.",
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
    "definition": "To cause serious harm or negative effects to something.",
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
    "definition": "To achieve a reasonable compromise between two competing needs or interests.",
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
    "definition": "To put excessive pressure or demands on a person, system, or resource.",
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
    "definition": "To make harmful consequences less severe or easier to manage.",
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
    "definition": "To encourage the development of a particular feeling, quality, or atmosphere.",
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
    "definition": "The growth of a person's ability to think, understand, learn, and solve problems.",
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
    "definition": "The early period of life when a person's character, abilities, and attitudes develop.",
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
    "definition": "To understand and remember new knowledge or ideas.",
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
    "definition": "The amount of study, assignments, and other academic work required of a student.",
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
    "definition": "Teaching techniques or activities designed to suit learners at a particular age.",
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
    "definition": "Difficulty caused when one language affects the understanding or use of another.",
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
    "definition": "The ability to remember information for an extended period.",
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
    "definition": "To be more significant or influential than the disadvantages or advantages being compared.",
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
    "definition": "Only if a particular condition is satisfied.",
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
    "definition": "A phrase used to introduce a reasonable argument or supportable point of view.",
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
    "definition": "Having some value or validity despite possible weaknesses.",
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
    "definition": "Partly, but not completely.",
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
    "definition": "To be substantially more important than any possible disadvantage.",
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
  },
  {
    "id": "vocab-036",
    "englishWord": "constraints",
    "pronunciation": "/kənˈstreɪnts/",
    "pronunciationKk": "констрэйнтс",
    "definition": "Limits, restrictions, or conditions that control what is possible.",
    "partOfSpeech": "plural noun",
    "exampleSentence": "Financial constraints can prevent schools from buying modern equipment.",
    "essayTypes": [
      "problem-solution",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "ограничения, рамки, сдерживающие условия"
  },
  {
    "id": "vocab-037",
    "englishWord": "beyond",
    "pronunciation": "/bɪˈjɑːnd/",
    "pronunciationKk": "биёнд",
    "definition": "Further than a point, limit, or situation; outside the range of something.",
    "partOfSpeech": "preposition / adverb",
    "exampleSentence": "The benefits of education go beyond simply finding a better job.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "за пределами, вне, дальше чем"
  },
  {
    "id": "vocab-038",
    "englishWord": "commute",
    "pronunciation": "/kəˈmjuːt/",
    "pronunciationKk": "комьют",
    "definition": "To travel regularly between home and work or school; also the journey itself.",
    "partOfSpeech": "verb / noun",
    "exampleSentence": "A long commute can reduce the amount of time people spend with their families.",
    "essayTypes": [
      "problem-solution",
      "discussion"
    ],
    "category": "work",
    "translationRu": "ездить на работу или учебу; ежедневная дорога"
  },
  {
    "id": "vocab-039",
    "englishWord": "precise",
    "pronunciation": "/prɪˈsaɪs/",
    "pronunciationKk": "присайс",
    "definition": "Exact, accurate, and clearly expressed.",
    "partOfSpeech": "adjective",
    "exampleSentence": "Using precise vocabulary can make an IELTS essay more convincing.",
    "essayTypes": [
      "opinion",
      "discussion"
    ],
    "category": "general-academic",
    "translationRu": "точный, четкий, конкретный"
  },
  {
      "id": "vocab-040",
      "englishWord": "flexibility",
      "pronunciation": "/ˌfleksəˈbɪləti/",
      "pronunciationKk": "флексибилити",
      "definition": "The ability to choose or change how, when, or where something is done.",
      "partOfSpeech": "noun",
      "exampleSentence": "Remote work gives employees greater flexibility in choosing when and where they work.",
      "essayTypes": [
          "opinion",
          "discussion"
      ],
      "category": "work",
      "translationRu": "гибкость, возможность выбирать формат или время работы"
  },
  {
      "id": "vocab-041",
      "englishWord": "productivity dips",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "Periods when a person or group becomes less productive than usual.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Productivity dips may occur when employees work from home without clear routines.",
      "essayTypes": [
          "problem-solution",
          "discussion"
      ],
      "category": "work",
      "translationRu": "снижение продуктивности, спад производительности"
  },
  {
      "id": "vocab-042",
      "englishWord": "the need to commute",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "The necessity of travelling regularly between home and work or school.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Remote work removes the need to commute, saving employees both time and money.",
      "essayTypes": [
          "problem-solution",
          "advantages-disadvantages"
      ],
      "category": "work",
      "translationRu": "необходимость ездить на работу или учебу"
  },
  {
      "id": "vocab-043",
      "englishWord": "get distracted by non-work-related tasks",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "To lose attention because of tasks that are not connected to work.",
      "partOfSpeech": "verb phrase",
      "exampleSentence": "Some remote employees get distracted by non-work-related tasks at home.",
      "essayTypes": [
          "problem-solution",
          "discussion"
      ],
      "category": "work",
      "translationRu": "отвлекаться на задачи, не связанные с работой"
  },
  {
      "id": "vocab-044",
      "englishWord": "in-person interaction",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "Communication that happens face to face in the same physical place.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "In-person interaction can strengthen trust between colleagues.",
      "essayTypes": [
          "discussion",
          "advantages-disadvantages"
      ],
      "category": "work",
      "translationRu": "личное общение, взаимодействие лицом к лицу"
  },
  {
      "id": "vocab-045",
      "englishWord": "work-life balance",
      "pronunciation": "/ˌwɜːrk laɪf ˈbæləns/",
      "pronunciationKk": "уорк лайф бэлэнс",
      "definition": "A healthy balance between job responsibilities and personal life.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Remote work can improve work-life balance, but only if employees set clear boundaries.",
      "essayTypes": [
          "opinion",
          "advantages-disadvantages"
      ],
      "category": "work",
      "translationRu": "баланс между работой и личной жизнью"
  },
  {
      "id": "vocab-046",
      "englishWord": "micromanagement",
      "pronunciation": "/ˌmaɪkroʊˈmænɪdʒmənt/",
      "pronunciationKk": "майкроумэниджмэнт",
      "definition": "A management style where a manager controls too many small details of employees’ work.",
      "partOfSpeech": "noun",
      "exampleSentence": "Some managers resort to micromanagement when they cannot see employees working in person.",
      "essayTypes": [
          "discussion",
          "problem-solution"
      ],
      "category": "work",
      "translationRu": "микроменеджмент, чрезмерный контроль"
  },
  {
      "id": "vocab-047",
      "englishWord": "collaborative environment",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "A setting that encourages people to work together and share ideas.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Open-plan offices are designed to foster a collaborative environment.",
      "essayTypes": [
          "discussion",
          "advantages-disadvantages"
      ],
      "category": "work",
      "translationRu": "среда для совместной работы"
  },
  {
      "id": "vocab-048",
      "englishWord": "burnout",
      "pronunciation": "/ˈbɜːrnaʊt/",
      "pronunciationKk": "бёрнаут",
      "definition": "Physical or emotional exhaustion caused by long-term stress, especially at work.",
      "partOfSpeech": "noun",
      "exampleSentence": "The blurred line between work and home life can contribute to burnout among remote workers.",
      "essayTypes": [
          "problem-solution",
          "discussion"
      ],
      "category": "work",
      "translationRu": "эмоциональное или профессиональное истощение, выгорание"
  },
  {
      "id": "vocab-049",
      "englishWord": "autonomy",
      "pronunciation": "/ɔːˈtɑːnəmi/",
      "pronunciationKk": "отономи",
      "definition": "The freedom to make decisions and control one’s own work or actions.",
      "partOfSpeech": "noun",
      "exampleSentence": "Remote work grants employees greater autonomy over their daily schedule.",
      "essayTypes": [
          "opinion",
          "discussion"
      ],
      "category": "work",
      "translationRu": "самостоятельность, автономия в работе"
  },
  {
      "id": "vocab-050",
      "englishWord": "isolation",
      "pronunciation": "/ˌaɪsəˈleɪʃən/",
      "pronunciationKk": "айсолэйшэн",
      "definition": "A state of being separated from other people, socially or professionally.",
      "partOfSpeech": "noun",
      "exampleSentence": "Prolonged remote work can lead to a sense of professional isolation.",
      "essayTypes": [
          "problem-solution",
          "discussion"
      ],
      "category": "work",
      "translationRu": "изоляция, социальная или профессиональная оторванность"
  },
  {
      "id": "vocab-051",
      "englishWord": "digital infrastructure",
      "pronunciation": "",
      "pronunciationKk": "",
      "definition": "The digital systems, networks, and tools needed for online work or services.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Reliable digital infrastructure is essential for remote work to function effectively.",
      "essayTypes": [
          "problem-solution",
          "discussion"
      ],
      "category": "web-digital",
      "translationRu": "цифровая инфраструктура"
  },
  {
      "id": "vocab-052",
      "englishWord": "redundant",
      "pronunciation": "/rɪˈdʌndənt/",
      "pronunciationKk": "ридандэнт",
      "definition": "No longer needed or useful; unnecessary because something else has replaced it.",
      "partOfSpeech": "adjective",
      "exampleSentence": "As more companies adopt remote policies, large office spaces may become redundant.",
      "essayTypes": [
          "advantages-disadvantages",
          "discussion"
      ],
      "category": "work",
      "translationRu": "избыточный, ненужный, лишний"
  },
  {
      "id": "vocab-053",
      "englishWord": "accountability",
      "pronunciation": "/əˌkaʊntəˈbɪləti/",
      "pronunciationKk": "экаунтэбилити",
      "definition": "Responsibility for results and the obligation to explain one’s actions.",
      "partOfSpeech": "noun",
      "exampleSentence": "Without direct supervision, remote work relies heavily on individual accountability.",
      "essayTypes": [
          "discussion",
          "problem-solution"
      ],
      "category": "work",
      "translationRu": "подотчетность, ответственность за результат"
  },
  {
      "id": "vocab-054",
      "englishWord": "inferior makes",
      "pronunciation": "/ɪnˈfɪəriər meɪks/",
      "pronunciationKk": "инфириэр мэйкс",
      "definition": "Brands or models that are lower in quality than competing alternatives.",
      "partOfSpeech": "noun phrase",
      "exampleSentence": "Consumers may initially save money by choosing inferior makes, but repair costs can be higher in the long term.",
      "essayTypes": [
          "opinion",
          "advantages-disadvantages"
      ],
      "category": "general-academic",
      "translationRu": "марки или модели более низкого качества"
  },
  {
      "id": "vocab-057",
      "englishWord": "peers",
      "pronunciation": "/pɪəz/",
      "pronunciationKk": "пиэрз",
      "definition": "People of the same age, social position, ability, or professional level.",
      "partOfSpeech": "plural noun",
      "exampleSentence": "Students often learn more confidently when they can discuss difficult ideas with their peers.",
      "essayTypes": [
          "opinion",
          "discussion"
      ],
      "category": "education",
      "translationRu": "сверстники; равные по положению или уровню"
  },
  {
      "id": "vocab-058",
      "englishWord": "spare",
      "pronunciation": "/speə/",
      "pronunciationKk": "спэа",
      "definition": "Extra and available for use; not currently needed for another purpose.",
      "partOfSpeech": "adjective / verb",
      "exampleSentence": "People with little spare time may prefer flexible online courses.",
      "essayTypes": [
          "opinion",
          "advantages-disadvantages"
      ],
      "category": "general-academic",
      "translationRu": "свободный, запасной, лишний; выделять или уделять"
  },
  {
      "id": "vocab-059",
      "englishWord": "vast",
      "pronunciation": "/vɑːst/",
      "pronunciationKk": "васт",
      "definition": "Extremely large in size, amount, area, or extent.",
      "partOfSpeech": "adjective",
      "exampleSentence": "The internet gives students access to a vast amount of information.",
      "essayTypes": [
          "opinion",
          "discussion",
          "advantages-disadvantages"
      ],
      "category": "general-academic",
      "translationRu": "огромный, обширный, необъятный"
  },
  {
      "id": "vocab-060",
      "englishWord": "duty",
      "pronunciation": "/ˈdjuːti/",
      "pronunciationKk": "дьюти",
      "definition": "A moral or legal responsibility that someone is expected to fulfil.",
      "partOfSpeech": "noun",
      "exampleSentence": "Governments have a duty to protect vulnerable members of society.",
      "essayTypes": ["opinion", "discussion"],
      "category": "society",
      "translationRu": "долг, обязанность"
  },
  {
      "id": "vocab-061",
      "englishWord": "compelling",
      "pronunciation": "/kəmˈpelɪŋ/",
      "pronunciationKk": "компэлинг",
      "definition": "Highly convincing, persuasive, or able to attract strong attention.",
      "partOfSpeech": "adjective",
      "exampleSentence": "There is compelling evidence that early education improves long-term outcomes.",
      "essayTypes": ["opinion", "discussion"],
      "category": "general-academic",
      "translationRu": "убедительный, веский; захватывающий"
  },
  {
      "id": "vocab-062",
      "englishWord": "cultivate",
      "pronunciation": "/ˈkʌltɪveɪt/",
      "pronunciationKk": "калтивэйт",
      "definition": "To develop a skill, quality, attitude, or relationship over time.",
      "partOfSpeech": "verb",
      "exampleSentence": "Schools should cultivate critical thinking rather than encourage rote memorisation.",
      "essayTypes": ["opinion", "discussion"],
      "category": "education",
      "translationRu": "развивать, формировать, воспитывать"
  },
  {
      "id": "vocab-063",
      "englishWord": "prudent",
      "pronunciation": "/ˈpruːdənt/",
      "pronunciationKk": "прудэнт",
      "definition": "Careful and sensible when making decisions, especially about future risks.",
      "partOfSpeech": "adjective",
      "exampleSentence": "It would be prudent to invest in preventive healthcare before costs increase further.",
      "essayTypes": ["opinion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "благоразумный, предусмотрительный"
  },
  {
      "id": "vocab-064",
      "englishWord": "aspirations",
      "pronunciation": "/ˌæspəˈreɪʃənz/",
      "pronunciationKk": "аспирэйшнз",
      "definition": "Strong hopes or ambitions to achieve something in the future.",
      "partOfSpeech": "plural noun",
      "exampleSentence": "Access to higher education can help young people fulfil their professional aspirations.",
      "essayTypes": ["opinion", "discussion"],
      "category": "education",
      "translationRu": "стремления, надежды, амбиции"
  },
  {
      "id": "vocab-065",
      "englishWord": "accumulate",
      "pronunciation": "/əˈkjuːmjəleɪt/",
      "pronunciationKk": "экьюмьюлэйт",
      "definition": "To collect or increase gradually over a period of time.",
      "partOfSpeech": "verb",
      "exampleSentence": "Students can accumulate substantial debt while completing a university degree.",
      "essayTypes": ["problem-solution", "advantages-disadvantages"],
      "category": "general-academic",
      "translationRu": "накапливать, собирать постепенно"
  },
  {
      "id": "vocab-066",
      "englishWord": "sufficient",
      "pronunciation": "/səˈfɪʃənt/",
      "pronunciationKk": "сэфишэнт",
      "definition": "Enough for a particular purpose or to meet a particular need.",
      "partOfSpeech": "adjective",
      "exampleSentence": "Public schools require sufficient funding to maintain high teaching standards.",
      "essayTypes": ["opinion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "достаточный"
  },
  {
      "id": "vocab-067",
      "englishWord": "severe",
      "pronunciation": "/sɪˈvɪə/",
      "pronunciationKk": "сивиэ",
      "definition": "Very serious, intense, harsh, or difficult to deal with.",
      "partOfSpeech": "adjective",
      "exampleSentence": "A shortage of affordable housing can cause severe social and economic problems.",
      "essayTypes": ["problem-solution", "discussion"],
      "category": "society",
      "translationRu": "серьёзный, тяжёлый, суровый"
  },
  {
      "id": "vocab-068",
      "englishWord": "narrows",
      "pronunciation": "/ˈnærəʊz/",
      "pronunciationKk": "нэрроуз",
      "definition": "Makes something more limited or causes a difference or gap to become smaller.",
      "partOfSpeech": "verb",
      "exampleSentence": "Equal access to technology narrows the educational gap between social groups.",
      "essayTypes": ["opinion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "сужает, сокращает, ограничивает"
  },
  {
      "id": "vocab-069",
      "englishWord": "dignity",
      "pronunciation": "/ˈdɪɡnəti/",
      "pronunciationKk": "дигнити",
      "definition": "The state of being worthy of respect and having a sense of self-respect.",
      "partOfSpeech": "noun",
      "exampleSentence": "Social welfare should allow elderly people to live independently and with dignity.",
      "essayTypes": ["opinion", "discussion"],
      "category": "society",
      "translationRu": "достоинство, самоуважение"
  },
  {
      "id": "vocab-070",
      "englishWord": "supplemented",
      "pronunciation": "/ˈsʌplɪmentɪd/",
      "pronunciationKk": "саплимэнтид",
      "definition": "Improved or completed by adding something extra.",
      "partOfSpeech": "verb / adjective",
      "exampleSentence": "Classroom instruction can be supplemented with carefully selected online resources.",
      "essayTypes": ["opinion", "advantages-disadvantages"],
      "category": "education",
      "translationRu": "дополненный; был дополнен"
  },
  {
      "id": "vocab-071",
      "englishWord": "ought to",
      "pronunciation": "/ˈɔːt tə/",
      "pronunciationKk": "от тэ",
      "definition": "Used to express advice, moral duty, or what is considered the right action.",
      "partOfSpeech": "modal phrase",
      "exampleSentence": "Employers ought to provide reasonable support for workers experiencing burnout.",
      "essayTypes": ["opinion", "discussion"],
      "category": "general-academic",
      "translationRu": "следует, должен, стоило бы"
  },
  {
      "id": "vocab-072",
      "englishWord": "abandon",
      "pronunciation": "/əˈbændən/",
      "pronunciationKk": "эбэндэн",
      "definition": "To leave something permanently or stop supporting an idea, plan, or activity.",
      "partOfSpeech": "verb",
      "exampleSentence": "Governments should not abandon long-term environmental policies during economic downturns.",
      "essayTypes": ["opinion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "отказываться от, оставлять, покидать"
  },
  {
      "id": "vocab-073",
      "englishWord": "thereby",
      "pronunciation": "/ˌðeəˈbaɪ/",
      "pronunciationKk": "зэабай",
      "definition": "As a result of that action or by means of it.",
      "partOfSpeech": "adverb",
      "exampleSentence": "Cities can expand public transport, thereby reducing traffic congestion and air pollution.",
      "essayTypes": ["opinion", "problem-solution", "advantages-disadvantages"],
      "category": "general-academic",
      "translationRu": "тем самым, таким образом"
  },
  {
      "id": "vocab-074",
      "englishWord": "dignified",
      "pronunciation": "/ˈdɪɡnɪfaɪd/",
      "pronunciationKk": "дигнифайд",
      "definition": "Calm, serious, and worthy of respect in appearance or behaviour.",
      "partOfSpeech": "adjective",
      "exampleSentence": "Older citizens deserve a secure and dignified retirement.",
      "essayTypes": ["opinion", "discussion"],
      "category": "society",
      "translationRu": "достойный, исполненный достоинства"
  },
  {
      "id": "vocab-075",
      "englishWord": "secure",
      "pronunciation": "/sɪˈkjʊə/",
      "pronunciationKk": "сикьюэ",
      "definition": "Safe, stable, and protected from danger, loss, or uncertainty.",
      "partOfSpeech": "adjective",
      "exampleSentence": "Governments should ensure that older people have access to secure and affordable housing.",
      "essayTypes": ["opinion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "безопасный, защищённый, надёжный"
  },
  {
      "id": "vocab-076",
      "englishWord": "genuinely",
      "pronunciation": "/ˈdʒenjuɪnli/",
      "pronunciationKk": "джэньюинли",
      "definition": "Truly, sincerely, or in a way that is real rather than pretended.",
      "partOfSpeech": "adverb",
      "exampleSentence": "A policy can succeed only if it genuinely addresses the needs of disadvantaged communities.",
      "essayTypes": ["opinion", "discussion", "problem-solution"],
      "category": "general-academic",
      "translationRu": "действительно, искренне, по-настоящему"
  },
  {
      "id": "vocab-077",
      "englishWord": "although",
      "pronunciation": "/ɔːlˈðəʊ/",
      "pronunciationKk": "олзоу",
      "definition": "Used to introduce a fact that contrasts with the main statement.",
      "partOfSpeech": "conjunction",
      "exampleSentence": "Although remote work offers greater flexibility, it can also lead to professional isolation.",
      "essayTypes": ["opinion", "discussion", "advantages-disadvantages"],
      "category": "general-academic",
      "translationRu": "хотя, несмотря на то что"
  },
  {
      "id": "vocab-078",
      "englishWord": "nevertheless",
      "pronunciation": "/ˌnevəðəˈles/",
      "pronunciationKk": "нэвэзэлэс",
      "definition": "Despite what has just been mentioned; used to introduce a contrasting point.",
      "partOfSpeech": "linking adverb",
      "exampleSentence": "Public transport requires substantial investment; nevertheless, its long-term benefits outweigh the initial costs.",
      "essayTypes": ["opinion", "discussion", "advantages-disadvantages"],
      "category": "general-academic",
      "translationRu": "тем не менее, всё же, несмотря на это"
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
  questionRecallMode: document.querySelector("#questionRecallMode"),
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
  vocabHint: document.querySelector("#vocabHint"),
  vocabPosition: document.querySelector("#vocabPosition"),
  vocabAccuracy: document.querySelector("#vocabAccuracy"),
  vocabCard: document.querySelector("#vocabCard"),
  vocabCardInner: document.querySelector("#vocabCardInner"),
  vocabCardFront: document.querySelector(".flashcard-front"),
  vocabCardBack: document.querySelector(".flashcard-back"),
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
  vocabRecallMode: document.querySelector("#vocabRecallMode"),
  vocabShuffleMode: document.querySelector("#vocabShuffleMode"),
  vocabMistakesMode: document.querySelector("#vocabMistakesMode"),
  vocabRecallForm: document.querySelector("#vocabRecallForm"),
  vocabRecallInput: document.querySelector("#vocabRecallInput"),
  vocabRecallSubmit: document.querySelector("#vocabRecallSubmit"),
  vocabRecallFeedback: document.querySelector("#vocabRecallFeedback"),
  vocabRecallReveal: document.querySelector("#vocabRecallReveal"),
  vocabRecallRetry: document.querySelector("#vocabRecallRetry"),
  vocabRecallContinue: document.querySelector("#vocabRecallContinue"),
  vocabPrevious: document.querySelector("#vocabPrevious"),
  vocabNext: document.querySelector("#vocabNext"),
  vocabNeedReview: document.querySelector("#vocabNeedReview"),
  vocabGotIt: document.querySelector("#vocabGotIt"),
  vocabRatingActions: document.querySelector(".vocab-actions .rating-actions"),
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
let reviewTransitionLocked = false;
let questionCheckLocked = false;
let vocabularyTransitionLocked = false;
let vocabularyCheckLocked = false;
const questionRecallMistakes = new Set();
const vocabularyRecallMistakes = new Set();

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

elements.questionRecallMode.addEventListener("change", () => {
  state.questionRecallMode = elements.questionRecallMode.checked;
  resetAnswerView();
  saveState();
  render();
  elements.reviewArea.querySelector("#questionRecallInput")?.focus();
});

elements.essayTypeFilter.addEventListener("change", () => {
  state.essayType = elements.essayTypeFilter.value;
  resetVocabularyDeck();
  saveState();
  renderVocabulary({ animate: true });
});

elements.vocabCategoryFilter.addEventListener("change", () => {
  state.vocabCategory = elements.vocabCategoryFilter.value;
  resetVocabularyDeck();
  saveState();
  renderVocabulary({ animate: true });
});

elements.vocabRecallMode.addEventListener("change", () => {
  state.vocabRecallMode = elements.vocabRecallMode.checked;
  state.vocabFlipped = false;
  saveState();
  renderVocabulary();
  if (state.vocabRecallMode) {
    elements.vocabRecallInput.focus();
  }
});

elements.vocabShuffleMode.addEventListener("change", () => {
  state.vocabShuffle = elements.vocabShuffleMode.checked;
  resetVocabularyDeck();
  saveState();
  renderVocabulary({ animate: true });
});

elements.vocabMistakesMode.addEventListener("change", () => {
  state.vocabMistakesOnly = elements.vocabMistakesMode.checked;
  resetVocabularyDeck();
  saveState();
  renderVocabulary({ animate: true });
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
    const reviewCard = event.target.closest("[data-action='toggle-answer']");
    if (reviewCard) {
      if (state.questionRecallMode) {
        elements.reviewArea.querySelector("#questionRecallInput")?.focus();
        return;
      }
      toggleAnswerVisibility();
    }
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

  if (action === "jump") {
    jumpToReviewCard(Number(button.dataset.index));
    return;
  }

  if (action === "question-reveal") {
    revealQuestionRecallAnswer();
    return;
  }

  if (action === "question-retry") {
    retryQuestionRecall();
    return;
  }

  if (action === "question-continue") {
    navigateReview(1, { alreadySaved: true });
    return;
  }

  if (action === "reveal") {
    showAnswer();
    return;
  }

  if (action === "hide-answer") {
    hideAnswer();
    return;
  }

  if (action === "pick-option") {
    answerCurrentCard(button.dataset.option);
    return;
  }

  if (action === "self-wrong" || action === "self-correct") {
    if (!state.answerVisible || state.mode !== "practice") {
      return;
    }
    rateCurrentCard(action === "self-correct" ? "good" : "again");
    navigateReview(1, { alreadySaved: true });
    return;
  }

  if (["again", "hard", "good"].includes(action)) {
    rateCurrentCard(action);
    navigateReview(1, { alreadySaved: true });
  }
});

elements.reviewArea.addEventListener("input", (event) => {
  if (!event.target.matches("#questionRecallInput")) {
    return;
  }
  state.questionRecallDraft = event.target.value;
  saveState();
});

elements.reviewArea.addEventListener("submit", (event) => {
  if (!event.target.matches("[data-question-recall]")) {
    return;
  }
  event.preventDefault();
  checkQuestionRecall();
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
    const backup = parseBackup(raw);
    if (backup) {
      restoreBackup(backup);
      elements.importInput.value = "";
      saveState();
      render();
      setImportStatus(
        `Backup восстановлен: ${backup.cards.length} вопросов, ${backup.customVocabulary.length} своих слов.`
      );
      return;
    }

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
  const payload = {
    format: BACKUP_FORMAT,
    exportedAt: new Date().toISOString(),
    seedVersion: state.seedVersion,
    cards: state.cards.map(serializeQuestionCard),
    customVocabulary: state.customVocabulary,
    vocabProgress: state.vocabProgress
  };

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
  if (state.vocabRecallMode) {
    elements.vocabRecallInput.focus();
    return;
  }
  toggleVocabularyCard();
});

elements.vocabRecallForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkVocabularyRecall();
});

elements.vocabRecallReveal.addEventListener("click", () => {
  revealVocabularyRecallAnswer();
});

elements.vocabRecallRetry.addEventListener("click", () => {
  retryVocabularyRecall();
});

elements.vocabRecallContinue.addEventListener("click", () => {
  rateVocabularyCard("got", { alreadyRecorded: true });
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
  renderVocabulary({ animate: true });
});

document.addEventListener("keydown", (event) => {
  if (state.activeView === "questions" && !state.questionRecallMode && !isTypingTarget(event.target)) {
    const reviewCard = event.target.closest("[data-action='toggle-answer']");
    if (reviewCard && (event.key === "Enter" || event.code === "Space")) {
      event.preventDefault();
      toggleAnswerVisibility();
      return;
    }
  }

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
  elements.questionRecallMode.checked = Boolean(state.questionRecallMode);
  elements.questionRecallMode.disabled = state.mode !== "practice";
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
    <div class="review-card ${showAnswer ? "is-answer-visible" : ""}" data-action="toggle-answer" role="button" tabindex="0" aria-label="${escapeHtml(getReviewCardAriaLabel(card, showAnswer))}" aria-expanded="${showAnswer ? "true" : "false"}">
      <div class="review-card-inner">
        <div class="review-card-face review-card-front" aria-hidden="${showAnswer ? "true" : "false"}">
          <p class="question-label">${escapeHtml(card.topic)} · ${escapeHtml(cardStatus)}</p>
          <p class="question-text">${escapeHtml(card.question)}</p>
          ${renderOptions(card, showAnswer)}
        </div>
        <div class="review-card-face review-card-back" aria-hidden="${showAnswer ? "false" : "true"}">
          <p class="question-label">${escapeHtml(card.topic)} · ответ</p>
          <p class="question-text question-text-small">${escapeHtml(card.question)}</p>
          ${renderAnswer(card)}
        </div>
      </div>
    </div>
    ${renderQuestionRecall(card)}
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
  if (!card.options.length || state.questionRecallMode) {
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

function renderQuestionRecall(card) {
  if (!state.questionRecallMode || state.mode !== "practice") {
    return "";
  }

  const status = state.questionRecallStatus || "";
  const isLocked = status === "checking" || status === "correct" || status === "revealed";
  const formClass = status === "correct" ? "is-correct" : status === "wrong" || status === "revealed" ? "is-wrong" : "";

  return `
    <form class="vocab-recall question-recall ${formClass}" data-question-recall novalidate>
      <label for="questionRecallInput">
        <span>Напиши ответ своими словами</span>
        <textarea id="questionRecallInput" rows="4" ${isLocked ? "disabled" : ""} placeholder="Можно отвечать на русском или английском">${escapeHtml(state.questionRecallDraft || "")}</textarea>
      </label>
      <button class="button button-primary" data-question-recall-submit type="submit" ${isLocked ? "disabled" : ""}>Проверить</button>
      <div class="vocab-recall-feedback ${status === "correct" ? "is-correct" : status === "wrong" || status === "revealed" ? "is-wrong" : ""}" data-question-recall-feedback role="status" aria-live="polite">${escapeHtml(state.questionRecallFeedback || "")}</div>
      <div class="vocab-recall-secondary-actions">
        <button class="text-button ${status === "correct" || status === "revealed" ? "hidden" : ""}" data-action="question-reveal" type="button">Не знаю, показать ответ</button>
        <button class="button button-secondary ${status === "revealed" ? "" : "hidden"}" data-action="question-retry" type="button">Попробовать ещё раз</button>
        <button class="button button-primary ${status === "correct" ? "" : "hidden"}" data-action="question-continue" type="button">Следующий вопрос</button>
      </div>
    </form>
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
  const cards = getReviewCards();
  const previousDisabled = state.currentIndex <= 0 ? "disabled" : "";
  const nextDisabled = state.currentIndex >= cards.length - 1 ? "disabled" : "";
  const canSelfCheck = state.mode === "practice" && !card.options.length && !state.questionRecallMode;
  const selfCheckHidden = canSelfCheck && showAnswer ? "" : "hidden";

  return `
    <div class="review-footer">
      <div class="review-controls">
        <div class="nav-actions">
          <button class="button button-secondary" data-action="prev" type="button" ${previousDisabled}>Назад</button>
          <button class="button button-secondary" data-action="next" type="button" ${nextDisabled}>Вперед</button>
        </div>
        ${canSelfCheck ? `
          <div class="rating-actions ${selfCheckHidden}" data-self-check aria-label="Оценить свой ответ">
            <button class="button button-secondary button-danger" data-action="self-wrong" type="button">Ошибка</button>
            <button class="button button-primary" data-action="self-correct" type="button">Верно</button>
          </div>
        ` : ""}
      </div>
      ${renderQuestionJumper(cards)}
    </div>
  `;
}

function renderQuestionJumper(cards) {
  if (cards.length <= 1) {
    return "";
  }

  return `
    <section class="question-navigator" aria-labelledby="questionNavigatorTitle">
      <h3 id="questionNavigatorTitle">Список вопросов</h3>
      <div class="question-jumper" aria-label="Переход к вопросу">
        ${cards
          .map((card, index) => {
            const isActive = index === state.currentIndex;
            const activeClass = isActive ? "is-active" : "";
            const answeredClass = card.reviews ? "is-reviewed" : "";

            return `
              <button class="question-jump-button ${activeClass} ${answeredClass}" data-action="jump" data-index="${index}" type="button" aria-label="Открыть вопрос ${index + 1}: ${escapeHtml(card.question)}" aria-current="${isActive ? "true" : "false"}">
                ${index + 1}
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
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

function renderVocabulary({ animate = false } = {}) {
  elements.vocabCategoryFilter.value = state.vocabCategory || "all";
  elements.essayTypeFilter.value = state.essayType || "all";
  elements.vocabRecallMode.checked = Boolean(state.vocabRecallMode);
  elements.vocabShuffleMode.checked = Boolean(state.vocabShuffle);
  elements.vocabMistakesMode.checked = Boolean(state.vocabMistakesOnly);
  elements.vocabHint.textContent = state.vocabRecallMode
    ? "Напиши значение слова. Enter проверяет ответ."
    : "Space flips the card. Arrow keys move through words.";

  const cards = getVocabularyCards();
  const progress = getVocabularyProgress();
  elements.vocabRecallForm.classList.toggle("hidden", !state.vocabRecallMode || !cards.length);
  elements.vocabRatingActions.classList.toggle("hidden", state.vocabRecallMode);
  elements.vocabCard.classList.toggle("is-recall-mode", state.vocabRecallMode);
  syncVocabularyRecallActions();

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
    elements.vocabStatus.textContent = state.vocabMistakesOnly
      ? "Ошибок в выбранной категории пока нет."
      : "Try a different category or essay type filter.";
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
  elements.vocabCard.classList.toggle("is-answer-visible", state.vocabFlipped);
  syncVocabularyAccessibility(card);
  elements.vocabPrevious.disabled = state.vocabIndex === 0;
  elements.vocabNext.disabled = state.vocabIndex === cards.length - 1;
  elements.vocabStatus.textContent = getVocabularyStatusText(card);

  if (elements.vocabRecallForm.dataset.cardId !== card.id) {
    elements.vocabRecallForm.dataset.cardId = card.id;
    elements.vocabRecallInput.value = "";
    elements.vocabRecallInput.disabled = false;
    elements.vocabRecallSubmit.disabled = false;
    setVocabularyRecallFeedback("");
    syncVocabularyRecallActions();
  }

  if (animate) {
    playCardEntrance(elements.vocabCard);
  }
}

async function checkQuestionRecall() {
  if (questionCheckLocked || reviewTransitionLocked) {
    return;
  }

  const card = getCurrentCard();
  const input = elements.reviewArea.querySelector("#questionRecallInput");
  const learnerAnswer = input?.value.trim() || "";
  if (!card || !learnerAnswer) {
    state.questionRecallStatus = "wrong";
    state.questionRecallFeedback = "Сначала напиши ответ.";
    saveState();
    syncQuestionRecallUi();
    return;
  }

  questionCheckLocked = true;
  state.questionRecallStatus = "checking";
  state.questionRecallFeedback = "Gemini проверяет ответ...";
  saveState();
  syncQuestionRecallUi();

  try {
    const result = await checkQuestionWithGemini(card, learnerAnswer);
    questionCheckLocked = false;

    if (!result.accepted) {
      state.answeredCardId = card.id;
      if (!questionRecallMistakes.has(card.id)) {
        questionRecallMistakes.add(card.id);
        rateCurrentCard("again");
      }
      state.questionRecallStatus = "wrong";
      state.questionRecallFeedback = result.feedback || "В ответе не хватает основной идеи.";
      saveState();
      syncQuestionRecallUi();
      return;
    }

    questionRecallMistakes.delete(card.id);
    rateCurrentCard("good");
    state.answerVisible = true;
    state.answeredCardId = card.id;
    state.questionRecallStatus = "correct";
    state.questionRecallFeedback = result.feedback || "Ответ передаёт основную идею.";
    saveState();
    syncReviewFlipState();
    syncQuestionRecallUi();
  } catch {
    questionCheckLocked = false;
    state.questionRecallStatus = "wrong";
    state.questionRecallFeedback = "Gemini сейчас недоступен. Попробуй проверить ответ ещё раз.";
    saveState();
    syncQuestionRecallUi();
  }
}

async function checkQuestionWithGemini(card, learnerAnswer) {
  const response = await fetch("/api/check-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: card.topic,
      question: card.question,
      referenceAnswer: card.answer || getOptionText(card, card.correctOption),
      learnerAnswer
    })
  });
  const result = await response.json();
  if (!response.ok || typeof result.accepted !== "boolean") {
    throw new Error(result.error || "Gemini check failed.");
  }
  return result;
}

function revealQuestionRecallAnswer() {
  const card = getCurrentCard();
  if (!card) {
    return;
  }

  if (!questionRecallMistakes.has(card.id)) {
    questionRecallMistakes.add(card.id);
    rateCurrentCard("again");
  }
  state.answerVisible = true;
  state.answeredCardId = card.id;
  state.questionRecallStatus = "revealed";
  state.questionRecallFeedback = "Ответ открыт. Изучи его и попробуй ещё раз.";
  saveState();
  syncReviewFlipState();
  syncQuestionRecallUi();
}

function retryQuestionRecall() {
  state.answerVisible = false;
  state.questionRecallStatus = "retry";
  state.questionRecallFeedback = "";
  state.questionRecallDraft = "";
  saveState();
  syncReviewFlipState();
  syncQuestionRecallUi();
  elements.reviewArea.querySelector("#questionRecallInput")?.focus();
}

function syncQuestionRecallUi() {
  const form = elements.reviewArea.querySelector("[data-question-recall]");
  if (!form) {
    return;
  }

  const status = state.questionRecallStatus || "";
  const isLocked = status === "checking" || status === "correct" || status === "revealed";
  const input = form.querySelector("#questionRecallInput");
  const submit = form.querySelector("[data-question-recall-submit]");
  const feedback = form.querySelector("[data-question-recall-feedback]");
  input.disabled = isLocked;
  submit.disabled = isLocked;
  feedback.textContent = state.questionRecallFeedback || "";
  feedback.classList.toggle("is-correct", status === "correct");
  feedback.classList.toggle("is-wrong", status === "wrong" || status === "revealed");
  form.classList.toggle("is-correct", status === "correct");
  form.classList.toggle("is-wrong", status === "wrong" || status === "revealed");
  form.querySelector("[data-action='question-reveal']")?.classList.toggle("hidden", status === "correct" || status === "revealed");
  form.querySelector("[data-action='question-retry']")?.classList.toggle("hidden", status !== "revealed");
  form.querySelector("[data-action='question-continue']")?.classList.toggle("hidden", status !== "correct");
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

async function navigateReview(delta, options = {}) {
  if (reviewTransitionLocked) {
    return;
  }

  const cardsBefore = getReviewCards();
  if (!cardsBefore.length) {
    return;
  }

  const targetIndexBeforeReview = clampIndex(state.currentIndex + delta, cardsBefore.length);
  if (targetIndexBeforeReview === state.currentIndex && !state.answerVisible) {
    return;
  }

  reviewTransitionLocked = true;
  await playCardExit(
    elements.reviewArea.querySelector(".review-card"),
    delta > 0 ? "is-dismissing-left" : "is-dismissing-right"
  );

  const previousIndex = state.currentIndex;
  const wasHandlingRecallAnswer = Boolean(
    state.mode === "practice" &&
    state.questionRecallMode &&
    state.answeredCardId &&
    state.questionRecallStatus
  );
  const previousCard =
    state.answeredCardId && (state.answerVisible || wasHandlingRecallAnswer)
      ? cardsBefore.find((card) => card.id === state.answeredCardId)
      : cardsBefore[previousIndex];
  const wasShowingPracticeAnswer = state.mode === "practice" && (state.answerVisible || wasHandlingRecallAnswer);
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
  reviewTransitionLocked = false;
}

async function jumpToReviewCard(index) {
  if (reviewTransitionLocked || index === state.currentIndex) {
    return;
  }

  const cards = getReviewCards();
  if (!cards.length) {
    return;
  }

  reviewTransitionLocked = true;
  await playCardExit(
    elements.reviewArea.querySelector(".review-card"),
    index > state.currentIndex ? "is-dismissing-left" : "is-dismissing-right"
  );

  state.currentIndex = clampIndex(index, cards.length);
  state.currentId = cards[state.currentIndex] ? cards[state.currentIndex].id : null;
  resetAnswerView();
  saveState();
  render();
  reviewTransitionLocked = false;
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
  state.questionRecallStatus = null;
  state.questionRecallFeedback = "";
  state.questionRecallDraft = "";
}

function showAnswer() {
  const card = getCurrentCard();
  state.answeredCardId = card ? card.id : null;
  state.answerVisible = true;
  saveState();
  syncReviewFlipState();
}

function hideAnswer() {
  resetAnswerView();
  saveState();
  syncReviewFlipState();
}

function toggleAnswerVisibility() {
  if (state.mode !== "practice" || state.questionRecallMode) {
    return;
  }

  if (state.answerVisible) {
    hideAnswer();
    return;
  }

  showAnswer();
}

function toggleVocabularyCard() {
  state.vocabFlipped = !state.vocabFlipped;
  saveState();
  elements.vocabCardInner.classList.toggle("is-flipped", state.vocabFlipped);
  elements.vocabCard.classList.toggle("is-answer-visible", state.vocabFlipped);
  syncVocabularyAccessibility(getCurrentVocabularyCard());
}

async function navigateVocabulary(delta) {
  const cards = getVocabularyCards();
  const targetIndex = clampIndex(state.vocabIndex + delta, cards.length);
  if (vocabularyTransitionLocked || targetIndex === state.vocabIndex) {
    return;
  }

  vocabularyTransitionLocked = true;
  await playCardExit(
    elements.vocabCard,
    delta > 0 ? "is-dismissing-left" : "is-dismissing-right"
  );
  state.vocabIndex = targetIndex;
  state.vocabFlipped = false;
  saveState();
  renderVocabulary({ animate: true });
  if (state.vocabRecallMode) {
    elements.vocabRecallInput.focus();
  }
  vocabularyTransitionLocked = false;
}

async function rateVocabularyCard(result, { alreadyRecorded = false } = {}) {
  if (vocabularyTransitionLocked) {
    return;
  }

  const card = getCurrentVocabularyCard();
  if (!card) {
    return;
  }

  if (!alreadyRecorded) {
    recordVocabularyResult(card, result);
    saveState();
  }

  vocabularyTransitionLocked = true;
  await playCardExit(
    elements.vocabCard,
    result === "got" ? "is-dismissing-right" : "is-dismissing-left"
  );
  const cards = getVocabularyCards();
  const currentIndex = cards.findIndex((item) => item.id === card.id);
  state.vocabIndex = cards.length
    ? currentIndex === -1
      ? Math.min(state.vocabIndex, cards.length - 1)
      : (currentIndex + 1) % cards.length
    : 0;
  state.vocabFlipped = false;
  elements.vocabRecallForm.dataset.cardId = "";
  saveState();
  renderVocabulary({ animate: true });
  if (state.vocabRecallMode && cards.length) {
    elements.vocabRecallInput.focus();
  }
  vocabularyTransitionLocked = false;
}

async function checkVocabularyRecall() {
  if (vocabularyTransitionLocked || vocabularyCheckLocked) {
    return;
  }

  const card = getCurrentVocabularyCard();
  const answer = elements.vocabRecallInput.value.trim();
  if (!card || !answer) {
    setVocabularyRecallFeedback("Сначала напиши значение.", "wrong");
    return;
  }

  let accepted = isVocabularyRecallCorrect(answer, card);
  let feedback = "";

  if (!accepted) {
    vocabularyCheckLocked = true;
    elements.vocabRecallSubmit.disabled = true;
    setVocabularyRecallFeedback("Gemini проверяет значение...");

    try {
      const result = await checkVocabularyWithGemini(card, answer);
      accepted = result.accepted;
      feedback = result.feedback;
    } catch {
      setVocabularyRecallFeedback("Gemini сейчас недоступен. Попробуй проверить ответ ещё раз.", "wrong");
      elements.vocabRecallSubmit.disabled = false;
      vocabularyCheckLocked = false;
      return;
    }

    vocabularyCheckLocked = false;
    elements.vocabRecallSubmit.disabled = false;
  }

  if (!accepted) {
    if (!vocabularyRecallMistakes.has(card.id)) {
      vocabularyRecallMistakes.add(card.id);
      recordVocabularyResult(card, "review");
      saveState();
    }
    setVocabularyRecallFeedback(feedback || "Пока не совпало. Попробуй ещё раз.", "wrong");
    return;
  }

  vocabularyRecallMistakes.delete(card.id);
  recordVocabularyResult(card, "got");
  state.vocabFlipped = true;
  saveState();
  elements.vocabRecallInput.disabled = true;
  elements.vocabRecallSubmit.disabled = true;
  elements.vocabCardInner.classList.add("is-flipped");
  elements.vocabCard.classList.add("is-answer-visible");
  syncVocabularyAccessibility(card);
  setVocabularyRecallFeedback(
    `${feedback || "Правильно"} · ${card.translationRu || card.definition}`,
    "correct"
  );
  elements.vocabRecallReveal.classList.add("hidden");
  elements.vocabRecallRetry.classList.add("hidden");
  elements.vocabRecallContinue.classList.remove("hidden");
}

async function checkVocabularyWithGemini(card, answer) {
  const response = await fetch("/api/check-vocabulary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      word: card.englishWord,
      definition: card.definition,
      translation: card.translationRu,
      answer
    })
  });
  const result = await response.json();
  if (!response.ok || typeof result.accepted !== "boolean") {
    throw new Error(result.error || "Gemini check failed.");
  }
  return result;
}

function revealVocabularyRecallAnswer() {
  const card = getCurrentVocabularyCard();
  if (!card) {
    return;
  }

  if (!vocabularyRecallMistakes.has(card.id)) {
    vocabularyRecallMistakes.add(card.id);
    recordVocabularyResult(card, "review");
    saveState();
  }
  state.vocabFlipped = true;
  saveState();
  elements.vocabCardInner.classList.add("is-flipped");
  elements.vocabCard.classList.add("is-answer-visible");
  syncVocabularyAccessibility(card);
  setVocabularyRecallFeedback(`Ответ: ${card.translationRu || card.definition}`, "wrong");
  syncVocabularyRecallActions();
}

function retryVocabularyRecall() {
  const card = getCurrentVocabularyCard();
  if (!card) {
    return;
  }

  state.vocabFlipped = false;
  saveState();
  elements.vocabCardInner.classList.remove("is-flipped");
  elements.vocabCard.classList.remove("is-answer-visible");
  elements.vocabRecallInput.value = "";
  elements.vocabRecallInput.disabled = false;
  elements.vocabRecallSubmit.disabled = false;
  setVocabularyRecallFeedback("");
  syncVocabularyAccessibility(card);
  syncVocabularyRecallActions();
  elements.vocabRecallInput.focus();
}

function syncVocabularyRecallActions() {
  const answerIsVisible = Boolean(state.vocabRecallMode && state.vocabFlipped);
  elements.vocabRecallReveal.classList.toggle("hidden", answerIsVisible);
  elements.vocabRecallRetry.classList.toggle("hidden", !answerIsVisible);
  elements.vocabRecallContinue.classList.add("hidden");
}

function recordVocabularyResult(card, result) {
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
}

function syncReviewFlipState() {
  const reviewCard = elements.reviewArea.querySelector(".review-card");
  if (!reviewCard) {
    return;
  }

  const showAnswer = state.mode !== "practice" || state.answerVisible;
  const card = getCurrentCard();
  reviewCard.classList.toggle("is-answer-visible", showAnswer);
  reviewCard.setAttribute("aria-expanded", String(showAnswer));
  reviewCard.setAttribute("aria-label", getReviewCardAriaLabel(card, showAnswer));
  reviewCard.querySelector(".review-card-front")?.setAttribute("aria-hidden", String(showAnswer));
  reviewCard.querySelector(".review-card-back")?.setAttribute("aria-hidden", String(!showAnswer));
  elements.reviewArea
    .querySelector("[data-self-check]")
    ?.classList.toggle("hidden", !showAnswer);
}

function syncVocabularyAccessibility(card) {
  if (!card) {
    return;
  }

  elements.vocabCard.setAttribute("aria-expanded", String(state.vocabFlipped));
  elements.vocabCard.setAttribute(
    "aria-label",
    state.vocabFlipped
      ? `${asAriaSentence(card.englishWord)} Definition: ${asAriaSentence(card.definition)} Click to hide the answer.`
      : `${asAriaSentence(card.englishWord)} Click to reveal the definition.`
  );
  elements.vocabCardFront.setAttribute("aria-hidden", String(state.vocabFlipped));
  elements.vocabCardBack.setAttribute("aria-hidden", String(!state.vocabFlipped));
}

function playCardEntrance(cardElement) {
  if (!cardElement) {
    return;
  }

  cardElement.classList.remove("is-entering", "is-dismissing-left", "is-dismissing-right");
  if (prefersReducedMotion()) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cardElement.classList.add("is-entering");
      const finishEntrance = (event) => {
        if (event.target !== cardElement) {
          return;
        }
        cardElement.classList.remove("is-entering");
        cardElement.removeEventListener("animationend", finishEntrance);
      };
      cardElement.addEventListener("animationend", finishEntrance);
    });
  });
}

function playCardExit(cardElement, directionClass) {
  if (!cardElement || prefersReducedMotion()) {
    return Promise.resolve();
  }

  cardElement.classList.remove("is-entering", "is-dismissing-left", "is-dismissing-right");

  return new Promise((resolve) => {
    let completed = false;
    const finish = (event) => {
      if (event && event.target !== cardElement) {
        return;
      }
      if (completed) {
        return;
      }
      completed = true;
      cardElement.removeEventListener("animationend", finish);
      resolve();
    };

    cardElement.addEventListener("animationend", finish);
    requestAnimationFrame(() => cardElement.classList.add(directionClass));
    window.setTimeout(finish, 420);
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getCurrentVocabularyCard() {
  const cards = getVocabularyCards();
  state.vocabIndex = clampIndex(state.vocabIndex, cards.length);
  return cards[state.vocabIndex];
}

function getVocabularyCards() {
  const cards = getFilteredVocabularyCards();
  if (!state.vocabShuffle) {
    return cards;
  }

  const order = new Map((state.vocabOrder || []).map((id, index) => [id, index]));
  return [...cards].sort((left, right) => {
    const leftIndex = order.has(left.id) ? order.get(left.id) : Number.MAX_SAFE_INTEGER;
    const rightIndex = order.has(right.id) ? order.get(right.id) : Number.MAX_SAFE_INTEGER;
    return leftIndex - rightIndex;
  });
}

function getFilteredVocabularyCards() {
  const cards = [...VOCABULARY_FLASHCARDS, ...state.customVocabulary];
  const categoryFilteredCards =
    !state.vocabCategory || state.vocabCategory === "all"
      ? cards
      : cards.filter((card) => card.category === state.vocabCategory);
  const essayFilteredCards =
    !state.essayType || state.essayType === "all"
      ? categoryFilteredCards
      : categoryFilteredCards.filter((card) => (card.essayTypes || []).includes(state.essayType));

  if (!state.vocabMistakesOnly) {
    return essayFilteredCards;
  }

  return essayFilteredCards.filter((card) => state.vocabProgress[card.id]?.lastResult === "Need Review");
}

function resetVocabularyDeck() {
  state.vocabIndex = 0;
  state.vocabFlipped = false;
  state.vocabOrder = state.vocabShuffle
    ? shuffleValues(getFilteredVocabularyCards().map((card) => card.id))
    : [];
}

function shuffleValues(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
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

function setVocabularyRecallFeedback(message, type = "") {
  elements.vocabRecallFeedback.textContent = message;
  elements.vocabRecallFeedback.classList.toggle("is-correct", type === "correct");
  elements.vocabRecallFeedback.classList.toggle("is-wrong", type === "wrong");
  elements.vocabRecallForm.classList.remove("is-correct", "is-wrong");
  if (type) {
    void elements.vocabRecallForm.offsetWidth;
    elements.vocabRecallForm.classList.add(`is-${type}`);
  }
}

function isVocabularyRecallCorrect(answer, card) {
  const answerTokens = getRecallTokens(answer);
  const referenceTokens = getRecallTokens(`${card.translationRu || ""} ${card.definition || ""}`);
  if (!answerTokens.length || !referenceTokens.length) {
    return false;
  }

  return answerTokens.some((answerToken) =>
    referenceTokens.some((referenceToken) => areRecallTokensSimilar(answerToken, referenceToken))
  );
}

function getRecallTokens(value) {
  const ignored = new Set([
    "and", "the", "that", "this", "with", "from", "into", "more", "very", "used", "using", "something", "someone",
    "для", "или", "это", "как", "при", "что", "быть", "очень", "более", "такой", "когда", "чтобы", "который"
  ]);
  return String(value || "")
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !ignored.has(token));
}

function areRecallTokensSimilar(left, right) {
  if (left === right) {
    return true;
  }
  const shortestLength = Math.min(left.length, right.length);
  if (shortestLength >= 5 && commonPrefixLength(left, right) >= 5) {
    return true;
  }
  return shortestLength >= 5 && Math.abs(left.length - right.length) <= 1 && levenshteinDistance(left, right) <= 1;
}

function commonPrefixLength(left, right) {
  let index = 0;
  while (index < left.length && index < right.length && left[index] === right[index]) {
    index += 1;
  }
  return index;
}

function levenshteinDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
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

  const shouldKeepRecallCard = Boolean(
    mode === "practice" &&
    state.questionRecallMode &&
    state.questionRecallStatus &&
    state.answeredCardId
  );

  if (mode === "practice" && state.answeredCardId && (state.answerVisible || shouldKeepRecallCard)) {
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
  const nowTimestamp = Date.now();
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
    box: clampNumber(toNonNegativeInteger(progress.box ?? input.box), 0, 5),
    dueAt: toFiniteNumber(progress.dueAt ?? input.dueAt, nowTimestamp),
    reviews: toNonNegativeInteger(progress.reviews ?? input.reviews),
    correct: toNonNegativeInteger(progress.correct ?? input.correctCount ?? input.correctAnswers),
    wrong: toNonNegativeInteger(progress.wrong ?? input.wrong),
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

function parseBackup(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!parsed || parsed.format !== BACKUP_FORMAT) {
    return null;
  }

  if (!Array.isArray(parsed.cards) || !Array.isArray(parsed.customVocabulary)) {
    throw new Error("Backup поврежден: отсутствуют вопросы или словарь.");
  }

  return {
    seedVersion: String(parsed.seedVersion || SEED_VERSION),
    cards: parsed.cards.map(createCard).filter((card) => card.question && (card.answer || card.correctOption)),
    customVocabulary: parsed.customVocabulary.map(normalizeVocabularyCard).filter(Boolean),
    vocabProgress: normalizeVocabularyProgress(parsed.vocabProgress)
  };
}

function restoreBackup(backup) {
  state.cards = backup.cards;
  state.seedVersion = backup.seedVersion;
  state.customVocabulary = backup.customVocabulary;
  state.vocabProgress = backup.vocabProgress;
  state.topic = "all";
  state.mode = "practice";
  state.currentIndex = 0;
  state.currentId = backup.cards[0]?.id || null;
  state.vocabCategory = "all";
  state.essayType = "all";
  state.vocabIndex = 0;
  state.vocabFlipped = false;
  resetAnswerView();
}

function serializeQuestionCard(card) {
  return {
    id: card.id,
    topic: card.topic,
    question: card.question,
    options: card.options,
    correctOption: card.correctOption,
    answer: card.answer,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
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
  };
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
      questionRecallMode: Boolean(parsed.questionRecallMode),
      questionRecallStatus: ["correct", "wrong", "revealed", "retry"].includes(parsed.questionRecallStatus)
        ? parsed.questionRecallStatus
        : null,
      questionRecallFeedback: typeof parsed.questionRecallFeedback === "string" ? parsed.questionRecallFeedback : "",
      questionRecallDraft: typeof parsed.questionRecallDraft === "string" ? parsed.questionRecallDraft : "",
      selectedOption: parsed.selectedOption || null,
      answeredCardId: parsed.answeredCardId || null,
      vocabIndex: Number.isFinite(parsed.vocabIndex) ? parsed.vocabIndex : 0,
      vocabFlipped: Boolean(parsed.vocabFlipped),
      vocabRecallMode: Boolean(parsed.vocabRecallMode),
      vocabShuffle: Boolean(parsed.vocabShuffle),
      vocabMistakesOnly: Boolean(parsed.vocabMistakesOnly),
      vocabOrder: Array.isArray(parsed.vocabOrder) ? parsed.vocabOrder.filter((id) => typeof id === "string") : [],
      vocabProgress: normalizeVocabularyProgress(parsed.vocabProgress),
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
    questionRecallMode: false,
    questionRecallStatus: null,
    questionRecallFeedback: "",
    questionRecallDraft: "",
    answerVisible: false,
    selectedOption: null,
    answeredCardId: null,
    vocabIndex: 0,
    vocabFlipped: false,
    vocabRecallMode: false,
    vocabShuffle: false,
    vocabMistakesOnly: false,
    vocabOrder: [],
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

function getReviewCardAriaLabel(card, showAnswer) {
  if (!card) {
    return "Карточка вопроса";
  }

  return showAnswer
    ? `${asAriaSentence(card.question)} Ответ: ${asAriaSentence(card.answer)} Нажмите, чтобы снова скрыть ответ.`
    : `${asAriaSentence(card.question)} Нажмите, чтобы показать ответ.`;
}

function asAriaSentence(value) {
  const text = String(value || "").trim();
  return /[.!?]$/.test(text) ? text : `${text}.`;
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

function normalizeVocabularyProgress(progress) {
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(progress)
      .filter(([, item]) => item && typeof item === "object" && !Array.isArray(item))
      .map(([id, item]) => [
        id,
        {
          got: toNonNegativeInteger(item.got),
          review: toNonNegativeInteger(item.review),
          lastResult: typeof item.lastResult === "string" ? item.lastResult : null,
          lastReviewedAt: typeof item.lastReviewedAt === "string" ? item.lastReviewedAt : null
        }
      ])
  );
}

function toFiniteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toNonNegativeInteger(value) {
  return Math.max(0, Math.trunc(toFiniteNumber(value, 0)));
}

function clampNumber(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
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
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) {
    return "дата не назначена";
  }

  return new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
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
