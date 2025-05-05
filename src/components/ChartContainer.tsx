
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

const ChartContainer = ({ title, children, className, actions }: ChartContainerProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {actions}
      </div>
      
      <div className="h-[300px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
