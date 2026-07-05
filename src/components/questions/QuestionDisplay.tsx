'use client';

import React, { useState } from 'react';
import { Question, QuestionOption } from '@/types';
import { GlassCard, GlassButton } from '@/components/ui';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  onAnswerSelect: (optionId: string) => void;
  onNext: () => void;
  selectedAnswer?: string;
  showResult?: boolean;
  currentIndex?: number;
  totalQuestions?: number;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  onAnswerSelect,
  onNext,
  selectedAnswer,
  showResult = false,
  currentIndex = 1,
  totalQuestions = 1,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">
            Question {currentIndex} of {totalQuestions}
          </span>
          <span className={`text-sm font-semibold ${
            question.difficulty === 'easy'
              ? 'text-green-400'
              : question.difficulty === 'medium'
              ? 'text-yellow-400'
              : 'text-red-400'
          }`}>
            {question.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="w-full bg-gray-700/30 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <GlassCard className="p-8 mb-8" variant="subtle">
        {/* Category & Subject */}
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            {question.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            {question.subject}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-2xl font-bold mb-8 leading-relaxed">{question.text}</h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.isCorrect;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => !showResult && onAnswerSelect(option.id)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : showWrong
                    ? 'border-red-500 bg-red-500/10'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500/10'
                    : hoveredOption === option.id && !showResult
                    ? 'border-gray-500 bg-gray-500/5'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : showWrong
                    ? 'border-red-500 bg-red-500/20'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option.text}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Explanation */}
      {showResult && question.explanation && (
        <GlassCard className="p-6 mb-8 border-l-4 border-yellow-500" variant="subtle">
          <h3 className="font-semibold mb-2 text-yellow-300">Explanation</h3>
          <p className="text-text-secondary">{question.explanation}</p>
        </GlassCard>
      )}

      {/* Action Button */}
      <div className="flex justify-between items-center">
        <div />
        <GlassButton
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!selectedAnswer && !showResult}
        >
          {showResult ? 'Next Question' : 'Submit Answer'}
        </GlassButton>
      </div>
    </div>
  );
};
