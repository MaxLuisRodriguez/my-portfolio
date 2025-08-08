import React from 'react';

interface StatBarsProps {
  stats?: Array<{ label: string; value: number; color?: string }>;
  className?: string;
}

const defaultStats: StatBarsProps['stats'] = [
  { label: 'Focus', value: 92, color: 'from-brand.primary to-emerald-400' },
  { label: 'Endurance', value: 88, color: 'from-brand.secondary to-sky-400' },
  { label: 'Recovery', value: 75, color: 'from-brand.accent to-amber-300' },
];

const StatBars: React.FC<StatBarsProps> = ({ stats = defaultStats, className = '' }) => {
  return (
    <div className={`grid gap-4 ${className}`}>
      {stats.map(({ label, value, color }, idx) => (
        <div key={idx} className="">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-white/80">{label}</span>
            <span className="text-xs font-semibold text-white/70">{value}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/10">
            <div
              className={`h-2.5 rounded-full bg-gradient-to-r ${color ?? 'from-brand.primary to-brand.secondary'} shadow-card`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatBars;


