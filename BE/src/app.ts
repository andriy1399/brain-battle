import express from 'express';
import cors from 'cors';
import roomRoutes from './routes/roomRoutes';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use('/api', roomRoutes);

export default app;
