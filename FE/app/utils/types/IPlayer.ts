import { IRole } from "./IRole";

export interface IPlayer {
  id: string;
  nickname: string;
  isHost: boolean;
  role: IRole;
}
