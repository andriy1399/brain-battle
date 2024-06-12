import React from "react";
import BaseCard from "../common/BaseCard";

const EmptyPlayerCard = () => {
  return (
    <BaseCard isHighlighted={false} isCurrentPlayer={false}>
      <img
        src={"/images/default-role.webp"}
        alt={`default avatar`}
        className="w-28 h-28 rounded-lg border border-primary-300 mr-4"
      />
      <p className="text-lg text-center">Invite a friend to join the fun!</p>
    </BaseCard>
  );
};

export default EmptyPlayerCard;
