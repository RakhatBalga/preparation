window.SEED_VERSION = "backend-interview-v1";
window.SEED_CARDS = [
  {
    "id": "q001",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое mutable и immutable типы в Python?",
    "options": [
      {
        "key": "A",
        "text": "Mutable — можно менять после создания (list, dict, set), immutable — нельзя (int, str, tuple)"
      },
      {
        "key": "B",
        "text": "Mutable — типы, хранящиеся в куче и всегда передающиеся по ссылке, immutable — хранятся в стеке"
      },
      {
        "key": "C",
        "text": "Mutable — объекты, которые нельзя скопировать через copy(), immutable — можно"
      },
      {
        "key": "D",
        "text": "Mutable — типы, которые нельзя использовать как ключи словаря, immutable — можно"
      }
    ],
    "correctOption": "A",
    "answer": "A) Mutable — можно менять после создания (list, dict, set), immutable — нельзя (int, str, tuple)"
  },
  {
    "id": "q002",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое GIL?",
    "options": [
      {
        "key": "A",
        "text": "Механизм сборки мусора, блокирующий потоки во время очистки памяти"
      },
      {
        "key": "B",
        "text": "Global Interpreter Lock — блокировка, позволяющая только одному потоку выполнять байткод одновременно, поэтому threading не даёт прироста для CPU-bound задач"
      },
      {
        "key": "C",
        "text": "Ограничение на максимальное количество открытых файлов"
      },
      {
        "key": "D",
        "text": "Встроенный планировщик задач между процессами"
      }
    ],
    "correctOption": "B",
    "answer": "B) Global Interpreter Lock — блокировка, позволяющая только одному потоку выполнять байткод одновременно, поэтому threading не даёт прироста для CPU-bound задач"
  },
  {
    "id": "q003",
    "topic": "PYTHON CORE & ООП",
    "question": "Разница между is и ==?",
    "options": [
      {
        "key": "A",
        "text": "is сравнивает идентичность объектов, == сравнивает значения"
      },
      {
        "key": "B",
        "text": "is работает только с числами, == — с любыми типами"
      },
      {
        "key": "C",
        "text": "is и == всегда дают одинаковый результат"
      },
      {
        "key": "D",
        "text": "is сравнивает значения с учётом типа, == — без учёта"
      }
    ],
    "correctOption": "A",
    "answer": "A) is сравнивает идентичность объектов, == сравнивает значения"
  },
  {
    "id": "q004",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое декоратор?",
    "options": [
      {
        "key": "A",
        "text": "Класс, автоматически логирующий вызовы функций"
      },
      {
        "key": "B",
        "text": "Синтаксис для приватных методов класса"
      },
      {
        "key": "C",
        "text": "Функция, принимающая другую функцию и расширяющая её поведение без изменения исходного кода"
      },
      {
        "key": "D",
        "text": "Способ объявить функцию без аргументов"
      }
    ],
    "correctOption": "C",
    "answer": "C) Функция, принимающая другую функцию и расширяющая её поведение без изменения исходного кода"
  },
  {
    "id": "q005",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое *args и **kwargs?",
    "options": [
      {
        "key": "A",
        "text": "Позволяют передавать только именованные параметры со значениями по умолчанию"
      },
      {
        "key": "B",
        "text": "*args — произвольное число позиционных аргументов (tuple), **kwargs — именованных (dict)"
      },
      {
        "key": "C",
        "text": "*args — только в классах, **kwargs — только в функциях"
      },
      {
        "key": "D",
        "text": "*args ограничивает функцию тремя аргументами"
      }
    ],
    "correctOption": "B",
    "answer": "B) *args — произвольное число позиционных аргументов (tuple), **kwargs — именованных (dict)"
  },
  {
    "id": "q006",
    "topic": "PYTHON CORE & ООП",
    "question": "Разница между generator и iterator?",
    "options": [
      {
        "key": "A",
        "text": "Это одно и то же понятие"
      },
      {
        "key": "B",
        "text": "Iterator можно использовать один раз, generator — многократно"
      },
      {
        "key": "C",
        "text": "Iterator — объект с методом next, generator — функция с yield, автоматически создающая iterator"
      },
      {
        "key": "D",
        "text": "Generator хранит все значения в памяти сразу, iterator — лениво"
      }
    ],
    "correctOption": "C",
    "answer": "C) Iterator — объект с методом next, generator — функция с yield, автоматически создающая iterator"
  },
  {
    "id": "q007",
    "topic": "PYTHON CORE & ООП",
    "question": "Зачем нужен yield?",
    "options": [
      {
        "key": "A",
        "text": "Возвращает сразу несколько значений в виде списка"
      },
      {
        "key": "B",
        "text": "Останавливает программу до ввода пользователя"
      },
      {
        "key": "C",
        "text": "Помечает функцию как асинхронную"
      },
      {
        "key": "D",
        "text": "Позволяет \"ставить на паузу\" функцию и возвращать значения по одному, экономя память"
      }
    ],
    "correctOption": "D",
    "answer": "D) Позволяет \"ставить на паузу\" функцию и возвращать значения по одному, экономя память"
  },
  {
    "id": "q008",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое list comprehension?",
    "options": [
      {
        "key": "A",
        "text": "Метод list, сортирующий список и удаляющий дубликаты"
      },
      {
        "key": "B",
        "text": "Компактный синтаксис для создания списка: [x**2 for x in range(10)]"
      },
      {
        "key": "C",
        "text": "Функция объединения списков без циклов"
      },
      {
        "key": "D",
        "text": "Способ ограничить размер списка"
      }
    ],
    "correctOption": "B",
    "answer": "B) Компактный синтаксис для создания списка: [x**2 for x in range(10)]"
  },
  {
    "id": "q009",
    "topic": "PYTHON CORE & ООП",
    "question": "Разница между deepcopy и copy?",
    "options": [
      {
        "key": "A",
        "text": "Это одно и то же"
      },
      {
        "key": "B",
        "text": "copy работает только со словарями, deepcopy — со списками"
      },
      {
        "key": "C",
        "text": "copy копирует поверхностно (вложенные объекты общие), deepcopy — рекурсивно"
      },
      {
        "key": "D",
        "text": "deepcopy быстрее, так как не проверяет вложенные структуры"
      }
    ],
    "correctOption": "C",
    "answer": "C) copy копирует поверхностно (вложенные объекты общие), deepcopy — рекурсивно"
  },
  {
    "id": "q010",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое magic methods?",
    "options": [
      {
        "key": "A",
        "text": "Методы, вызываемые при необработанных исключениях"
      },
      {
        "key": "B",
        "text": "Специальные методы (init, str, eq), определяющие поведение объекта в стандартных операциях"
      },
      {
        "key": "C",
        "text": "Приватные методы, начинающиеся с двух подчёркиваний, которые нельзя переопределить"
      },
      {
        "key": "D",
        "text": "Методы, доступные только в стандартной библиотеке"
      }
    ],
    "correctOption": "B",
    "answer": "B) Специальные методы (init, str, eq), определяющие поведение объекта в стандартных операциях"
  },
  {
    "id": "q011",
    "topic": "PYTHON CORE & ООП",
    "question": "Три принципа ООП?",
    "options": [
      {
        "key": "A",
        "text": "Наследование, композиция, абстракция"
      },
      {
        "key": "B",
        "text": "Инкапсуляция, наследование, полиморфизм"
      },
      {
        "key": "C",
        "text": "Модульность, тестируемость, повторное использование"
      },
      {
        "key": "D",
        "text": "Инициализация, выполнение, уничтожение объекта"
      }
    ],
    "correctOption": "B",
    "answer": "B) Инкапсуляция, наследование, полиморфизм"
  },
  {
    "id": "q012",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое MRO?",
    "options": [
      {
        "key": "A",
        "text": "Порядок удаления объектов garbage collector'ом"
      },
      {
        "key": "B",
        "text": "Порядок импорта модулей"
      },
      {
        "key": "C",
        "text": "Порядок поиска методов при множественном наследовании (алгоритм C3 linearization)"
      },
      {
        "key": "D",
        "text": "Порядок выполнения методов при старте программы"
      }
    ],
    "correctOption": "C",
    "answer": "C) Порядок поиска методов при множественном наследовании (алгоритм C3 linearization)"
  },
  {
    "id": "q013",
    "topic": "PYTHON CORE & ООП",
    "question": "Разница между classmethod и staticmethod?",
    "options": [
      {
        "key": "A",
        "text": "Взаимозаменяемы, разницы нет"
      },
      {
        "key": "B",
        "text": "classmethod получает класс как первый аргумент (cls), staticmethod не получает ни self, ни cls"
      },
      {
        "key": "C",
        "text": "staticmethod может менять состояние класса, classmethod — нет"
      },
      {
        "key": "D",
        "text": "classmethod только в абстрактных классах"
      }
    ],
    "correctOption": "B",
    "answer": "B) classmethod получает класс как первый аргумент (cls), staticmethod не получает ни self, ни cls"
  },
  {
    "id": "q014",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое try/except/finally?",
    "options": [
      {
        "key": "A",
        "text": "Механизм обработки ошибок; finally выполняется всегда"
      },
      {
        "key": "B",
        "text": "try/except останавливает программу при любой ошибке"
      },
      {
        "key": "C",
        "text": "except перехватывает только SyntaxError"
      },
      {
        "key": "D",
        "text": "finally выполняется только если исключение перехвачено"
      }
    ],
    "correctOption": "A",
    "answer": "A) Механизм обработки ошибок; finally выполняется всегда"
  },
  {
    "id": "q015",
    "topic": "PYTHON CORE & ООП",
    "question": "Что такое context manager и with?",
    "options": [
      {
        "key": "A",
        "text": "Более короткая запись обычного цикла for"
      },
      {
        "key": "B",
        "text": "Обязателен только для баз данных"
      },
      {
        "key": "C",
        "text": "Объект с enter/exit, гарантирует освобождение ресурса даже при ошибке"
      },
      {
        "key": "D",
        "text": "Используется только для отложенного импорта"
      }
    ],
    "correctOption": "C",
    "answer": "C) Объект с enter/exit, гарантирует освобождение ресурса даже при ошибке"
  },
  {
    "id": "q016",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое индекс?",
    "options": [
      {
        "key": "A",
        "text": "Копия таблицы, обновляемая раз в сутки"
      },
      {
        "key": "B",
        "text": "Структура данных (B-tree), ускоряющая поиск строк ценой памяти и замедления записи"
      },
      {
        "key": "C",
        "text": "Тип столбца, запрещающий дубликаты"
      },
      {
        "key": "D",
        "text": "Механизм удаления старых записей"
      }
    ],
    "correctOption": "B",
    "answer": "B) Структура данных (B-tree), ускоряющая поиск строк ценой памяти и замедления записи"
  },
  {
    "id": "q017",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Когда индекс может навредить?",
    "options": [
      {
        "key": "A",
        "text": "Никогда не вредит"
      },
      {
        "key": "B",
        "text": "Вредит только на текстовых столбцах"
      },
      {
        "key": "C",
        "text": "При частых INSERT/UPDATE каждый индекс нужно перестраивать, замедляя запись; бесполезен при низкой selectivity"
      },
      {
        "key": "D",
        "text": "Замедляет только SELECT"
      }
    ],
    "correctOption": "C",
    "answer": "C) При частых INSERT/UPDATE каждый индекс нужно перестраивать, замедляя запись; бесполезен при низкой selectivity"
  },
  {
    "id": "q018",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое нормализация БД?",
    "options": [
      {
        "key": "A",
        "text": "Структурирование таблиц для устранения избыточности данных (1НФ, 2НФ, 3НФ)"
      },
      {
        "key": "B",
        "text": "Приведение значений к единому регистру"
      },
      {
        "key": "C",
        "text": "Автомасштабирование БД"
      },
      {
        "key": "D",
        "text": "Шифрование данных перед сохранением"
      }
    ],
    "correctOption": "A",
    "answer": "A) Структурирование таблиц для устранения избыточности данных (1НФ, 2НФ, 3НФ)"
  },
  {
    "id": "q019",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое ACID?",
    "options": [
      {
        "key": "A",
        "text": "Правила именования таблиц"
      },
      {
        "key": "B",
        "text": "Atomicity, Consistency, Isolation, Durability — гарантии надёжности транзакций"
      },
      {
        "key": "C",
        "text": "Алгоритм оптимизации индексов"
      },
      {
        "key": "D",
        "text": "Стандарт защиты от SQL-инъекций"
      }
    ],
    "correctOption": "B",
    "answer": "B) Atomicity, Consistency, Isolation, Durability — гарантии надёжности транзакций"
  },
  {
    "id": "q020",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Уровни изоляции транзакций?",
    "options": [
      {
        "key": "A",
        "text": "Read Uncommitted, Read Committed, Repeatable Read, Serializable — контролируют допустимые аномалии при параллельных транзакциях"
      },
      {
        "key": "B",
        "text": "Уровни доступа: admin, editor, viewer, guest"
      },
      {
        "key": "C",
        "text": "Сколько таблиц можно менять в транзакции"
      },
      {
        "key": "D",
        "text": "Способы шифрования данных при передаче"
      }
    ],
    "correctOption": "A",
    "answer": "A) Read Uncommitted, Read Committed, Repeatable Read, Serializable — контролируют допустимые аномалии при параллельных транзакциях"
  },
  {
    "id": "q021",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "JOIN vs subquery?",
    "options": [
      {
        "key": "A",
        "text": "Subquery всегда быстрее JOIN"
      },
      {
        "key": "B",
        "text": "JOIN объединяет таблицы в одном запросе, subquery — вложенный; JOIN обычно эффективнее на больших данных"
      },
      {
        "key": "C",
        "text": "JOIN — только для двух таблиц"
      },
      {
        "key": "D",
        "text": "Это синонимы"
      }
    ],
    "correctOption": "B",
    "answer": "B) JOIN объединяет таблицы в одном запросе, subquery — вложенный; JOIN обычно эффективнее на больших данных"
  },
  {
    "id": "q022",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "INNER vs LEFT JOIN?",
    "options": [
      {
        "key": "A",
        "text": "INNER возвращает только совпадающие строки, LEFT — все строки левой таблицы плюс совпадения (NULL если нет)"
      },
      {
        "key": "B",
        "text": "INNER работает быстрее, но данные те же"
      },
      {
        "key": "C",
        "text": "LEFT возвращает только строки, которых нет в правой таблице"
      },
      {
        "key": "D",
        "text": "Отличаются порядком столбцов"
      }
    ],
    "correctOption": "A",
    "answer": "A) INNER возвращает только совпадающие строки, LEFT — все строки левой таблицы плюс совпадения (NULL если нет)"
  },
  {
    "id": "q023",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое N+1 problem?",
    "options": [
      {
        "key": "A",
        "text": "Ошибка вставки N+1 строки при ограничении на количество записей"
      },
      {
        "key": "B",
        "text": "Вместо одного запроса с JOIN — 1 запрос + N отдельных на каждую связанную запись"
      },
      {
        "key": "C",
        "text": "Индекс содержит на одну запись больше таблицы"
      },
      {
        "key": "D",
        "text": "Нехватка памяти при множестве JOIN"
      }
    ],
    "correctOption": "B",
    "answer": "B) Вместо одного запроса с JOIN — 1 запрос + N отдельных на каждую связанную запись"
  },
  {
    "id": "q024",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое primary/foreign key?",
    "options": [
      {
        "key": "A",
        "text": "Primary key должен быть строкой, foreign — числом"
      },
      {
        "key": "B",
        "text": "Primary key уникально идентифицирует строку, foreign ссылается на primary key другой таблицы"
      },
      {
        "key": "C",
        "text": "Foreign key автоматически создаёт индекс, primary — нет"
      },
      {
        "key": "D",
        "text": "Primary key может повторяться, foreign — нет"
      }
    ],
    "correctOption": "B",
    "answer": "B) Primary key уникально идентифицирует строку, foreign ссылается на primary key другой таблицы"
  },
  {
    "id": "q025",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "GROUP BY vs HAVING?",
    "options": [
      {
        "key": "A",
        "text": "HAVING фильтрует до группировки"
      },
      {
        "key": "B",
        "text": "Взаимозаменяемы"
      },
      {
        "key": "C",
        "text": "GROUP BY группирует строки, HAVING фильтрует уже сгруппированные результаты"
      },
      {
        "key": "D",
        "text": "HAVING только для числовых столбцов"
      }
    ],
    "correctOption": "C",
    "answer": "C) GROUP BY группирует строки, HAVING фильтрует уже сгруппированные результаты"
  },
  {
    "id": "q026",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое deadlock?",
    "options": [
      {
        "key": "A",
        "text": "Ошибка синтаксиса SQL"
      },
      {
        "key": "B",
        "text": "Две транзакции блокируют ресурсы друг друга и обе ждут бесконечно"
      },
      {
        "key": "C",
        "text": "Все индексы повреждены"
      },
      {
        "key": "D",
        "text": "Автоблокировка при лимите подключений"
      }
    ],
    "correctOption": "B",
    "answer": "B) Две транзакции блокируют ресурсы друг друга и обе ждут бесконечно"
  },
  {
    "id": "q027",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "DELETE vs TRUNCATE vs DROP?",
    "options": [
      {
        "key": "A",
        "text": "DELETE удаляет строки с логированием (можно откатить), TRUNCATE быстро очищает без лога, DROP удаляет саму таблицу"
      },
      {
        "key": "B",
        "text": "DELETE и TRUNCATE — одно и то же"
      },
      {
        "key": "C",
        "text": "DROP удаляет только данные, структура остаётся"
      },
      {
        "key": "D",
        "text": "TRUNCATE удаляет одну строку"
      }
    ],
    "correctOption": "A",
    "answer": "A) DELETE удаляет строки с логированием (можно откатить), TRUNCATE быстро очищает без лога, DROP удаляет саму таблицу"
  },
  {
    "id": "q028",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое EXPLAIN?",
    "options": [
      {
        "key": "A",
        "text": "Команда для добавления комментариев к запросу"
      },
      {
        "key": "B",
        "text": "Функция перевода текста ошибки"
      },
      {
        "key": "C",
        "text": "Показывает план выполнения запроса — для поиска узких мест"
      },
      {
        "key": "D",
        "text": "Автоисправление синтаксиса"
      }
    ],
    "correctOption": "C",
    "answer": "C) Показывает план выполнения запроса — для поиска узких мест"
  },
  {
    "id": "q029",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "Что такое составной индекс?",
    "options": [
      {
        "key": "A",
        "text": "Автосоздаётся для каждого foreign key"
      },
      {
        "key": "B",
        "text": "Индекс по нескольким столбцам; порядок столбцов важен"
      },
      {
        "key": "C",
        "text": "Объединяет данные из разных таблиц"
      },
      {
        "key": "D",
        "text": "Только для JSON-столбцов"
      }
    ],
    "correctOption": "B",
    "answer": "B) Индекс по нескольким столбцам; порядок столбцов важен"
  },
  {
    "id": "q030",
    "topic": "SQL И БАЗЫ ДАННЫХ",
    "question": "VARCHAR vs TEXT?",
    "options": [
      {
        "key": "A",
        "text": "VARCHAR — строка с ограничением длины, TEXT — для больших текстов (в PostgreSQL разница минимальна)"
      },
      {
        "key": "B",
        "text": "TEXT всегда быстрее"
      },
      {
        "key": "C",
        "text": "VARCHAR только для цифр"
      },
      {
        "key": "D",
        "text": "TEXT нельзя индексировать"
      }
    ],
    "correctOption": "A",
    "answer": "A) VARCHAR — строка с ограничением длины, TEXT — для больших текстов (в PostgreSQL разница минимальна)"
  },
  {
    "id": "q031",
    "topic": "SQLALCHEMY / ORM",
    "question": "lazy vs eager loading?",
    "options": [
      {
        "key": "A",
        "text": "Lazy всегда быстрее"
      },
      {
        "key": "B",
        "text": "Eager — только для чтения, lazy — для записи"
      },
      {
        "key": "C",
        "text": "Lazy подгружает при обращении (может вызвать N+1), eager загружает сразу через JOIN"
      },
      {
        "key": "D",
        "text": "Это одно и то же"
      }
    ],
    "correctOption": "C",
    "answer": "C) Lazy подгружает при обращении (может вызвать N+1), eager загружает сразу через JOIN"
  },
  {
    "id": "q032",
    "topic": "SQLALCHEMY / ORM",
    "question": "Что такое joinedload?",
    "options": [
      {
        "key": "A",
        "text": "Объединяет две базы данных в одно соединение"
      },
      {
        "key": "B",
        "text": "Метод eager loading, подгружающий связанные объекты одним JOIN"
      },
      {
        "key": "C",
        "text": "Ручное создание индексов"
      },
      {
        "key": "D",
        "text": "Отложенная загрузка до вызова .load()"
      }
    ],
    "correctOption": "B",
    "answer": "B) Метод eager loading, подгружающий связанные объекты одним JOIN"
  },
  {
    "id": "q033",
    "topic": "SQLALCHEMY / ORM",
    "question": "Что такое Session?",
    "options": [
      {
        "key": "A",
        "text": "Управляет транзакцией и unit of work, отслеживает изменения перед commit"
      },
      {
        "key": "B",
        "text": "Кэш браузера для результатов запросов"
      },
      {
        "key": "C",
        "text": "Встроенный механизм авторизации"
      },
      {
        "key": "D",
        "text": "Соединение, которое никогда не закрывается"
      }
    ],
    "correctOption": "A",
    "answer": "A) Управляет транзакцией и unit of work, отслеживает изменения перед commit"
  },
  {
    "id": "q034",
    "topic": "SQLALCHEMY / ORM",
    "question": "relationship() vs ForeignKey?",
    "options": [
      {
        "key": "A",
        "text": "Взаимозаменяемы"
      },
      {
        "key": "B",
        "text": "ForeignKey — ограничение на уровне БД, relationship — Python-абстракция для навигации"
      },
      {
        "key": "C",
        "text": "ForeignKey только для PostgreSQL"
      },
      {
        "key": "D",
        "text": "relationship() создаёт физический столбец"
      }
    ],
    "correctOption": "B",
    "answer": "B) ForeignKey — ограничение на уровне БД, relationship — Python-абстракция для навигации"
  },
  {
    "id": "q035",
    "topic": "SQLALCHEMY / ORM",
    "question": "Что такое backref/back_populates?",
    "options": [
      {
        "key": "A",
        "text": "Механизмы двунаправленной связи между моделями"
      },
      {
        "key": "B",
        "text": "Значения по умолчанию для столбца"
      },
      {
        "key": "C",
        "text": "Ограничение количества связанных объектов"
      },
      {
        "key": "D",
        "text": "Методы отката транзакции"
      }
    ],
    "correctOption": "A",
    "answer": "A) Механизмы двунаправленной связи между моделями"
  },
  {
    "id": "q036",
    "topic": "SQLALCHEMY / ORM",
    "question": "Зачем нужен Alembic?",
    "options": [
      {
        "key": "A",
        "text": "Автоматически оптимизирует SQL-запросы"
      },
      {
        "key": "B",
        "text": "Отслеживает изменения схемы БД, позволяет применять/откатывать версионно"
      },
      {
        "key": "C",
        "text": "Нужен только при первом запуске проекта"
      },
      {
        "key": "D",
        "text": "Система резервного копирования PostgreSQL"
      }
    ],
    "correctOption": "B",
    "answer": "B) Отслеживает изменения схемы БД, позволяет применять/откатывать версионно"
  },
  {
    "id": "q037",
    "topic": "SQLALCHEMY / ORM",
    "question": "flush() vs commit()?",
    "options": [
      {
        "key": "A",
        "text": "flush() отправляет изменения в рамках текущей транзакции без завершения, commit() фиксирует окончательно"
      },
      {
        "key": "B",
        "text": "Синонимы"
      },
      {
        "key": "C",
        "text": "flush() удаляет несохранённые изменения"
      },
      {
        "key": "D",
        "text": "commit() только для новых объектов"
      }
    ],
    "correctOption": "A",
    "answer": "A) flush() отправляет изменения в рамках текущей транзакции без завершения, commit() фиксирует окончательно"
  },
  {
    "id": "q038",
    "topic": "SQLALCHEMY / ORM",
    "question": "Что такое connection pool?",
    "options": [
      {
        "key": "A",
        "text": "Список всех таблиц БД"
      },
      {
        "key": "B",
        "text": "Хранилище резервных копий"
      },
      {
        "key": "C",
        "text": "Пул переиспользуемых соединений с БД, чтобы не открывать новое на каждый запрос"
      },
      {
        "key": "D",
        "text": "Распределение данных между базами"
      }
    ],
    "correctOption": "C",
    "answer": "C) Пул переиспользуемых соединений с БД, чтобы не открывать новое на каждый запрос"
  },
  {
    "id": "q039",
    "topic": "SQLALCHEMY / ORM",
    "question": "one-to-many vs many-to-many?",
    "options": [
      {
        "key": "A",
        "text": "One-to-many — одна запись связана со многими, many-to-many требует промежуточной таблицы"
      },
      {
        "key": "B",
        "text": "Many-to-many нельзя реализовать без NoSQL"
      },
      {
        "key": "C",
        "text": "Отличаются направлением foreign key"
      },
      {
        "key": "D",
        "text": "Many-to-many быстрее, без JOIN"
      }
    ],
    "correctOption": "A",
    "answer": "A) One-to-many — одна запись связана со многими, many-to-many требует промежуточной таблицы"
  },
  {
    "id": "q040",
    "topic": "SQLALCHEMY / ORM",
    "question": "Как избежать N+1 в SQLAlchemy?",
    "options": [
      {
        "key": "A",
        "text": "Только полное переписывание на чистый SQL"
      },
      {
        "key": "B",
        "text": "joinedload/selectinload — предзагрузка связей"
      },
      {
        "key": "C",
        "text": "Решается автоматически с версии 1.4"
      },
      {
        "key": "D",
        "text": "Отключить relationship() в модели"
      }
    ],
    "correctOption": "B",
    "answer": "B) joinedload/selectinload — предзагрузка связей"
  },
  {
    "id": "q041",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое Pydantic?",
    "options": [
      {
        "key": "A",
        "text": "Библиотека для валидации и сериализации данных через типизированные модели"
      },
      {
        "key": "B",
        "text": "Асинхронный веб-сервер FastAPI"
      },
      {
        "key": "C",
        "text": "ORM-альтернатива SQLAlchemy"
      },
      {
        "key": "D",
        "text": "Инструмент тестирования API"
      }
    ],
    "correctOption": "A",
    "answer": "A) Библиотека для валидации и сериализации данных через типизированные модели"
  },
  {
    "id": "q042",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Dependency Injection в FastAPI?",
    "options": [
      {
        "key": "A",
        "text": "Подключение библиотек через requirements.txt"
      },
      {
        "key": "B",
        "text": "Depends() — переиспользование логики между эндпоинтами"
      },
      {
        "key": "C",
        "text": "Автоинъекция SQL-запросов"
      },
      {
        "key": "D",
        "text": "Порядок запуска middleware"
      }
    ],
    "correctOption": "B",
    "answer": "B) Depends() — переиспользование логики между эндпоинтами"
  },
  {
    "id": "q043",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "async def vs def?",
    "options": [
      {
        "key": "A",
        "text": "async def всегда быстрее независимо от типа операции"
      },
      {
        "key": "B",
        "text": "def только для GET"
      },
      {
        "key": "C",
        "text": "async def выполняется в event loop, def — в thread pool; важно для I/O-bound операций"
      },
      {
        "key": "D",
        "text": "Работают одинаково"
      }
    ],
    "correctOption": "C",
    "answer": "C) async def выполняется в event loop, def — в thread pool; важно для I/O-bound операций"
  },
  {
    "id": "q044",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Когда async даёт выигрыш?",
    "options": [
      {
        "key": "A",
        "text": "При I/O-bound операциях, не при CPU-bound"
      },
      {
        "key": "B",
        "text": "Только для больших файлов"
      },
      {
        "key": "C",
        "text": "Всегда даёт выигрыш"
      },
      {
        "key": "D",
        "text": "Только в Docker"
      }
    ],
    "correctOption": "A",
    "answer": "A) При I/O-bound операциях, не при CPU-bound"
  },
  {
    "id": "q045",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое REST?",
    "options": [
      {
        "key": "A",
        "text": "Протокол шифрования"
      },
      {
        "key": "B",
        "text": "Архитектурный стиль API на основе ресурсов, HTTP-методов и statelessности"
      },
      {
        "key": "C",
        "text": "Библиотека для API без FastAPI"
      },
      {
        "key": "D",
        "text": "Формат данных, альтернативный JSON"
      }
    ],
    "correctOption": "B",
    "answer": "B) Архитектурный стиль API на основе ресурсов, HTTP-методов и statelessности"
  },
  {
    "id": "q046",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "HTTP-методы и их смысл?",
    "options": [
      {
        "key": "A",
        "text": "GET — создать, POST — получить"
      },
      {
        "key": "B",
        "text": "GET — получить, POST — создать, PUT — заменить полностью, PATCH — частично обновить, DELETE — удалить"
      },
      {
        "key": "C",
        "text": "Все методы взаимозаменяемы"
      },
      {
        "key": "D",
        "text": "GET и POST — единственные поддерживаемые"
      }
    ],
    "correctOption": "B",
    "answer": "B) GET — получить, POST — создать, PUT — заменить полностью, PATCH — частично обновить, DELETE — удалить"
  },
  {
    "id": "q047",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "PUT vs PATCH?",
    "options": [
      {
        "key": "A",
        "text": "Одно и то же"
      },
      {
        "key": "B",
        "text": "PATCH заменяет весь ресурс, PUT — частично"
      },
      {
        "key": "C",
        "text": "PUT заменяет весь ресурс целиком, PATCH обновляет только указанные поля"
      },
      {
        "key": "D",
        "text": "PUT только для файлов"
      }
    ],
    "correctOption": "C",
    "answer": "C) PUT заменяет весь ресурс целиком, PATCH обновляет только указанные поля"
  },
  {
    "id": "q048",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "HTTP коды 200/201/204/400/401/403/404/500?",
    "options": [
      {
        "key": "A",
        "text": "200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error"
      },
      {
        "key": "B",
        "text": "Все от 200 до 500 означают успех"
      },
      {
        "key": "C",
        "text": "404 — ошибка сервера, 500 — не найдено"
      },
      {
        "key": "D",
        "text": "201 — ошибка валидации"
      }
    ],
    "correctOption": "A",
    "answer": "A) 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error"
  },
  {
    "id": "q049",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "401 vs 403?",
    "options": [
      {
        "key": "A",
        "text": "Всегда возвращаются вместе"
      },
      {
        "key": "B",
        "text": "401 — не аутентифицирован, 403 — аутентифицирован, но нет прав"
      },
      {
        "key": "C",
        "text": "403 — сервер недоступен"
      },
      {
        "key": "D",
        "text": "401 — нет прав, 403 — не аутентифицирован"
      }
    ],
    "correctOption": "B",
    "answer": "B) 401 — не аутентифицирован, 403 — аутентифицирован, но нет прав"
  },
  {
    "id": "q050",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое middleware?",
    "options": [
      {
        "key": "A",
        "text": "Код до/после обработки запроса (логирование, CORS, аутентификация)"
      },
      {
        "key": "B",
        "text": "Отдельный микросервис для ошибок 500"
      },
      {
        "key": "C",
        "text": "БД, промежуточная между клиентом и основной"
      },
      {
        "key": "D",
        "text": "Библиотека автодокументации"
      }
    ],
    "correctOption": "A",
    "answer": "A) Код до/после обработки запроса (логирование, CORS, аутентификация)"
  },
  {
    "id": "q051",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое CORS?",
    "options": [
      {
        "key": "A",
        "text": "Протокол шифрования между сервером и БД"
      },
      {
        "key": "B",
        "text": "Механизм браузера, разрешающий/запрещающий запросы с другого домена"
      },
      {
        "key": "C",
        "text": "Ограничение количества запросов с IP"
      },
      {
        "key": "D",
        "text": "Стандарт сжатия HTTP-ответов"
      }
    ],
    "correctOption": "B",
    "answer": "B) Механизм браузера, разрешающий/запрещающий запросы с другого домена"
  },
  {
    "id": "q052",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое stateless API?",
    "options": [
      {
        "key": "A",
        "text": "Не может обрабатывать больше одного запроса"
      },
      {
        "key": "B",
        "text": "Работает только с реляционными БД"
      },
      {
        "key": "C",
        "text": "Сервер не хранит состояние клиента между запросами"
      },
      {
        "key": "D",
        "text": "Автосохраняет состояние в cookies"
      }
    ],
    "correctOption": "C",
    "answer": "C) Сервер не хранит состояние клиента между запросами"
  },
  {
    "id": "q053",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "query params vs path params?",
    "options": [
      {
        "key": "A",
        "text": "Path — часть URL (/users/{id}), query — после ? (/users?age=20)"
      },
      {
        "key": "B",
        "text": "Query обязательны, path — опциональны"
      },
      {
        "key": "C",
        "text": "Path только в POST"
      },
      {
        "key": "D",
        "text": "Это одно и то же"
      }
    ],
    "correctOption": "A",
    "answer": "A) Path — часть URL (/users/{id}), query — после ? (/users?age=20)"
  },
  {
    "id": "q054",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое request body?",
    "options": [
      {
        "key": "A",
        "text": "Данные, которые сервер добавляет для отладки"
      },
      {
        "key": "B",
        "text": "Данные в теле запроса, обычно JSON, для POST/PUT/PATCH"
      },
      {
        "key": "C",
        "text": "Часть URL с параметрами фильтрации"
      },
      {
        "key": "D",
        "text": "Заголовки авторизации"
      }
    ],
    "correctOption": "B",
    "answer": "B) Данные в теле запроса, обычно JSON, для POST/PUT/PATCH"
  },
  {
    "id": "q055",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Как FastAPI генерирует документацию?",
    "options": [
      {
        "key": "A",
        "text": "Вручную, разработчик пишет отдельно"
      },
      {
        "key": "B",
        "text": "Только в платной версии"
      },
      {
        "key": "C",
        "text": "Автоматически на основе Pydantic-моделей и type hints через OpenAPI/Swagger"
      },
      {
        "key": "D",
        "text": "Только с флагом --docs"
      }
    ],
    "correctOption": "C",
    "answer": "C) Автоматически на основе Pydantic-моделей и type hints через OpenAPI/Swagger"
  },
  {
    "id": "q056",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое response_model?",
    "options": [
      {
        "key": "A",
        "text": "Определяет схему и валидацию ответа, скрывает лишние поля"
      },
      {
        "key": "B",
        "text": "Модель БД для сохранения ответа"
      },
      {
        "key": "C",
        "text": "Формат ответа — XML или JSON"
      },
      {
        "key": "D",
        "text": "Логирование исходящих ответов"
      }
    ],
    "correctOption": "A",
    "answer": "A) Определяет схему и валидацию ответа, скрывает лишние поля"
  },
  {
    "id": "q057",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Query, Path, Body в FastAPI?",
    "options": [
      {
        "key": "A",
        "text": "Взаимозаменяемы"
      },
      {
        "key": "B",
        "text": "Явно указывают источник параметра — query string, URL или тело запроса"
      },
      {
        "key": "C",
        "text": "Только для чисел"
      },
      {
        "key": "D",
        "text": "Path для GET, остальные для POST"
      }
    ],
    "correctOption": "B",
    "answer": "B) Явно указывают источник параметра — query string, URL или тело запроса"
  },
  {
    "id": "q058",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Зачем нужен versioning API?",
    "options": [
      {
        "key": "A",
        "text": "Поддержка нескольких версий API (/v1/, /v2/) без поломки старых клиентов"
      },
      {
        "key": "B",
        "text": "Автообновление клиентов"
      },
      {
        "key": "C",
        "text": "Нумерация багов"
      },
      {
        "key": "D",
        "text": "Версия Python для API"
      }
    ],
    "correctOption": "A",
    "answer": "A) Поддержка нескольких версий API (/v1/, /v2/) без поломки старых клиентов"
  },
  {
    "id": "q059",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Что такое idempotency?",
    "options": [
      {
        "key": "A",
        "text": "Сервер обрабатывает запрос быстрее с каждым разом"
      },
      {
        "key": "B",
        "text": "Метод даёт одинаковый результат при повторных вызовах (GET, PUT, DELETE идемпотентны, POST — нет)"
      },
      {
        "key": "C",
        "text": "Работа API без интернета"
      },
      {
        "key": "D",
        "text": "Уникальный ID пользователя в каждом запросе"
      }
    ],
    "correctOption": "B",
    "answer": "B) Метод даёт одинаковый результат при повторных вызовах (GET, PUT, DELETE идемпотентны, POST — нет)"
  },
  {
    "id": "q060",
    "topic": "FASTAPI / WEB / HTTP",
    "question": "Зачем нужна pagination?",
    "options": [
      {
        "key": "A",
        "text": "Ограничивает размер запроса в байтах"
      },
      {
        "key": "B",
        "text": "Шифрование больших данных"
      },
      {
        "key": "C",
        "text": "Разбиение большого набора данных на страницы для производительности и UX"
      },
      {
        "key": "D",
        "text": "Удаление старых записей"
      }
    ],
    "correctOption": "C",
    "answer": "C) Разбиение большого набора данных на страницы для производительности и UX"
  },
  {
    "id": "q061",
    "topic": "AUTH & SECURITY",
    "question": "Из чего состоит JWT?",
    "options": [
      {
        "key": "A",
        "text": "Header, Payload, Signature"
      },
      {
        "key": "B",
        "text": "Username, Password, Token"
      },
      {
        "key": "C",
        "text": "Access, Refresh, Session"
      },
      {
        "key": "D",
        "text": "Header, Body, Footer"
      }
    ],
    "correctOption": "A",
    "answer": "A) Header, Payload, Signature"
  },
  {
    "id": "q062",
    "topic": "AUTH & SECURITY",
    "question": "Как проверяется валидность JWT?",
    "options": [
      {
        "key": "A",
        "text": "Сравнение времени создания токена с текущим"
      },
      {
        "key": "B",
        "text": "Токен валиден, если существует в БД сервера"
      },
      {
        "key": "C",
        "text": "Сервер пересчитывает подпись с секретным ключом и сравнивает с подписью в токене"
      },
      {
        "key": "D",
        "text": "Проверяется браузером клиента"
      }
    ],
    "correctOption": "C",
    "answer": "C) Сервер пересчитывает подпись с секретным ключом и сравнивает с подписью в токене"
  },
  {
    "id": "q063",
    "topic": "AUTH & SECURITY",
    "question": "Access vs refresh token?",
    "options": [
      {
        "key": "A",
        "text": "Access — долгоживущий, refresh — короткоживущий"
      },
      {
        "key": "B",
        "text": "Access — короткоживущий, для доступа к ресурсам; refresh — долгоживущий, для получения нового access token"
      },
      {
        "key": "C",
        "text": "Это одно и то же"
      },
      {
        "key": "D",
        "text": "Refresh только для смены пароля"
      }
    ],
    "correctOption": "B",
    "answer": "B) Access — короткоживущий, для доступа к ресурсам; refresh — долгоживущий, для получения нового access token"
  },
  {
    "id": "q064",
    "topic": "AUTH & SECURITY",
    "question": "Зачем нужен bcrypt?",
    "options": [
      {
        "key": "A",
        "text": "Сжатие паролей перед отправкой"
      },
      {
        "key": "B",
        "text": "Хэширует пароль с солью и медленным алгоритмом, затрудняя brute-force"
      },
      {
        "key": "C",
        "text": "Шифрование всей БД"
      },
      {
        "key": "D",
        "text": "Протокол передачи паролей"
      }
    ],
    "correctOption": "B",
    "answer": "B) Хэширует пароль с солью и медленным алгоритмом, затрудняя brute-force"
  },
  {
    "id": "q065",
    "topic": "AUTH & SECURITY",
    "question": "Почему нельзя хранить пароли в открытом виде?",
    "options": [
      {
        "key": "A",
        "text": "Можно, если БД защищена паролем"
      },
      {
        "key": "B",
        "text": "Достаточно base64"
      },
      {
        "key": "C",
        "text": "Утечка БД раскроет все пароли напрямую — хэширование делает восстановление вычислительно дорогим"
      },
      {
        "key": "D",
        "text": "Безопасно при HTTPS"
      }
    ],
    "correctOption": "C",
    "answer": "C) Утечка БД раскроет все пароли напрямую — хэширование делает восстановление вычислительно дорогим"
  },
  {
    "id": "q066",
    "topic": "AUTH & SECURITY",
    "question": "Где безопаснее хранить JWT?",
    "options": [
      {
        "key": "A",
        "text": "localStorage безопаснее"
      },
      {
        "key": "B",
        "text": "HttpOnly cookie безопаснее localStorage, недоступен для JS, защищён от XSS"
      },
      {
        "key": "C",
        "text": "Всегда в URL"
      },
      {
        "key": "D",
        "text": "Разницы нет"
      }
    ],
    "correctOption": "B",
    "answer": "B) HttpOnly cookie безопаснее localStorage, недоступен для JS, защищён от XSS"
  },
  {
    "id": "q067",
    "topic": "AUTH & SECURITY",
    "question": "Что такое OAuth2?",
    "options": [
      {
        "key": "A",
        "text": "Библиотека хэширования паролей"
      },
      {
        "key": "B",
        "text": "Протокол авторизации, дающий ограниченный доступ без передачи пароля"
      },
      {
        "key": "C",
        "text": "Формат токена с доп. шифрованием"
      },
      {
        "key": "D",
        "text": "Механизм ограничения запросов в FastAPI"
      }
    ],
    "correctOption": "B",
    "answer": "B) Протокол авторизации, дающий ограниченный доступ без передачи пароля"
  },
  {
    "id": "q068",
    "topic": "AUTH & SECURITY",
    "question": "Аутентификация vs авторизация?",
    "options": [
      {
        "key": "A",
        "text": "Синонимы"
      },
      {
        "key": "B",
        "text": "Авторизация — личность, аутентификация — права"
      },
      {
        "key": "C",
        "text": "Аутентификация — подтверждение личности, авторизация — проверка прав"
      },
      {
        "key": "D",
        "text": "Аутентификация только для API"
      }
    ],
    "correctOption": "C",
    "answer": "C) Аутентификация — подтверждение личности, авторизация — проверка прав"
  },
  {
    "id": "q069",
    "topic": "AUTH & SECURITY",
    "question": "Что такое CSRF?",
    "options": [
      {
        "key": "A",
        "text": "Чтение БД через SQL-уязвимость"
      },
      {
        "key": "B",
        "text": "Внедрение JS-кода на страницу"
      },
      {
        "key": "C",
        "text": "Атака, заставляющая браузер жертвы выполнить запрос от её имени"
      },
      {
        "key": "D",
        "text": "Перехват пароля при передаче"
      }
    ],
    "correctOption": "C",
    "answer": "C) Атака, заставляющая браузер жертвы выполнить запрос от её имени"
  },
  {
    "id": "q070",
    "topic": "AUTH & SECURITY",
    "question": "Что такое XSS?",
    "options": [
      {
        "key": "A",
        "text": "Внедрение вредоносного JavaScript через непроверенный ввод"
      },
      {
        "key": "B",
        "text": "Атака отправкой множества запросов"
      },
      {
        "key": "C",
        "text": "Обход проверки JWT"
      },
      {
        "key": "D",
        "text": "Подделка заголовков для обхода CORS"
      }
    ],
    "correctOption": "A",
    "answer": "A) Внедрение вредоносного JavaScript через непроверенный ввод"
  },
  {
    "id": "q071",
    "topic": "DOCKER",
    "question": "image vs container?",
    "options": [
      {
        "key": "A",
        "text": "Одно и то же"
      },
      {
        "key": "B",
        "text": "Container — шаблон, image — экземпляр"
      },
      {
        "key": "C",
        "text": "Image — статичный шаблон (read-only), container — запущенный экземпляр image"
      },
      {
        "key": "D",
        "text": "Image только локально"
      }
    ],
    "correctOption": "C",
    "answer": "C) Image — статичный шаблон (read-only), container — запущенный экземпляр image"
  },
  {
    "id": "q072",
    "topic": "DOCKER",
    "question": "Что такое Dockerfile?",
    "options": [
      {
        "key": "A",
        "text": "Конфигурация сети контейнера"
      },
      {
        "key": "B",
        "text": "Текстовый файл с инструкциями сборки image (FROM, COPY, RUN, CMD)"
      },
      {
        "key": "C",
        "text": "Файл логов контейнера"
      },
      {
        "key": "D",
        "text": "Скрипт удаления контейнеров"
      }
    ],
    "correctOption": "B",
    "answer": "B) Текстовый файл с инструкциями сборки image (FROM, COPY, RUN, CMD)"
  },
  {
    "id": "q073",
    "topic": "DOCKER",
    "question": "Зачем multi-stage build?",
    "options": [
      {
        "key": "A",
        "text": "Запуск нескольких контейнеров из одного Dockerfile"
      },
      {
        "key": "B",
        "text": "Уменьшение размера image, отделение сборки от запуска"
      },
      {
        "key": "C",
        "text": "Автоисправление ошибок сборки"
      },
      {
        "key": "D",
        "text": "Разделение Dockerfile на файлы"
      }
    ],
    "correctOption": "B",
    "answer": "B) Уменьшение размера image, отделение сборки от запуска"
  },
  {
    "id": "q074",
    "topic": "DOCKER",
    "question": "Что такое docker-compose?",
    "options": [
      {
        "key": "A",
        "text": "Описание и запуск нескольких контейнеров как единой системы через YAML"
      },
      {
        "key": "B",
        "text": "Сжатие image перед публикацией"
      },
      {
        "key": "C",
        "text": "Альтернатива Dockerfile для одного контейнера"
      },
      {
        "key": "D",
        "text": "Мониторинг производительности"
      }
    ],
    "correctOption": "A",
    "answer": "A) Описание и запуск нескольких контейнеров как единой системы через YAML"
  },
  {
    "id": "q075",
    "topic": "DOCKER",
    "question": "Что такое volume?",
    "options": [
      {
        "key": "A",
        "text": "Ограничение размера данных в контейнере"
      },
      {
        "key": "B",
        "text": "Виртуальный сетевой интерфейс"
      },
      {
        "key": "C",
        "text": "Механизм сохранения данных вне жизненного цикла контейнера"
      },
      {
        "key": "D",
        "text": "Снимок состояния контейнера"
      }
    ],
    "correctOption": "C",
    "answer": "C) Механизм сохранения данных вне жизненного цикла контейнера"
  },
  {
    "id": "q076",
    "topic": "DOCKER",
    "question": "CMD vs ENTRYPOINT?",
    "options": [
      {
        "key": "A",
        "text": "Взаимоисключающие, можно только одну"
      },
      {
        "key": "B",
        "text": "ENTRYPOINT — основная команда, CMD — аргументы по умолчанию, можно переопределить"
      },
      {
        "key": "C",
        "text": "CMD при сборке, ENTRYPOINT при запуске"
      },
      {
        "key": "D",
        "text": "ENTRYPOINT только для Linux"
      }
    ],
    "correctOption": "B",
    "answer": "B) ENTRYPOINT — основная команда, CMD — аргументы по умолчанию, можно переопределить"
  },
  {
    "id": "q077",
    "topic": "DOCKER",
    "question": "Что такое Docker network?",
    "options": [
      {
        "key": "A",
        "text": "Список образов на Docker Hub"
      },
      {
        "key": "B",
        "text": "Ограничение скорости интернета контейнера"
      },
      {
        "key": "C",
        "text": "Изолированное сетевое пространство для общения контейнеров по имени сервиса"
      },
      {
        "key": "D",
        "text": "Шифрование трафика хост-контейнер"
      }
    ],
    "correctOption": "C",
    "answer": "C) Изолированное сетевое пространство для общения контейнеров по имени сервиса"
  },
  {
    "id": "q078",
    "topic": "DOCKER",
    "question": "Зачем .dockerignore?",
    "options": [
      {
        "key": "A",
        "text": "Запрещает останавливать контейнеры"
      },
      {
        "key": "B",
        "text": "Исключает файлы (.git, venv) из контекста сборки, ускоряя build"
      },
      {
        "key": "C",
        "text": "Скрывает контейнер от docker ps"
      },
      {
        "key": "D",
        "text": "Отключает логирование"
      }
    ],
    "correctOption": "B",
    "answer": "B) Исключает файлы (.git, venv) из контекста сборки, ускоряя build"
  },
  {
    "id": "q079",
    "topic": "DOCKER",
    "question": "Данные теряются при падении контейнера?",
    "options": [
      {
        "key": "A",
        "text": "Никогда, Docker бэкапит автоматически"
      },
      {
        "key": "B",
        "text": "Только без флага --rm"
      },
      {
        "key": "C",
        "text": "Да, если данные не в volume — файловая система контейнера эфемерна"
      },
      {
        "key": "D",
        "text": "Только в Windows"
      }
    ],
    "correctOption": "C",
    "answer": "C) Да, если данные не в volume — файловая система контейнера эфемерна"
  },
  {
    "id": "q080",
    "topic": "DOCKER",
    "question": "docker run vs docker exec?",
    "options": [
      {
        "key": "A",
        "text": "Синонимы"
      },
      {
        "key": "B",
        "text": "run создаёт и запускает новый контейнер, exec выполняет команду в уже работающем"
      },
      {
        "key": "C",
        "text": "exec создаёт контейнер, run запускает существующий"
      },
      {
        "key": "D",
        "text": "run только для Docker Hub образов"
      }
    ],
    "correctOption": "B",
    "answer": "B) run создаёт и запускает новый контейнер, exec выполняет команду в уже работающем"
  },
  {
    "id": "q081",
    "topic": "TESTING",
    "question": "unit vs integration тесты?",
    "options": [
      {
        "key": "A",
        "text": "Unit тестирует изолированную единицу с моками, integration проверяет взаимодействие компонентов"
      },
      {
        "key": "B",
        "text": "Unit медленнее integration"
      },
      {
        "key": "C",
        "text": "Integration не требует БД"
      },
      {
        "key": "D",
        "text": "Это одно и то же"
      }
    ],
    "correctOption": "A",
    "answer": "A) Unit тестирует изолированную единицу с моками, integration проверяет взаимодействие компонентов"
  },
  {
    "id": "q082",
    "topic": "TESTING",
    "question": "Что такое fixture в pytest?",
    "options": [
      {
        "key": "A",
        "text": "Финальная проверка результата"
      },
      {
        "key": "B",
        "text": "Переиспользуемая функция для подготовки данных/окружения перед тестом"
      },
      {
        "key": "C",
        "text": "Пометка теста как сломанного"
      },
      {
        "key": "D",
        "text": "Конфигурация порядка запуска тестов"
      }
    ],
    "correctOption": "B",
    "answer": "B) Переиспользуемая функция для подготовки данных/окружения перед тестом"
  },
  {
    "id": "q083",
    "topic": "TESTING",
    "question": "Что такое mocking?",
    "options": [
      {
        "key": "A",
        "text": "Автогенерация тестовых данных из Pydantic-моделей"
      },
      {
        "key": "B",
        "text": "Измерение скорости тестов"
      },
      {
        "key": "C",
        "text": "Замена реальной зависимости на фейковый объект для изолированного теста"
      },
      {
        "key": "D",
        "text": "Копирование продакшн-БД в тестовую"
      }
    ],
    "correctOption": "C",
    "answer": "C) Замена реальной зависимости на фейковый объект для изолированного теста"
  },
  {
    "id": "q084",
    "topic": "TESTING",
    "question": "Что такое TestClient?",
    "options": [
      {
        "key": "A",
        "text": "Нагрузочное тестирование production"
      },
      {
        "key": "B",
        "text": "Отправка тестовых HTTP-запросов без реального запуска сервера"
      },
      {
        "key": "C",
        "text": "Генерация Swagger-документации в тестах"
      },
      {
        "key": "D",
        "text": "Тестирование только БД"
      }
    ],
    "correctOption": "B",
    "answer": "B) Отправка тестовых HTTP-запросов без реального запуска сервера"
  },
  {
    "id": "q085",
    "topic": "TESTING",
    "question": "Что такое test coverage?",
    "options": [
      {
        "key": "A",
        "text": "Процент кода, покрытого тестами"
      },
      {
        "key": "B",
        "text": "Количество успешных тестов за прогон CI"
      },
      {
        "key": "C",
        "text": "Время выполнения всех тестов"
      },
      {
        "key": "D",
        "text": "Число разработчиков, писавших тесты"
      }
    ],
    "correctOption": "A",
    "answer": "A) Процент кода, покрытого тестами"
  },
  {
    "id": "q086",
    "topic": "TESTING",
    "question": "Что такое AAA паттерн?",
    "options": [
      {
        "key": "A",
        "text": "Authentication, Authorization, Audit"
      },
      {
        "key": "B",
        "text": "Arrange, Act, Assert"
      },
      {
        "key": "C",
        "text": "Assert, Act, Arrange"
      },
      {
        "key": "D",
        "text": "Async, Await, Assert"
      }
    ],
    "correctOption": "B",
    "answer": "B) Arrange, Act, Assert"
  },
  {
    "id": "q087",
    "topic": "TESTING",
    "question": "Зачем отдельная тестовая БД?",
    "options": [
      {
        "key": "A",
        "text": "Только для enterprise-проектов"
      },
      {
        "key": "B",
        "text": "Замедляет тесты"
      },
      {
        "key": "C",
        "text": "Чтобы тесты не зависели от продакшн/dev данных и выполнялись безопасно и параллельно"
      },
      {
        "key": "D",
        "text": "Только для integration-тестов"
      }
    ],
    "correctOption": "C",
    "answer": "C) Чтобы тесты не зависели от продакшн/dev данных и выполнялись безопасно и параллельно"
  },
  {
    "id": "q088",
    "topic": "TESTING",
    "question": "Что такое CI/CD в контексте тестов?",
    "options": [
      {
        "key": "A",
        "text": "Только инструмент деплоя"
      },
      {
        "key": "B",
        "text": "Автозапуск тестов при каждом пуше/PR, чтобы ловить баги до мержа"
      },
      {
        "key": "C",
        "text": "Полностью заменяет ручное тестирование"
      },
      {
        "key": "D",
        "text": "Запуск тестов раз в неделю"
      }
    ],
    "correctOption": "B",
    "answer": "B) Автозапуск тестов при каждом пуше/PR, чтобы ловить баги до мержа"
  },
  {
    "id": "q089",
    "topic": "TESTING",
    "question": "Что такое regression test?",
    "options": [
      {
        "key": "A",
        "text": "Тест производительности под нагрузкой"
      },
      {
        "key": "B",
        "text": "Тест для кода, который скоро удалят"
      },
      {
        "key": "C",
        "text": "Тест, что новая функциональность не сломала существующую"
      },
      {
        "key": "D",
        "text": "Тест перед первым релизом"
      }
    ],
    "correctOption": "C",
    "answer": "C) Тест, что новая функциональность не сломала существующую"
  },
  {
    "id": "q090",
    "topic": "TESTING",
    "question": "Что такое parametrize?",
    "options": [
      {
        "key": "A",
        "text": "Ограничивает тест определённой средой"
      },
      {
        "key": "B",
        "text": "Передача параметров командной строки в pytest"
      },
      {
        "key": "C",
        "text": "@pytest.mark.parametrize — запуск одного теста с разными наборами данных"
      },
      {
        "key": "D",
        "text": "Ограничение параметров функции"
      }
    ],
    "correctOption": "C",
    "answer": "C) @pytest.mark.parametrize — запуск одного теста с разными наборами данных"
  },
  {
    "id": "q091",
    "topic": "SYSTEM DESIGN",
    "question": "Horizontal vs vertical scaling?",
    "options": [
      {
        "key": "A",
        "text": "Horizontal — мощность одного сервера"
      },
      {
        "key": "B",
        "text": "Vertical — увеличение мощности одного сервера, horizontal — добавление серверов"
      },
      {
        "key": "C",
        "text": "Это одно и то же"
      },
      {
        "key": "D",
        "text": "Vertical только для БД"
      }
    ],
    "correctOption": "B",
    "answer": "B) Vertical — увеличение мощности одного сервера, horizontal — добавление серверов"
  },
  {
    "id": "q092",
    "topic": "SYSTEM DESIGN",
    "question": "Зачем Redis в backend?",
    "options": [
      {
        "key": "A",
        "text": "Только для логов"
      },
      {
        "key": "B",
        "text": "Быстрое in-memory хранилище для кэша, сессий, очередей — снижает нагрузку на БД"
      },
      {
        "key": "C",
        "text": "Альтернатива PostgreSQL для основных данных"
      },
      {
        "key": "D",
        "text": "Только для очередей, не для кэша"
      }
    ],
    "correctOption": "B",
    "answer": "B) Быстрое in-memory хранилище для кэша, сессий, очередей — снижает нагрузку на БД"
  },
  {
    "id": "q093",
    "topic": "SYSTEM DESIGN",
    "question": "Что такое кэширование?",
    "options": [
      {
        "key": "A",
        "text": "Хранение часто запрашиваемых данных для быстрого доступа; опасно при неправильной инвалидации"
      },
      {
        "key": "B",
        "text": "Сжатие данных перед отправкой"
      },
      {
        "key": "C",
        "text": "Всегда безопасно без недостатков"
      },
      {
        "key": "D",
        "text": "Автоудаление старых данных из БД"
      }
    ],
    "correctOption": "A",
    "answer": "A) Хранение часто запрашиваемых данных для быстрого доступа; опасно при неправильной инвалидации"
  },
  {
    "id": "q094",
    "topic": "SYSTEM DESIGN",
    "question": "Что такое load balancer?",
    "options": [
      {
        "key": "A",
        "text": "Распределение данных между таблицами БД"
      },
      {
        "key": "B",
        "text": "Распределяет запросы между серверами для отказоустойчивости и масштабируемости"
      },
      {
        "key": "C",
        "text": "Автомасштабирование БД"
      },
      {
        "key": "D",
        "text": "Ограничение запросов от пользователя"
      }
    ],
    "correctOption": "B",
    "answer": "B) Распределяет запросы между серверами для отказоустойчивости и масштабируемости"
  },
  {
    "id": "q095",
    "topic": "SYSTEM DESIGN",
    "question": "Зачем нужен rate limiting?",
    "options": [
      {
        "key": "A",
        "text": "Ограничение размера загружаемого файла"
      },
      {
        "key": "B",
        "text": "Ограничение количества запросов от клиента за период — защита от abuse"
      },
      {
        "key": "C",
        "text": "Ускорение обработки за счёт серверов"
      },
      {
        "key": "D",
        "text": "Ограничение времени ответа сервера"
      }
    ],
    "correctOption": "B",
    "answer": "B) Ограничение количества запросов от клиента за период — защита от abuse"
  },
  {
    "id": "q096",
    "topic": "SYSTEM DESIGN",
    "question": "Что такое message queue?",
    "options": [
      {
        "key": "A",
        "text": "Список ошибок перед релизом"
      },
      {
        "key": "B",
        "text": "Внутренний журнал логов сервиса"
      },
      {
        "key": "C",
        "text": "Асинхронная передача сообщений между сервисами, разгружающая синхронные вызовы"
      },
      {
        "key": "D",
        "text": "БД для чатов и уведомлений"
      }
    ],
    "correctOption": "C",
    "answer": "C) Асинхронная передача сообщений между сервисами, разгружающая синхронные вызовы"
  },
  {
    "id": "q097",
    "topic": "SYSTEM DESIGN",
    "question": "Monolith vs microservices?",
    "options": [
      {
        "key": "A",
        "text": "Monolith — единый деплоймент, microservices — независимые сервисы, общающиеся по сети"
      },
      {
        "key": "B",
        "text": "Microservices — старый подход"
      },
      {
        "key": "C",
        "text": "Отличаются только языком программирования"
      },
      {
        "key": "D",
        "text": "Microservices всегда быстрее"
      }
    ],
    "correctOption": "A",
    "answer": "A) Monolith — единый деплоймент, microservices — независимые сервисы, общающиеся по сети"
  },
  {
    "id": "q098",
    "topic": "SYSTEM DESIGN",
    "question": "Что такое bottleneck?",
    "options": [
      {
        "key": "A",
        "text": "Ошибка конфигурации Docker"
      },
      {
        "key": "B",
        "text": "Компонент, ограничивающий общую производительность системы"
      },
      {
        "key": "C",
        "text": "Тип индекса, замедляющий запросы"
      },
      {
        "key": "D",
        "text": "Место без обработки исключений"
      }
    ],
    "correctOption": "B",
    "answer": "B) Компонент, ограничивающий общую производительность системы"
  },
  {
    "id": "q099",
    "topic": "SYSTEM DESIGN",
    "question": "Зачем Nginx перед приложением?",
    "options": [
      {
        "key": "A",
        "text": "Только для статических файлов"
      },
      {
        "key": "B",
        "text": "Reverse proxy — балансировка нагрузки, SSL termination, отдача статики, защита backend"
      },
      {
        "key": "C",
        "text": "Заменяет БД"
      },
      {
        "key": "D",
        "text": "Только для локальной разработки"
      }
    ],
    "correctOption": "B",
    "answer": "B) Reverse proxy — балансировка нагрузки, SSL termination, отдача статики, защита backend"
  },
  {
    "id": "q100",
    "topic": "SYSTEM DESIGN",
    "question": "Что такое eventual consistency?",
    "options": [
      {
        "key": "A",
        "text": "Данные всегда мгновенно согласованы"
      },
      {
        "key": "B",
        "text": "БД автоисправляет ошибки в данных"
      },
      {
        "key": "C",
        "text": "Данные в распределённой системе становятся согласованными не сразу, а через время"
      },
      {
        "key": "D",
        "text": "Транзакция никогда не отменяется после подтверждения"
      }
    ],
    "correctOption": "C",
    "answer": "C) Данные в распределённой системе становятся согласованными не сразу, а через время"
  }
];
