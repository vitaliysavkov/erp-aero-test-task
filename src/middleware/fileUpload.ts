import { Request } from 'express';
import multer from 'multer';
import { uuid } from 'uuidv4';

const storageOptions: multer.StorageEngine = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ): void => {
        callback(null, './src/files');
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ): void => {
        const uid = uuid();
        callback(null, `${uid}_${file.originalname}`);
    }
})

const upload: multer.Multer = multer({ storage: storageOptions});

export { upload }