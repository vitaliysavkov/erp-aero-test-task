import express, { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDbConnection } from './db/dbConnectionPool';
import { userRouter } from './routes/userRoutes';
import { fileRouter } from './routes/fileRoutes';
import { upload } from "./middleware/fileUpload";

dotenv.config();

(async () => await initDbConnection())();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors());

server.use(upload.any());

server.use(userRouter);
server.use(fileRouter);

server.listen(PORT, () => console.log(`Running on port ${PORT}`));