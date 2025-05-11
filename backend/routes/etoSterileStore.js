import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addEtoSterileStore,
  deleteEtoSterileStore,
  getAllEtoSterileStores,
  updateEtoSterileStore,
} from "../controller/etoSterileStore.js";
const etoSterileStoreRouter = express.Router();

etoSterileStoreRouter.post(
  "/etoSterileStore",
  authenticate,
  addEtoSterileStore
);
etoSterileStoreRouter.get(
  "/etoSterileStore",
  authenticate,
  getAllEtoSterileStores
);
etoSterileStoreRouter.delete(
  "/etoSterileStore/:productName",
  authenticate,
  deleteEtoSterileStore
);
etoSterileStoreRouter.put(
  "/etoSterileStore",
  authenticate,
  updateEtoSterileStore
);

export default etoSterileStoreRouter;
