import { Role } from "./Role";

export interface Player {
  id: string;
  nickname: string;
  isHost: boolean;
  role: Role;
}
