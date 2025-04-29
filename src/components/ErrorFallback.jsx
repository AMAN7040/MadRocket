import React from "react";

const ErrorFallback = ({ error, onReset }) => {
  return (
    <div className="h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-red-100 p-4 text-center rounded-md">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="mt-2 text-red-500">
        {error?.message || "Unexpected error occurred."}
      </p>
      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorFallback;
