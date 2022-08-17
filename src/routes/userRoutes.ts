import express, { Router } from 'express';
import { signup } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.route('/signup')
    .post(signup)

export { userRouter };