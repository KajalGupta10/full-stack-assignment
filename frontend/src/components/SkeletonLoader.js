// src/components/SkeletonLoader.js
export const SkeletonLoader = () => (
  <div className="animate-pulse p-4 space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);