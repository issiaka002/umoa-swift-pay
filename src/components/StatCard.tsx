
import React, { ReactNode } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  iconColor?: string;
}

const StatCard = ({ title, value, icon, trend, className, iconColor }: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between">
        <span className="stat-label">{title}</span>
        {icon && (
          <div className={cn("p-2 rounded-md", iconColor || "bg-primary-light/10")}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="stat-value">{value}</div>
      
      {trend && (
        <div className={trend.positive ? "stat-trend-up" : "stat-trend-down"}>
          {trend.positive ? (
            <>
              <ArrowUp size={14} />
              <span className="ml-1">{trend.value} par rapport à hier</span>
            </>
          ) : (
            <>
              <ArrowDown size={14} />
              <span className="ml-1">{trend.value} par rapport à hier</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
