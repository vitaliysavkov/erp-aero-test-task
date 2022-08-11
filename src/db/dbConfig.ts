import { ConnectionOptions } from 'mysql2';

const mysqlConfig: ConnectionOptions = {
    host: process.env.HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
}

export { mysqlConfig }