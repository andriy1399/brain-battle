import { useQuery } from "@tanstack/react-query";
import axios from "../api/axiosConfig";
import { IPlayer } from "../utils/types/IPlayer";

const fetchPlayers = async (roomCode: string) => {
  const { data } = await axios.get<IPlayer[]>(`/rooms/${roomCode}/players`);
  return data;
};

const usePlayers = (roomCode: string) => {
  return useQuery({
    queryKey: ["players", roomCode],
    queryFn: () => fetchPlayers(roomCode),
  });
};

export default usePlayers;
