"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import socket from "../socket";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 7);
    socket.emit("createRoom", code);
    router.push(`/party/${code}`);
  };

  const joinRoom = () => {
    router.push(`/party/${roomCode}`);
  };

  return (
    <div>
      <h1>Brain Battle</h1>
      <button onClick={createRoom}>Create Game</button>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Join Game</button>
    </div>
  );
}
