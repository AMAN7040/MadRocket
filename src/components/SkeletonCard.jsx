import React from "react";

const SkeletonCard = () => (
  <div className="bg-gray-100 animate-pulse rounded-md p-4 h-[150px]">
    <div className="h-7 w-3/4 bg-gray-200 rounded mb-2" />
    <div className="h-5 w-1/2 bg-gray-200 rounded" />
  </div>
);

export default SkeletonCard;
