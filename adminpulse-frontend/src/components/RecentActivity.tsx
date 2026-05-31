import type { Activity } from '../types';

interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
}

export default function RecentActivity({ activities, loading }: RecentActivityProps) {
  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return 'Just now';
    }
  };

  const typeColor: Record<string, string> = {
    auth: 'bg-blue-500/20 text-blue-400',
    user: 'bg-emerald-500/20 text-emerald-400',
    report: 'bg-amber-500/20 text-amber-400',
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-dark-700 rounded animate-pulse" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-slate-500 text-sm">No recent activity.</p>
      ) : (
        <ul className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-700/50 transition-colors"
            >
              <span
                className={`text-xs px-2 py-1 rounded capitalize shrink-0 ${
                  typeColor[activity.type] || 'bg-slate-500/20 text-slate-400'
                }`}
              >
                {activity.type}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-200">{activity.description}</p>
                <p className="text-xs text-slate-500 mt-1">{formatTime(activity.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
