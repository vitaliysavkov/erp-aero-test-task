import { ConnectionOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const mysqlConfig: ConnectionOptions = {
    host: process.env.HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || '',
    port: Number.parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
}

export { mysqlConfig }