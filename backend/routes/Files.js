import express from 'express';
import {uploadHandler} from '../controller/Files.js';
import authenticate from '../middleware/authenticate.js';

const fileRouter = express.Router();

fileRouter.post('/qms', authenticate, uploadHandler);

export default fileRouter;
