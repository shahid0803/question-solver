'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard, GlassButton } from '@/components/ui';
import { Layout } from '@/components/layout';
import { PageTransition } from '@/components/animations';
import { DashboardStats } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Upload, BookOpen, TrendingUp, Flame } from 'lucide-react';

interface DashboardProps {
  userId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPDFs: 0,
    totalQuestions: 0,
    questionsAttempted: 0,
    accuracy: 0,
    streak: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Placeholder - replace with actual API call
      const mockStats: DashboardStats = {
        totalPDFs: 5,
        totalQuestions: 156,
        questionsAttempted: 87,
        accuracy: 78.5,
        streak: 12,
      };
      setStats(mockStats);

      setChartData([
        { day: 'Mon', attempted: 12, correct: 10 },
        { day: 'Tue', attempted: 15, correct: 13 },
        { day: 'Wed', attempted: 18, correct: 14 },
        { day: 'Thu', attempted: 14, correct: 11 },
        { day: 'Fri', attempted: 20, correct: 18 },
        { day: 'Sat', attempted: 16, correct: 14 },
        { day: 'Sun', attempted: 10, correct: 8 },
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition variant="fade">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-text-secondary">Track your learning progress</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            <StatCard
              icon={Upload}
              label="PDFs Uploaded"
              value={stats.totalPDFs}
              color="text-blue-400"
            />
            <StatCard
              icon={BookOpen}
              label="Total Questions"
              value={stats.totalQuestions}
              color="text-purple-400"
            />
            <StatCard
              icon={TrendingUp}
              label="Attempted"
              value={stats.questionsAttempted}
              color="text-teal-400"
            />
            <StatCard
              icon={TrendingUp}
              label="Accuracy"
              value={`${stats.accuracy.toFixed(1)}%`}
              color="text-green-400"
            />
            <StatCard
              icon={Flame}
              label="Day Streak"
              value={stats.streak}
              color="text-orange-400"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Activity Chart */}
            <GlassCard className="lg:col-span-2 p-6" variant="subtle">
              <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                  <XAxis dataKey="day" stroke="rgba(229, 231, 235, 0.5)" />
                  <YAxis stroke="rgba(229, 231, 235, 0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 30, 0.8)', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="attempted" fill="#0ea5e9" />
                  <Bar dataKey="correct" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Accuracy Pie */}
            <GlassCard className="p-6" variant="subtle">
              <h2 className="text-xl font-semibold mb-4">Accuracy</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Correct', value: stats.accuracy },
                      { name: 'Incorrect', value: 100 - stats.accuracy },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="p-6 text-center" variant="subtle">
              <h3 className="text-lg font-semibold mb-4">Upload New PDF</h3>
              <GlassButton variant="primary" size="sm" className="w-full">Upload</GlassButton>
            </GlassCard>
            <GlassCard className="p-6 text-center" variant="subtle">
              <h3 className="text-lg font-semibold mb-4">Practice Questions</h3>
              <GlassButton variant="primary" size="sm" className="w-full">Start Practice</GlassButton>
            </GlassCard>
            <GlassCard className="p-6 text-center" variant="subtle">
              <h3 className="text-lg font-semibold mb-4">View Analytics</h3>
              <GlassButton variant="primary" size="sm" className="w-full">Analytics</GlassButton>
            </GlassCard>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => (
  <GlassCard className="p-4" variant="subtle">
    <div className="flex items-center mb-2">
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </GlassCard>
);
