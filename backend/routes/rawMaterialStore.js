import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addRawMaterialStore, getAllRawMaterialStore, updateRawMeterialStore } from "../controller/rawMaterialStore.js";

const rawMaterialStoreRouter = express.Router();

rawMaterialStoreRouter.get("/rawMaterialStore", authenticate, getAllRawMaterialStore);
rawMaterialStoreRouter.post("/rawMaterialStore", authenticate, addRawMaterialStore);
rawMaterialStoreRouter.put("/rawMaterialStore/:id", authenticate, updateRawMeterialStore);

export default rawMaterialStoreRouter;
