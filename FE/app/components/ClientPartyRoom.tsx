"use client";

import socket from "@/socket";
import { useCallback, useEffect, useState } from "react";
import BaseModal from "./modals/BaseModal";
import { Input } from "./elements";
import useLocalStorage from "../hooks/useLocalStorage";
import usePlayers from "../hooks/usePlayers";

export interface Player {
  id: string;
  nickname: string;
  isHost: boolean;
}

interface ClientPartyRoomProps {
  roomCode: string;
}

const ClientPartyRoom = ({ roomCode }: ClientPartyRoomProps) => {
  const [nickname, setNickname] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [userNickname, setUserNickname] = useLocalStorage<string>(roomCode, "");
  const { data: playersList, isLoading, error } = usePlayers(roomCode);
  const joinRoom = useCallback(() => {
    socket.emit("joinRoom", { roomCode, nickname });
    console.log(`Joining room: ${roomCode} as ${nickname}`);
    setUserNickname(nickname);
  }, [roomCode, nickname]);

  useEffect(() => {
    const handlePlayerJoined = (players: Player[]) => {
      console.log("Player joined", players);
      setPlayers(players);
    };

    const handlePlayerLeft = (players: Player[]) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <h2>Players</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.nickname} {player.isHost ? "(Host)" : ""}
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default ClientPartyRoom;
