import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  addLims,
  deleteLimsById,
  getAllLims,
  getLimsById,
} from '../controller/lims.js';

const limsRouter = express.Router();

limsRouter.post('/lims', authenticate, addLims);
limsRouter.get('/lims', authenticate, getAllLims);
limsRouter.get('/lims/:id', authenticate, getLimsById);
limsRouter.delete('/lims/:id', authenticate, deleteLimsById);

export default limsRouter;
