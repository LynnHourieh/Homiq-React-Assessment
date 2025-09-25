import React from "react";
import { SkeletonLoader } from "./SkeletonLoader";

export const CategorySkeleton: React.FC = () => {
  return (
    <SkeletonLoader className="h-9 w-20 rounded-lg" />
  );
};
