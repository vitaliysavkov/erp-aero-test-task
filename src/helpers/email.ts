import { pool } from '../db/dbConnectionPool';
import {RowDataPacket} from "mysql2";
import {Query} from "mysql2";

interface Email extends RowDataPacket {
    email: string;
}

const checkIfEmailExists = async (email) => {
    const rows: Query = await pool.execute(`SELECT email FROM users WHERE email = ?`, [email]);
    console.log(rows);
}

export { checkIfEmailExists }