import { useEffect, useState } from 'react';
import { getDashboardStats, getRevenueData } from '../api/userApi';
import RevenueChart from '../components/charts/RevenueChart';
import StatCard from '../components/StatCard';
import type { DashboardStats, RevenuePoint } from '../types';

export default function Analytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [s, r] = await Promise.all([getDashboardStats(), getRevenueData()]);
      setStats(s);
      setRevenue(r);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-slate-400 text-sm mt-1">Track growth and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="User Growth"
          value={`${stats?.growth ?? 0}%`}
          icon="📈"
          loading={loading}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
          icon="💵"
          loading={loading}
        />
        <StatCard
          title="Active Rate"
          value={
            stats && stats.totalUsers > 0
              ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`
              : '0%'
          }
          icon="📊"
          loading={loading}
        />
      </div>

      <RevenueChart data={revenue} loading={loading} />

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-2">Insights</h3>
        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
          <li>Revenue increased steadily over the last 6 months.</li>
          <li>Most users are in Active status — good engagement.</li>
          <li>Consider promoting Editor role for content teams.</li>
        </ul>
      </div>
    </div>
  );
}
