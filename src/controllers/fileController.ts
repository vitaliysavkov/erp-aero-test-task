import {
    addFile,
    getFile,
    getFiles,
    getFileLink,
    File,
    QueryParams, updateFile, deleteFile
} from '../services/fileService';
import * as fs from 'fs';

const addNewFile = async (req, res) => {
    try {
        const fileInfo = {
            name: req.files[0].originalname.split('.')[0],
            ext: req.files[0].originalname.split('.')[1],
            mime_type: req.files[0].mimetype,
            size: req.files[0].size,
            link: `${req.files[0].destination}/${req.files[0].filename}`
        }
        const file: File = {
            user: req.query.user,
            ...fileInfo
        }
        const newFile = await addFile(file);
        res.status(201).json(newFile);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const getFileInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const fileInfo: File = await getFile(id);
        res.status(200).json(fileInfo);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const getUserFiles = async (req, res) => {
    try {
        const { userId, listSize = 10, page = 1 }: QueryParams = req.query;
        const fileList: File[] = await getFiles({ userId, listSize, page});
        res.status(200).json(fileList);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const getFileContent = async (req, res) => {
    try {
        const fileId: number = req.params.id;
        const fileUrl: string = await getFileLink(fileId);
        const readStream = fs.createReadStream(fileUrl);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const updateUserFile = async (req, res) => {
    try {
        const { id } = req.params;
        const fileInfo = {
            id,
            name: req.files[0].originalname.split('.')[0],
            ext: req.files[0].originalname.split('.')[1],
            mime_type: req.files[0].mimetype,
            size: req.files[0].size,
            link: `${req.files[0].destination}/${req.files[0].filename}`
        }
        const file: File = {
            user: req.query.user,
            ...fileInfo
        }
        const link: string = await getFileLink(id);
        const result = await updateFile(file);
        fs.unlinkSync(link);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

const deleteUserFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        const link: string = await getFileLink(id);
        const result = await deleteFile(id, userId);
        fs.unlinkSync(link);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

export {
    addNewFile,
    getFileInfo,
    getFileContent,
    getUserFiles,
    updateUserFile,
    deleteUserFile
}