import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addInProcessQC, deleteInProcessQCById, getAllInProcessQC, getInProcessQCById } from "../controller/InProcessQC.js";

const inProcessQCRouter = express.Router();

inProcessQCRouter.post("/inProcessQC", authenticate, addInProcessQC);
inProcessQCRouter.get("/inProcessQC", authenticate, getAllInProcessQC);
inProcessQCRouter.get("/inProcessQC/:id", authenticate, getInProcessQCById);
inProcessQCRouter.delete("/inProcessQC/:id", authenticate, deleteInProcessQCById);

export default inProcessQCRouter;
