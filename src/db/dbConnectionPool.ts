import { createPool, Pool } from 'mysql2';
import { mysqlConfig } from './dbConfig';

let pool: Pool = null;

const initDbConnection = () => {
    try {
       pool = createPool(mysqlConfig);
       console.log('Connected to database');
    } catch (error) {
        throw new Error('failed to initialized pool');
    }
};

export { pool, initDbConnection }