
import React from 'react';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div 
      className={`flex items-center justify-center rounded-full bg-blue-600 text-white font-medium ${sizeClasses[size]} ${className}`}
    >
      {name}
    </div>
  );
};

export default UserAvatar;
