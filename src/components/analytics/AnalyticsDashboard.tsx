'use client';

import React, { useEffect, useState } from 'react';
import { UserAnalytics } from '@/types';
import { analyticsService } from '@/services/analytics/analyticsService';
import { GlassCard } from '@/components/ui';
import { Layout } from '@/components/layout';
import { PageTransition } from '@/components/animations';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, BookOpen, Target, Clock } from 'lucide-react';

interface AnalyticsDashboardProps {
  userId: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId }) => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [userId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getUserAnalytics(userId);
      setAnalytics(data);

      const trend = await analyticsService.getAccuracyTrend(userId, 30);
      setTrendData(trend);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">Loading analytics...</p>
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">No analytics data available</p>
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
            <h1 className="text-4xl font-bold mb-2">Your Analytics</h1>
            <p className="text-text-secondary">Track your performance over time</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <MetricCard
              icon={BookOpen}
              label="Total Attempted"
              value={analytics.totalQuestionsAttempted}
              color="text-blue-400"
            />
            <MetricCard
              icon={Target}
              label="Correct Answers"
              value={analytics.correctAnswers}
              color="text-green-400"
            />
            <MetricCard
              icon={TrendingUp}
              label="Accuracy"
              value={`${analytics.accuracy.toFixed(1)}%`}
              color="text-purple-400"
            />
            <MetricCard
              icon={Clock}
              label="Avg Time/Question"
              value={`${Math.round(analytics.averageTimePerQuestion)}s`}
              color="text-orange-400"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Trend Chart */}
            <GlassCard className="p-6" variant="subtle">
              <h2 className="text-xl font-semibold mb-4">Accuracy Trend (30 days)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                  <XAxis dataKey="date" stroke="rgba(229, 231, 235, 0.5)" />
                  <YAxis stroke="rgba(229, 231, 235, 0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 30, 0.8)', border: 'none' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Category Performance */}
            <GlassCard className="p-6" variant="subtle">
              <h2 className="text-xl font-semibold mb-4">Category Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                  <XAxis dataKey="category" stroke="rgba(229, 231, 235, 0.5)" />
                  <YAxis stroke="rgba(229, 231, 235, 0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 15, 30, 0.8)', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>

          {/* Recent Activity */}
          <GlassCard className="p-6" variant="subtle">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-text-secondary">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </PageTransition>
    </Layout>
  );
};

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, color }) => (
  <GlassCard className="p-4" variant="subtle">
    <Icon className={`w-5 h-5 ${color} mb-2`} />
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </GlassCard>
);
