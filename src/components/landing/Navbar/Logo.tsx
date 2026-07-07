'use client';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">Q</span>
      </div>

      <div>
        <h1 className="text-white font-bold text-lg">
          Question Solver
        </h1>

        <p className="text-xs text-gray-400">
          AI Powered Learning
        </p>
      </div>
    </div>
  );
}