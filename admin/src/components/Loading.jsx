import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        {/* Simple spinning loader */}
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-2 text-white">Adding Product...</p>
      </div>
    </div>
  );
};

export default Loading;