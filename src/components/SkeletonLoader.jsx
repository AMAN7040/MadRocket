import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonLoader = () => (
  <div className="overflow-auto h-[calc(100vh-70px)] rounded-md p-2">
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
