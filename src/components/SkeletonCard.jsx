import React from "react";

const SkeletonCard = () => (
  <div className="bg-gray-100 animate-pulse rounded-md p-4 h-[400px] w-[300px]">
    <div className="h-1/3 w-3/4 bg-gray-200 rounded mb-2" />
    <div className="h-2/3 w-full bg-gray-200 rounded" />
  </div>
);

export default SkeletonCard;
