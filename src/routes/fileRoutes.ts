import express, { Router } from 'express';
import {
    addNewFile,
    deleteUserFile,
    getFileContent,
    getFileInfo,
    getUserFiles,
    updateUserFile
} from '../controllers/fileController';

const fileRouter: Router = express.Router();

fileRouter.route('/file/upload')
    .post(addNewFile)

fileRouter.route('/file/list')
    .get(getUserFiles)

fileRouter.route('/file/:id')
    .get(getFileInfo)

fileRouter.route('/file/download/:id')
    .get(getFileContent)

fileRouter.route('/file/update/:id')
    .put(updateUserFile)

fileRouter.route('/file/delete/:id')
    .delete(deleteUserFile)

export { fileRouter };