import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addChemicalMaterialStore, getAllChemicalMaterialStore, updateChemicalMeterialStore } from "../controller/chemicalMaterialStore.js";

const chemicalMaterialStoreRouter = express.Router();

chemicalMaterialStoreRouter.get("/chemicalMaterialStore", authenticate, getAllChemicalMaterialStore);
chemicalMaterialStoreRouter.post("/chemicalMaterialStore", authenticate, addChemicalMaterialStore);
chemicalMaterialStoreRouter.patch("/chemicalMaterialStore/:id", authenticate, updateChemicalMeterialStore);

export default chemicalMaterialStoreRouter;
