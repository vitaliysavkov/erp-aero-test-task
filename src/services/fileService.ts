import { pool } from '../db/dbConnectionPool';
import * as fs from "fs";

type File = {
    id?:number
    user: number
    name: string
    ext: string
    size: number
    mime_type: string
    link: string
}

type QueryParams = {
    userId: number
    listSize: number
    page: number
}

const addFile = async (file: File): Promise<void> => {
    const { user, name, ext, size, mime_type, link } = file;
    const dbQuery: string = `INSERT INTO files(user, name, ext, size, mime_type, link)
                                VALUES(?,?,?,?,?,?)`;
    await pool.query(dbQuery, [user, name, ext, size, mime_type, link]);
}

const getFiles = async (queryParams: QueryParams): Promise<File[]> => {
    const { userId, page, listSize } = queryParams;
    const offset: number = (page - 1) * listSize;
    const dbQuery: string = `SELECT id, user, name, ext, mime_type, size, upload_date
                             FROM files 
                             WHERE user = ? 
                             LIMIT ${listSize} OFFSET ${offset}`;
    const result = await pool.query(dbQuery, [userId]);
    return result.values().next().value;
}

const getFile = async (id: number): Promise<File> => {
    const dbQuery: string = `SELECT user, name, ext, mime_type, size, upload_date, link
                             FROM files 
                             WHERE id = ?`;
    const result = await pool.query(dbQuery, [id]);
    return result.values().next().value[0];
}

const getFileLink = async (id: number): Promise<string> => {
    const dbQuery: string = `SELECT link
                             FROM files 
                             WHERE id = ?`;
    const result = await pool.query(dbQuery, [id]);
    return result.values().next().value[0].link;
}

const updateFile = async (file: File): Promise<number> => {
    const { id, user } = file;
    delete file.id;
    const dbQuery = `UPDATE files SET ? WHERE id = ? AND user = ?`;
    const result = await pool.query(dbQuery, [file, id, user]);
    return result.values().next().value.insertId;
}

const deleteFile = async (id: number, user: number): Promise<number> => {
    const dbQuery: string = `DELETE FROM files WHERE id = ? AND user = ?`;
    const result = await pool.query(dbQuery, [id, user]);
    return result.values().next().value.insertId;
}


export {
    addFile,
    getFile,
    getFiles,
    getFileLink,
    updateFile,
    deleteFile,
    File,
    QueryParams
}