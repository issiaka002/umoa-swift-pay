
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = [];
  
  // Always show first page
  pages.push(1);
  
  // Calculate range of pages to show
  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
  
  // Add ellipsis after first page if needed
  if (rangeStart > 2) {
    pages.push('...');
  }
  
  // Add pages in range
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }
  
  // Add ellipsis before last page if needed
  if (rangeEnd < totalPages - 1) {
    pages.push('...');
  }
  
  // Add last page if there are more than one page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm",
              currentPage === page ? "bg-primary text-white" : "hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-1">
            {page}
          </span>
        )
      ))}
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
