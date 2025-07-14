import React from 'react';

const WaveLoader = () => {
  return (
    <div className="flex items-center justify-center w-28 h-11 bg-primary rounded-full shadow-xl">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce-up" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce-up" style={{animationDelay: '100ms'}}></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce-up" style={{animationDelay: '200ms'}}></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce-up" style={{animationDelay: '300ms'}}></div>
      </div>
    </div>
  );
};

export default WaveLoader;
