import { pool } from '../db/dbConnectionPool';
import { Query } from 'mysql2';

type User = {
    login: string
    password: string
    refreshToken: string
}

const addUser = async (user: User): Promise<Query> => {
   const { login, password, refreshToken } = user;
   const dbQuery: string = `INSERT INTO users(login, password, refreshToken)
                                VALUES(?,?,?)`;
   return pool.execute(dbQuery, [login, password, refreshToken]);
}

export { addUser }