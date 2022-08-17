import { pool } from '../db/dbConnectionPool';

type User = {
    login: string
    password: string
    refreshToken?: string
}

const addUser = async (user: User): Promise<number> => {
   const { login, password } = user;
   const dbQuery: string = `INSERT INTO users(login, password)
                                VALUES(?,?)`;
   const result = await pool.query(dbQuery, [login, password]);
   return result.values().next().value.insertId;
}

export { addUser, User }