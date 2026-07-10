'use client';

import React from 'react';
import OptionCard from './OptionCard';

const options = [
  {
    title: 'Practice Questions',
    description: 'Turn uploaded study material into topic-wise practice sets with clear answers and explanations.',
    tag: 'Quick Start',
  },
  {
    title: 'Mock Test',
    description: 'Create a full exam-like session with timer, navigation, review mode, and instant scoring.',
    tag: 'Exam Mode',
  },
  {
    title: 'Important Points',
    description: 'Extract the key concepts from notes, books, or papers into a clean revision-friendly format.',
    tag: 'Revision',
  },
  {
    title: 'Flashcards',
    description: 'Generate short question-answer cards for fast memory-based revision before exams.',
    tag: 'Memory Boost',
  },
  {
    title: 'Revision Sheet',
    description: 'Create a compact one-page summary from your uploaded material for last-minute review.',
    tag: 'Fast Review',
  },
  {
    title: 'Topic Filter',
    description: 'Choose subjects, chapters, or difficulty levels before generating your study set.',
    tag: 'Custom Setup',
  },
];

export default function OptionGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {options.map((option) => (
        <OptionCard key={option.title} {...option} />
      ))}
    </div>
  );
}