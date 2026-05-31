interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  loading?: boolean;
}

export default function StatCard({ title, value, change, icon, loading }: StatCardProps) {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-dark-700 rounded w-1/2" />
          <div className="h-8 bg-dark-700 rounded w-2/3" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">{title}</p>
              <p className="text-2xl font-bold text-white mt-1">{value}</p>
              {change && (
                <p className="text-xs text-emerald-400 mt-2">{change}</p>
              )}
            </div>
            <span className="text-2xl bg-dark-700 w-12 h-12 flex items-center justify-center rounded-lg">
              {icon}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
