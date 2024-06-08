import ClientPartyRoom from "@/app/components/ClientPartyRoom";

interface PartyRoomProps {
  params: { roomCode: string };
}

const PartyRoom = async ({ params }: PartyRoomProps) => {
  const { roomCode } = params;

  // Fetch initial data if needed
  // Example:
  // const data = await fetch(`https://api.example.com/rooms/${roomCode}`).then(res => res.json());

  return (
    <div>
      <h1>Room Code: {roomCode}</h1>
      <ClientPartyRoom roomCode={roomCode} />
    </div>
  );
};

export default PartyRoom;
