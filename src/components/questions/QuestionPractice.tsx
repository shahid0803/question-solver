'use client';

import React, { useState, useEffect } from 'react';
import { Question, UserResponse } from '@/types';
import { QuestionDisplay } from './QuestionDisplay';
import { GlassCard, GlassButton } from '@/components/ui';
import { Layout } from '@/components/layout';
import { PageTransition } from '@/components/animations';

interface QuestionPracticeProps {
  pdfId: string;
  questions: Question[];
}

export const QuestionPractice: React.FC<QuestionPracticeProps> = ({ pdfId, questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [timeStarted, setTimeStarted] = useState<Record<string, number>>({});
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setTimeStarted((prev) => ({
        ...prev,
        [questions[currentIndex].id]: Date.now(),
      }));
    }
  }, [currentIndex, questions]);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswers[currentQuestion?.id];
  const hasShownResult = showResults[currentQuestion?.id];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (!hasShownResult) {
      setShowResults((prev) => ({
        ...prev,
        [currentQuestion.id]: true,
      }));

      const selectedOption = currentQuestion.options.find(
        (opt) => opt.id === selectedAnswers[currentQuestion.id]
      );
      const isCorrect = selectedOption?.isCorrect || false;
      const timeSpent = Math.round((Date.now() - (timeStarted[currentQuestion.id] || 0)) / 1000);

      setResponses((prev) => [
        ...prev,
        {
          id: `response-${currentQuestion.id}`,
          userId: '', // Set from context
          questionId: currentQuestion.id,
          selectedAnswer: selectedAnswers[currentQuestion.id],
          isCorrect,
          timestamp: new Date(),
          timeSpent,
        },
      ]);
    } else {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSessionComplete(true);
      }
    }
  };

  if (sessionComplete) {
    const correctCount = responses.filter((r) => r.isCorrect).length;
    const accuracy = (correctCount / responses.length) * 100;
    const totalTime = responses.reduce((sum, r) => sum + r.timeSpent, 0);

    return (
      <Layout>
        <PageTransition variant="fade">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <GlassCard className="p-12 text-center" variant="subtle">
              <h1 className="text-4xl font-bold mb-4">Practice Complete! 🎉</h1>
              <p className="text-xl text-text-secondary mb-8">
                Great job! You completed all questions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div>
                  <p className="text-sm text-text-secondary mb-2">Accuracy</p>
                  <p className="text-4xl font-bold text-green-400">{accuracy.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-2">Correct Answers</p>
                  <p className="text-4xl font-bold text-blue-400">
                    {correctCount}/{responses.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-2">Total Time</p>
                  <p className="text-4xl font-bold text-purple-400">
                    {Math.round(totalTime / 60)}m
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <GlassButton variant="primary" size="lg">
                  Review Answers
                </GlassButton>
                <GlassButton variant="outline" size="lg">
                  Back to Dashboard
                </GlassButton>
              </div>
            </GlassCard>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition variant="fade">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <QuestionDisplay
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            selectedAnswer={selectedAnswers[currentQuestion.id]}
            showResult={hasShownResult}
            currentIndex={currentIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </PageTransition>
    </Layout>
  );
};
