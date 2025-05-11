import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addMicrobiologicalData, getAllMicrobiologicalData, getMicrobiologicalDataById, updateMicrobiologicalData } from "../controller/microbiological.js";

const microbiologicalRouter = express.Router();

microbiologicalRouter.post("/microbiological", authenticate, addMicrobiologicalData);
microbiologicalRouter.get("/microbiological", authenticate, getAllMicrobiologicalData);
microbiologicalRouter.get("/microbiological/:id", authenticate, getMicrobiologicalDataById);
microbiologicalRouter.put('/microbiological/:id', authenticate, updateMicrobiologicalData);

export default microbiologicalRouter;

