import React from "react";
import { SkeletonLoader } from "./SkeletonLoader";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-[#383322] shadow rounded-lg p-4 w-full">
      {/* Image placeholder */}
      <SkeletonLoader className="h-40 w-full rounded-md" />

      {/* Text placeholders */}
      <div className="mt-4 space-y-2">
        <SkeletonLoader className="h-4 w-3/4 rounded" />
        <SkeletonLoader className="h-4 w-1/2 rounded" />
        <SkeletonLoader className="h-4 w-1/4 rounded mt-2" />
      </div>
    </div>
  );
};
