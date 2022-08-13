import { pool } from '../db/dbConnectionPool';
import { Query } from 'mysql2';

type File = {
    id?:number
    user: number
    name: string
    ext: string
    size: bigint
    content: Buffer
}

type QueryParams = {
    listSize: number
    page: number
}

const addFile = async (file: File): Promise<Query> => {
    const { user, name, ext, size, content } = file;
    const dbQuery: string = `INSERT INTO files(user, name, ext, size, content)
                                VALUES(?,?,?,?,?)`;
    return pool.execute(dbQuery, [user, name, ext, size, content]);
}

const getFiles = async (userId: number, queryParams: QueryParams ): Promise<Query> => {
    const { page, listSize } = queryParams;
    const offset: number = (page - 1) * listSize;
    const dbQuery: string = `SELECT id, user, name, ext, mime_type, size, upload_date
                             FROM files 
                             WHERE user = ? 
                             LIMIT ${listSize} OFFSET ${offset}`;
    return pool.execute(dbQuery, [userId]);
}

const getFile = async (id: number): Promise<Query> => {
    const dbQuery: string = `SELECT user, name, ext, mime_type, size, upload_date
                             FROM files 
                             WHERE id = ?`;
    return pool.execute(dbQuery, [id]);
}

const downloadFile = async (id: number): Promise<Query> => {
    const dbQuery: string = `SELECT content
                             FROM files 
                             WHERE id = ?`;
    return pool.execute(dbQuery, [id]);
}

const updateFile = async (file: File): Promise<Query> => {
    const { id } = file;
    const dbQuery = `UPDATE file Set ? WHERE id = ?`;
    return pool.execute(dbQuery, [id]);
}

const deleteFile = async (id: number): Promise<Query> => {
    const dbQuery: string = `DELETE FROM files WHERE id = ?`;
    return pool.execute(dbQuery, [id]);
}


export { addFile }