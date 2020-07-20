import express from 'express';

import { UserController } from '../controllers/user';

export const usersRouter = express.Router();

usersRouter.post('/signup', UserController.singUp);

usersRouter.post('/login', UserController.logIn);

usersRouter.post('/refresh-token', UserController.refreshToken);