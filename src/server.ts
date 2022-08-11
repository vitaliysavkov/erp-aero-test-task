import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDbConnection } from './db/dbConnectionPool';

dotenv.config();

initDbConnection();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors());

server.listen(PORT, () => console.log(`Running on port ${PORT}`));