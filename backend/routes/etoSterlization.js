import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addETOSterlization, deleteETOSterlizationById, getAllETOSterlization, getETOSterlizationById } from "../controller/etoSterlization.js";

const etoSterlizationRouter = express.Router();

etoSterlizationRouter.post("/etoSterlization", authenticate, addETOSterlization);
etoSterlizationRouter.get("/etoSterlization", authenticate, getAllETOSterlization);
etoSterlizationRouter.get("/etoSterlization/:id", authenticate, getETOSterlizationById);
etoSterlizationRouter.delete("/etoSterlization/:id", authenticate, deleteETOSterlizationById);

export default etoSterlizationRouter;
