'use client';

const exams = [
  'GATE',
  'UPSC',
  'CAT',
  'NET-JRF',
  'IIT JAM',
  'SSC',
];

export default function HeroStats() {
  return (
    <div className="mt-12 flex flex-wrap gap-3">
      {exams.map((exam) => (
        <div
          key={exam}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 backdrop-blur-xl"
        >
          {exam}
        </div>
      ))}
    </div>
  );
}