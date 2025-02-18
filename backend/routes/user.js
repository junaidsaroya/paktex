import express from 'express';
import { signUp, signIn, getUserProfile, updatePassword, getAllUsers, createUser } from '../controller/user.js';
import authenticate from '../middleware/authenticate.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/createUser', createUser);
authRouter.post('/signin', signIn);
authRouter.get('/profile', authenticate, getUserProfile);
authRouter.put('/updatePassword', authenticate, updatePassword);
authRouter.get('/getAllUsers', authenticate, getAllUsers);

export default authRouter;