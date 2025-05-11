import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addEtoQuarantineStore,
  deleteEtoQuarantineStore,
  getAllEtoQuarantineStores,
  updateEtoQuarantineStore,
} from "../controller/etoQuarantineStore.js";
const etoQuarantineStoreRouter = express.Router();

etoQuarantineStoreRouter.post(
  "/etoQuarantineStore",
  authenticate,
  addEtoQuarantineStore
);
etoQuarantineStoreRouter.get(
  "/etoQuarantineStore",
  authenticate,
  getAllEtoQuarantineStores
);
etoQuarantineStoreRouter.delete(
  "/etoQuarantineStore/:productName",
  authenticate,
  deleteEtoQuarantineStore
);
etoQuarantineStoreRouter.put(
  "/etoQuarantineStore",
  authenticate,
  updateEtoQuarantineStore
);

export default etoQuarantineStoreRouter;
