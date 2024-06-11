"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/socket";
import { Button, Input } from "./components/elements";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 7);
    socket.emit("createRoom", code);
    router.push(`/party/${code}`);
  };

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/party/${roomCode}`);
  };

  return (
    <div className="container">
      <h3 className="text-center mt-24">
        Test your knowledge and challenge friends in an exciting multiplayer
        quiz game!
      </h3>
      <div className="max-w-96 flex flex-col gap-4 mt-24 mx-auto">
        <Button onClick={createRoom}>Create Game</Button>
        <h5 className="text-center">OR</h5>
        <form onSubmit={joinRoom} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <Button variant="secondary" type="submit">
            Join Game
          </Button>
        </form>
      </div>
    </div>
  );
}
