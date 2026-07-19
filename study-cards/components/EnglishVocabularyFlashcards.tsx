import { useEffect, useMemo, useState } from "react";

export interface Flashcard {
  id: string;
  englishWord: string;
  pronunciation: string;
  definition: string;
  partOfSpeech: string;
  exampleSentence: string;
  category?: string;
}

interface EnglishVocabularyFlashcardsProps {
  flashcards: Flashcard[];
  onGotIt?: (flashcard: Flashcard) => void;
  onNeedReview?: (flashcard: Flashcard) => void;
}

export function EnglishVocabularyFlashcards({
  flashcards,
  onGotIt,
  onNeedReview
}: EnglishVocabularyFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<Record<string, "got" | "review">>({});

  const currentCard = flashcards[currentIndex];
  const progressPercent = useMemo(() => {
    if (!flashcards.length) {
      return 0;
    }

    const gotCount = flashcards.filter((card) => progress[card.id] === "got").length;
    return Math.round((gotCount / flashcards.length) * 100);
  }, [flashcards, progress]);

  const goToCard = (nextIndex: number) => {
    setCurrentIndex((previousIndex) => {
      const boundedIndex = Math.min(Math.max(nextIndex, 0), flashcards.length - 1);
      return Number.isFinite(boundedIndex) ? boundedIndex : previousIndex;
    });
    setIsFlipped(false);
  };

  const goNext = () => {
    goToCard(currentIndex + 1);
  };

  const goPrevious = () => {
    goToCard(currentIndex - 1);
  };

  const markGotIt = () => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      [currentCard.id]: "got"
    }));
    onGotIt?.(currentCard);
  };

  const markNeedReview = () => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      [currentCard.id]: "review"
    }));
    onNeedReview?.(currentCard);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsFlipped((value) => !value);
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, flashcards.length]);

  if (!currentCard) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-slate-500">No flashcards available.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">English vocabulary</p>
          <h2 className="text-2xl font-semibold text-slate-950">Flashcards</h2>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-slate-500">
            {currentIndex + 1} / {flashcards.length}
          </p>
          <p className="text-lg font-semibold text-emerald-700">{progressPercent}% got it</p>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setIsFlipped((value) => !value)}
        className="group h-80 w-full [perspective:1200px] sm:h-96"
        aria-label="Flip vocabulary flashcard"
      >
        <span
          className={[
            "relative block h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          ].join(" ")}
        >
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl [backface-visibility:hidden]">
            <span className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              English word
            </span>
            <strong className="text-5xl font-semibold text-slate-950 sm:text-7xl">
              {currentCard.englishWord}
            </strong>
            <span className="mt-3 text-lg italic text-slate-400">
              {currentCard.pronunciation}
            </span>
            {currentCard.category ? (
              <span className="mt-5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                {currentCard.category}
              </span>
            ) : null}
          </span>

          <span className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-left shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="mb-4 text-sm font-medium uppercase tracking-wide text-emerald-700">
              {currentCard.partOfSpeech}
            </span>
            <strong className="text-2xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {currentCard.definition}
            </strong>
            <p className="mt-6 text-base leading-7 text-slate-600">
              {currentCard.exampleSentence}
            </p>
          </span>
        </span>
      </button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === flashcards.length - 1}
            className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={markNeedReview}
            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 font-medium text-amber-800 shadow-sm transition hover:bg-amber-100"
          >
            Need Review
          </button>
          <button
            type="button"
            onClick={markGotIt}
            className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-emerald-800"
          >
            Got it
          </button>
        </div>
      </div>
    </section>
  );
}

const sampleFlashcards: Flashcard[] = [
  {
    id: "word-1",
    englishWord: "resilient",
    pronunciation: "/rɪˈzɪliənt/",
    definition: "Able to recover quickly after difficulty.",
    partOfSpeech: "adjective",
    exampleSentence: "She stayed resilient during the long interview process.",
    category: "Work / Career"
  },
  {
    id: "word-2",
    englishWord: "concise",
    pronunciation: "/kənˈsaɪs/",
    definition: "Giving a lot of information clearly in a few words.",
    partOfSpeech: "adjective",
    exampleSentence: "Keep your answer concise when the interviewer asks about your last project.",
    category: "General academic"
  },
  {
    id: "word-3",
    englishWord: "iterate",
    pronunciation: "/ˈɪtəreɪt/",
    definition: "To repeat a process and improve it step by step.",
    partOfSpeech: "verb",
    exampleSentence: "We iterate on the feature after each round of feedback.",
    category: "Technology"
  }
];

export default function EnglishVocabularyFlashcardsDemo() {
  return <EnglishVocabularyFlashcards flashcards={sampleFlashcards} />;
}
