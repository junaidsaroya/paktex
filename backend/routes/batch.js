import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addBatch,
  deleteBatchById,
  getAllBatches,
  getBatchById,
  updateBatchById,
  updateBatchStatus,
} from "../controller/batch.js";

const batchRouter = express.Router();

batchRouter.get("/getAllBatch", authenticate, getAllBatches);
batchRouter.get("/getBatchById/:id", authenticate, getBatchById);
batchRouter.post("/addBatch", authenticate, addBatch);
batchRouter.delete("/deleteBatch/:id", authenticate, deleteBatchById);
batchRouter.put("/updateBatch/:id", authenticate, updateBatchById);
batchRouter.patch("/updateBatchStatus/:id", authenticate, updateBatchStatus);

export default batchRouter;
