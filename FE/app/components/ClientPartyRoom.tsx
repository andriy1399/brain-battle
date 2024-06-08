"use client";

import socket from "@/socket";
import { useEffect, useState } from "react";

interface Player {
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
  const [hasJoined, setHasJoined] = useState<boolean>(false);

  useEffect(() => {
    if (hasJoined) {
      console.log(`Joining room: ${roomCode} as ${nickname}`);
      socket.emit("joinRoom", { roomCode, nickname });

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

      // Cleanup function
      return () => {
        console.log("Cleaning up socket event listeners");
        socket.emit("leaveRoom", { roomCode });
        socket.off("playerJoined", handlePlayerJoined);
        socket.off("playerLeft", handlePlayerLeft);
      };
    }
  }, [hasJoined]);

  const joinRoom = () => {
    setHasJoined(true);
  };

  return (
    <div>
      {!hasJoined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ClientPartyRoom;