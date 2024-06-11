import { Router } from 'express';
import { getPlayersByRoomCode } from '../controllers/roomController';

const router = Router();

router.get('/rooms/:roomCode/players', getPlayersByRoomCode);

export default router;
