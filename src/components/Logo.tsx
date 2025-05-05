
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/placeholder.svg" 
        alt="Logo" 
        className="h-8 w-8" 
      />
      <span className="font-bold text-xl text-white">SPI-Connect</span>
    </div>
  );
};

export default Logo;
