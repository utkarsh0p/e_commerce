import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-oxford">
      <div className="flex flex-col items-center gap-5">
        {/* Modern spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-tan" />
          <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
        </div>

        {/* Loading text */}
        <p className="text-white text-sm opacity-80 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
