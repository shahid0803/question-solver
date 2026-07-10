'use client';

import React from 'react';
import PracticeCard from './PracticeCard';

const subjects = [
  {
    title: 'Operating Systems',
    questionCount: '450',
    difficulty: 'Intermediate',
    exams: ['GATE', 'NET-JRF'],
  },
  {
    title: 'Database Management',
    questionCount: '320',
    difficulty: 'Beginner',
    exams: ['GATE', 'CAT'],
  },
  {
    title: 'Computer Networks',
    questionCount: '280',
    difficulty: 'Advanced',
    exams: ['GATE', 'UPSC'],
  },
  {
    title: 'Data Structures',
    questionCount: '510',
    difficulty: 'Mixed',
    exams: ['GATE', 'CAT', 'JAM'],
  },
  {
    title: 'Probability & Statistics',
    questionCount: '220',
    difficulty: 'Intermediate',
    exams: ['CAT', 'SSC'],
  },
  {
    title: 'General Aptitude',
    questionCount: '600',
    difficulty: 'Mixed',
    exams: ['GATE', 'SSC', 'CAT'],
  },
];

export default function SubjectGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => (
        <PracticeCard key={subject.title} {...subject} />
      ))}
    </div>
  );
}