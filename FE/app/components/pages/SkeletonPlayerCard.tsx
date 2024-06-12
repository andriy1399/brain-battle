import React from "react";
import BaseCard from "../common/BaseCard";

const SkeletonPlayerCard: React.FC = () => {
  return (
    <BaseCard>
      <div className="mr-4 animate-pulse">
        <div className="w-28 h-28 rounded-lg bg-gray-400 "></div>
      </div>
      <div className="flex-1 text-text-200 animate-pulse">
        <div className="flex justify-between mb-4">
          <div className="h-6 bg-gray-400 rounded w-1/3"></div>
          <div className="h-6 bg-gray-400 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-400 rounded w-3/3"></div>
        <div className="h-4 bg-gray-400 rounded w-2/3 mt-2"></div>
      </div>
    </BaseCard>
  );
};

export default SkeletonPlayerCard;
