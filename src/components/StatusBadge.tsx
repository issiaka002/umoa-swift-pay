
import React from 'react';

// Define allowed status types
type StatusType = "success" | "pending" | "warning" | "error";

interface StatusBadgeProps {
  status: StatusType;
  text: string;
}

const StatusBadge = ({ status, text }: StatusBadgeProps) => {
  let classes = "py-1 px-2 rounded-full text-xs font-medium inline-block ";

  switch(status) {
    case "success":
      classes += "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      break;
    case "pending":
      classes += "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
      break;
    case "warning":
      classes += "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      break;
    case "error":
      classes += "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      break;
    default:
      classes += "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }

  return (
    <span className={classes}>
      {text}
    </span>
  );
};

export default StatusBadge;
