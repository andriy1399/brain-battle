import React from "react";
import BaseCard from "../common/BaseCard";

interface PlayerCardProps {
  imageSrc: string;
  role: string;
  roleDescription: string;
  nickname: string;
  isHighlighted?: boolean;
  isCurrentPlayer?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  imageSrc,
  role,
  roleDescription,
  nickname,
  isHighlighted,
  isCurrentPlayer,
}) => {
  return (
    <BaseCard isHighlighted={isHighlighted} isCurrentPlayer={isCurrentPlayer}>
      <div className="mr-4">
        <img
          src={imageSrc}
          alt={`${nickname}'s avatar`}
          className="w-28 h-28 rounded-lg border border-primary-300"
        />
      </div>
      <div className="flex-1 text-text-200">
        <div className="flex justify-between mb-1">
          <span className="font-bold text-lg">{role}</span>
          <span className="text-primary-200 text-lg">{nickname}</span>
        </div>
        <div className="text-sm">{roleDescription}</div>
      </div>
    </BaseCard>
  );
};

export default PlayerCard;
