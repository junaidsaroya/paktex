import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addETOSterlizationStore, getAllETOSterlizationStore, updateETOSterlizationStore } from "../controller/etoSterlizationStore.js";

const etoSterlizationStoreRouter = express.Router();

etoSterlizationStoreRouter.get("/etoSterlizationStore", authenticate, getAllETOSterlizationStore);
etoSterlizationStoreRouter.post("/etoSterlizationStore", authenticate, addETOSterlizationStore);
etoSterlizationStoreRouter.patch("/etoSterlizationStore/:id", authenticate, updateETOSterlizationStore);

export default etoSterlizationStoreRouter;
