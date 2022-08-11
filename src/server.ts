import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();

server.listen(PORT, () => console.log(`Running on port ${PORT}`));