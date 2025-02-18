import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addPackingMaterialStore, getAllPackingMaterialStore, updatePackingMeterialStore } from "../controller/packingMaterialStore.js";

const packingMaterialStoreRouter = express.Router();

packingMaterialStoreRouter.get("/packingMaterialStore", authenticate, getAllPackingMaterialStore);
packingMaterialStoreRouter.post("/packingMaterialStore", authenticate, addPackingMaterialStore);
packingMaterialStoreRouter.patch("/packingMaterialStore/:id", authenticate, updatePackingMeterialStore);

export default packingMaterialStoreRouter;
