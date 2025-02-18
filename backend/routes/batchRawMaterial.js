import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addBatchRawMaterial, deleteBatchRawMaterialById, getAllBatchRawMaterial, getBatchRawMaterialById } from "../controller/batchRawMaterial.js";

const batchRawMaterialRouter = express.Router();

batchRawMaterialRouter.post("/batchRawMaterial", authenticate, addBatchRawMaterial);
batchRawMaterialRouter.get("/batchRawMaterial", authenticate, getAllBatchRawMaterial);
batchRawMaterialRouter.get("/batchRawMaterial/:id", authenticate, getBatchRawMaterialById);
batchRawMaterialRouter.delete("/batchRawMaterial/:id", authenticate, deleteBatchRawMaterialById);

export default batchRawMaterialRouter;
