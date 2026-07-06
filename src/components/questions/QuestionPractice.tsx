'use client';

import React, { useEffect, useState } from 'react';
import { Question, UserResponse } from '@/types';
import { QuestionDisplay } from './QuestionDisplay';
import { GlassCard, GlassButton } from '@/components/ui';
import { Layout } from '@/components/layout';
import { PageTransition } from '@/components/animations';
import { useAuth } from '@/hooks/useAuth';
import { saveUserResponse } from '@/services/questions/userResponseService';

interface QuestionPracticeProps {
pdfId: string;
questions: Question[];
}

export const QuestionPractice: React.FC<QuestionPracticeProps> = ({
pdfId,
questions,
}) => {
const { user } = useAuth();

const [currentIndex, setCurrentIndex] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
const [showResults, setShowResults] = useState<Record<string, boolean>>({});
const [responses, setResponses] = useState<UserResponse[]>([]);
const [timeStarted, setTimeStarted] = useState<Record<string, number>>({});
const [sessionComplete, setSessionComplete] = useState(false);
const [saving, setSaving] = useState(false);

const currentQuestion = questions[currentIndex];
const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
const isAnswered = currentQuestion ? !!selectedAnswers[currentQuestion.id] : false;
const hasShownResult = currentQuestion ? !!showResults[currentQuestion.id] : false;

useEffect(() => {
if (currentQuestion) {
setTimeStarted((prev) => ({
...prev,
[currentQuestion.id]: Date.now(),
}));
}
}, [currentIndex, currentQuestion]);

const handleAnswerSelect = (optionId: string) => {
if (!currentQuestion || hasShownResult) return;

setSelectedAnswers((prev) => ({
  ...prev,
  [currentQuestion.id]: optionId,
}));

};

const handleNext = async () => {
if (!currentQuestion) return;

if (!hasShownResult) {
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  if (!selectedAnswer) {
    alert('Please select an answer before continuing.');
    return;
  }

  setSaving(true);

  try {
    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedAnswer
    );

    const isCorrect = selectedOption?.isCorrect ?? false;
    const timeSpent = Math.round(
      (Date.now() - (timeStarted[currentQuestion.id] || Date.now())) / 1000
    );

    if (user) {
      const savedResponse = await saveUserResponse(
        user.id,
        currentQuestion.id,
        selectedAnswer,
        isCorrect,
        timeSpent
      );
      setResponses((prev) => [...prev, savedResponse]);
    } else {
      setResponses((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          userId: '',
          questionId: currentQuestion.id,
          selectedAnswer,
          isCorrect,
          timestamp: new Date(),
          timeSpent,
        },
      ]);
    }

    setShowResults((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  } catch (error) {
    console.error('Failed to save response:', error);
    alert('Failed to save your answer. Please try again.');
  } finally {
    setSaving(false);
  }

  return;
}

if (currentIndex < questions.length - 1) {
  setCurrentIndex((prev) => prev + 1);
} else {
  setSessionComplete(true);
}

};

const handlePrevious = () => {
if (currentIndex === 0) return;
setCurrentIndex((prev) => prev - 1);
};

if (!currentQuestion) {
return ( <Layout> <PageTransition variant="fade"> <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <GlassCard className="p-8 text-center" variant="subtle"> <h1 className="text-3xl font-bold mb-2">No questions available</h1> <p className="text-text-secondary">
Please upload a PDF or try again later. </p> </GlassCard> </div> </PageTransition> </Layout>
);
}

if (sessionComplete) {
const totalQuestions = responses.length;
const correctCount = responses.filter((response) => response.isCorrect).length;
const wrongCount = totalQuestions - correctCount;
const accuracy = totalQuestions === 0 ? 0 : (correctCount / totalQuestions) * 100;
const totalTime = responses.reduce((sum, response) => sum + response.timeSpent, 0);
const averageTime = totalQuestions === 0 ? 0 : totalTime / totalQuestions;

return (
  <Layout>
    <PageTransition variant="fade">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <GlassCard variant="subtle" className="p-10 text-center">
          <h1 className="text-5xl font-bold mb-4">🎉 Practice Completed</h1>
          <p className="text-text-secondary mb-10">
            You have completed all questions successfully.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Total Questions</p>
              <h2 className="text-4xl font-bold mt-2">{totalQuestions}</h2>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Correct</p>
              <h2 className="text-4xl font-bold text-green-400 mt-2">{correctCount}</h2>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Wrong</p>
              <h2 className="text-4xl font-bold text-red-400 mt-2">{wrongCount}</h2>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Accuracy</p>
              <h2 className="text-4xl font-bold text-primary mt-2">
                {accuracy.toFixed(1)}%
              </h2>
            </GlassCard>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Total Time</p>
              <h2 className="text-3xl font-bold mt-2">
                {Math.floor(totalTime / 60)}m {totalTime % 60}s
              </h2>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-text-secondary">Average Time</p>
              <h2 className="text-3xl font-bold mt-2">
                {averageTime.toFixed(1)} sec
              </h2>
            </GlassCard>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => {
                setCurrentIndex(0);
                setResponses([]);
                setSelectedAnswers({});
                setShowResults({});
                setTimeStarted({});
                setSessionComplete(false);
              }}
            >
              🔄 Practice Again
            </GlassButton>

            <GlassButton
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
            >
              🏠 Dashboard
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  </Layout>
);

}

return ( <Layout> <PageTransition variant="fade"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div className="mb-8"> <div className="flex justify-between items-center mb-3"> <div> <h2 className="text-2xl font-bold">Practice Session</h2> <p className="text-text-secondary">PDF ID: {pdfId}</p> </div>

          <div className="text-right">
            <p className="text-sm text-text-secondary">Question</p>
            <p className="text-2xl font-bold">
              {currentIndex + 1} / {questions.length}
            </p>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-dark-border overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm text-text-secondary">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <QuestionDisplay
        question={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        selectedAnswer={selectedAnswers[currentQuestion.id]}
        showResult={hasShownResult}
        currentIndex={currentIndex + 1}
        totalQuestions={questions.length}
      />

      <GlassCard className="mt-8 p-6">
        <div className="flex justify-between items-center">
          <GlassButton
            variant="outline"
            disabled={currentIndex === 0 || saving}
            onClick={handlePrevious}
          >
            ← Previous
          </GlassButton>

          {saving && (
            <div className="text-primary font-medium animate-pulse">
              Saving Answer...
            </div>
          )}

          <GlassButton
            variant="primary"
            disabled={!isAnswered || saving}
            onClick={handleNext}
          >
            {!hasShownResult
              ? 'Check Answer'
              : currentIndex === questions.length - 1
              ? 'Finish Practice'
              : 'Next Question →'}
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  </PageTransition>
</Layout>

);
};

export default QuestionPractice;
