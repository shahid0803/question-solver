'use client';

import React from 'react';

interface QuestionNavigatorProps {
  totalQuestions?: number;
  currentQuestion?: number;
  markedQuestions?: number[];
}

export default function QuestionNavigator({
  totalQuestions = 20,
  currentQuestion = 12,
  markedQuestions = [3, 7, 15],
}: QuestionNavigatorProps) {
  const questions = Array.from({ length: totalQuestions }, (_, index) => index + 1);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Question Navigator</p>
        <p className="mt-2 text-sm text-white/50">
          Jump between questions quickly during the exam.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {questions.map((question) => {
          const isCurrent = question === currentQuestion;
          const isMarked = markedQuestions.includes(question);

          return (
            <button
              key={question}
              className={[
                'relative flex h-11 items-center justify-center rounded-2xl border text-sm font-semibold transition duration-200',
                isCurrent
                  ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.18)]'
                  : 'border-white/10 bg-black/20 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {question}
              {isMarked && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}