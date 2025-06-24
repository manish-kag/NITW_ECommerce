import React from "react";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 transition-opacity duration-300">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-blue-600 font-semibold tracking-wide animate-pulse">Loading...</p>
    </div>
  </div>
);

export default Loader;
