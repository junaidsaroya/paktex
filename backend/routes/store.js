import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addMaterialRequest,
  addStoreItem,
  deleteStoreItem,
  getAllStoreItems,
  processMaterialRequest,
} from "../controller/store.js";

const storeRouter = express.Router();

storeRouter.post("/store", authenticate, addStoreItem);
storeRouter.get("/store", authenticate, getAllStoreItems);
storeRouter.delete("/store/:id", authenticate, deleteStoreItem);
storeRouter.patch("/add-request", authenticate, addMaterialRequest);
storeRouter.patch("/process-request/:id", authenticate, processMaterialRequest);

export default storeRouter;
