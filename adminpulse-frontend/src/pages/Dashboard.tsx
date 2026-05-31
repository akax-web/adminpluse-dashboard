import { useEffect, useState } from 'react';
import { getActivities, getDashboardStats, getRevenueData } from '../api/userApi';
import RecentActivity from '../components/RecentActivity';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import type { Activity, DashboardStats, RevenuePoint } from '../types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [statsData, revenueData, activityData] = await Promise.all([
        getDashboardStats(),
        getRevenueData(),
        getActivities(),
      ]);
      setStats(statsData);
      setRevenue(revenueData);
      setActivities(activityData);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">Overview of your admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          change="+12% this month"
          icon="👥"
          loading={loading}
        />
        <StatCard
          title="Active Users"
          value={stats?.activeUsers ?? 0}
          change="Currently active"
          icon="✅"
          loading={loading}
        />
        <StatCard
          title="New Users"
          value={stats?.newUsers ?? 0}
          change="Last 30 days"
          icon="🆕"
          loading={loading}
        />
        <StatCard
          title="Revenue"
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
          change={`+${stats?.growth ?? 0}% growth`}
          icon="💰"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenue} loading={loading} />
        </div>
        <RecentActivity activities={activities} loading={loading} />
      </div>
    </div>
  );
}
