import React from "react";
import type { SkeletonLoaderProps } from "../models/components";


export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
    />
  );
};
