
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatusCard = ({ title, value, icon, trend, className }: StatusCardProps) => {
  return (
    <div className={cn("pos-stat-card", className)}>
      <div className="flex-grow">
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium flex items-center",
                trend.isPositive ? "text-pos-green" : "text-pos-red"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-400 ml-1">vs. last period</span>
          </div>
        )}
      </div>
      
      <div className="p-3 rounded-full bg-blue-50 text-pos-blue">
        {icon}
      </div>
    </div>
  );
};

export default StatusCard;
