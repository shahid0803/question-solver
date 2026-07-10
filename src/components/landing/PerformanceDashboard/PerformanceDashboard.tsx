'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import TopicBars from './TopicBars';
import InsightCard from './InsightCard';

const metrics = [
  { label: 'Accuracy', value: '87%', trend: '+6%' },
  { label: 'Average Speed', value: '42 sec', trend: '-8 sec' },
  { label: 'Attempt Rate', value: '96%', trend: '+4%' },
  { label: 'Negative Marks', value: '-3', trend: 'Improving' },
];

const topics = [
  { label: 'Data Structures', score: 92, tone: 'good' as const },
  { label: 'Operating Systems', score: 81, tone: 'good' as const },
  { label: 'Database Systems', score: 74, tone: 'medium' as const },
  { label: 'Computer Networks', score: 66, tone: 'weak' as const },
  { label: 'Dynamic Programming', score: 58, tone: 'weak' as const },
];

const insights = [
  {
    title: 'Strong Topics',
    description: 'You are performing consistently well in structures, systems, and core conceptual questions.',
    tag: 'Keep Going',
  },
  {
    title: 'Weak Areas',
    description: 'Focus more on networking, dynamic programming, and time-sensitive problem solving.',
    tag: 'Priority',
  },
  {
    title: 'Next Best Step',
    description: 'Switch to targeted revision sets and exam mode practice to improve speed and accuracy together.',
    tag: 'Recommended',
  },
];

export default function PerformanceDashboard() {
  return (
    <section id="performance-dashboard" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
                Performance Insights
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Understand strengths, weak areas, and next actions.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                After every practice session, the dashboard highlights your accuracy, topic-wise progress,
                and the most useful revision path.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
              <p className="font-medium text-white">Insight Summary</p>
              <p className="mt-2 max-w-sm leading-6 text-white/55">
                Turn performance data into a focused revision plan without losing time.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}

              <div className="sm:col-span-2 rounded-[2rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                      Topic Breakdown
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      Score distribution by subject area
                    </h3>
                  </div>
                </div>

                <TopicBars topics={topics} />
              </div>
            </div>

            <div className="grid gap-5">
              {insights.map((insight) => (
                <InsightCard key={insight.title} {...insight} />
              ))}

              <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/75">
                  Recommended Path
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Practice more on weak concepts, then retake exam mode.
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  The platform adapts to your progress and keeps the next step clear.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}