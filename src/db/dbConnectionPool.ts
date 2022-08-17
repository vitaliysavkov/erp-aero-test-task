import { createPool, Pool } from 'mysql2/promise';
import { mysqlConfig } from './dbConfig';

let pool: Pool = null;

const initDbConnection = async () => {
    try {
       pool = await createPool(mysqlConfig);
       console.log('Connected to database');
    } catch (error) {
        throw new Error('failed to initialized pool');
    }
};

export { pool, initDbConnection }