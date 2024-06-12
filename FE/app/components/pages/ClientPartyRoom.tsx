"use client";

import socket from "@/socket";
import { useCallback, useEffect, useState } from "react";
import BaseModal from "../modals/BaseModal";
import { Button, Input } from "../elements";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePlayers from "../../hooks/usePlayers";
import PlayerCard from "./PlayerCard";
import { IPlayer } from "@/app/utils/types/IPlayer";
import EmptyPlayerCard from "./EmptyPlayerCard";
import SkeletonPlayerCard from "./SkeletonPlayerCard";

interface ClientPartyRoomProps {
  roomCode: string;
}

const ClientPartyRoom = ({ roomCode }: ClientPartyRoomProps) => {
  const [nickname, setNickname] = useState<string>("");
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [userNickname, setUserNickname] = useLocalStorage<string>(roomCode, "");
  const { data: playersList, isLoading, error } = usePlayers(roomCode);
  const joinRoom = useCallback(() => {
    socket.emit("joinRoom", { roomCode, nickname });
    console.log(`Joining room: ${roomCode} as ${nickname}`);
    setUserNickname(nickname);
  }, [roomCode, nickname]);

  useEffect(() => {
    const handlePlayerJoined = (players: IPlayer[]) => {
      console.log("Player joined", players);
      setPlayers(players);
    };

    const handlePlayerLeft = (players: IPlayer[]) => {
      console.log("Player left", players);
      setPlayers(players);
    };

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);

    return () => {
      console.log("Cleaning up socket event listeners");
      socket.emit("leaveRoom", { roomCode });
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
    };
  }, []);

  useEffect(() => {
    setNickname(userNickname);
    return () => {
      console.log("cleanup");
      socket.emit("leaveRoom", { roomCode });
    };
  }, []);

  useEffect(() => {
    console.log(playersList);
    if (playersList) {
      setPlayers(playersList);
    }
  }, [playersList]);

  const handleShareLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy the URL: ", err);
      });
  };

  if (isLoading) {
    return (
      <div className="max-w-[880px] mx-auto mt-12">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {new Array(8).fill(null).map((_, index) => (
            <SkeletonPlayerCard key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="max-w-[880px] mx-auto mt-12">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <>
            {players.map((player, index) => (
              <PlayerCard
                key={index}
                imageSrc={`/images/roles/${player.role.categoryId}.webp`}
                role={player.role.role}
                roleDescription={player.role.roleDescription}
                nickname={player.nickname}
                isHighlighted={player.isHost}
                isCurrentPlayer={player.nickname === userNickname}
              />
            ))}
            {new Array(8 - players.length).fill(null).map((_, index) => (
              <EmptyPlayerCard key={index} />
            ))}
          </>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Button>Start Game</Button>
          <Button variant="secondary" onClick={handleShareLink}>
            Share Game Link
          </Button>
        </div>
      </div>

      <BaseModal
        isOpen={isModalOpened}
        onSubmit={joinRoom}
        canClose={false}
        onClose={() => setIsModalOpened((prev) => !prev)}
        submitBtnText={players.length ? "Join Room" : "Create Room"}
      >
        <h3 className="text-center mb-6">
          {players.length ? "Join Room" : "Create Room"}
        </h3>
        <Input
          type="text"
          placeholder="Enter your nickname"
          className="w-full mb-3"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </BaseModal>
    </>
  );
};

export default ClientPartyRoom;
