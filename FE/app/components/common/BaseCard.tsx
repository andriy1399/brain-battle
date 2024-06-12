import React from "react";
import clsx from "clsx";

interface BaseCardProps {
  children: React.ReactNode;
  isHighlighted?: boolean;
  isCurrentPlayer?: boolean;
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  isHighlighted,
  isCurrentPlayer,
}) => {
  return (
    <div
      className={clsx(
        "relative flex items-center p-4 rounded-lg bg-bg-200 border",
        {
          "border-primary-200": isCurrentPlayer,
          "border-bg-300": !isCurrentPlayer,
        }
      )}
    >
      {isHighlighted && (
        <span className="text-accent text-xl absolute top-[-15px] left-[-10px]">
          ★
        </span>
      )}
      {children}
    </div>
  );
};

export default BaseCard;
