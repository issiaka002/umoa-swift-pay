
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'pending' | 'error';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  className?: string;
}

const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
  const statusStyles = {
    success: 'bg-success/20 text-success',
    pending: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
  };

  return (
    <span className={cn(
      'rounded-full px-2 py-0.5 text-xs font-medium inline-block',
      statusStyles[status],
      className
    )}>
      {text}
    </span>
  );
};

export default StatusBadge;
