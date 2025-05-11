import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addFinishGoodStore,
  deleteFinishGoodStore,
  getAllFinishGoodStores,
  updateFinishGoodStore,
} from "../controller/finishGoodsStore.js";
const finishGoodStoreRouter = express.Router();

finishGoodStoreRouter.post(
  "/finishGoodStore",
  authenticate,
  addFinishGoodStore
);
finishGoodStoreRouter.get(
  "/finishGoodStore",
  authenticate,
  getAllFinishGoodStores
);
finishGoodStoreRouter.delete(
  "/finishGoodStore/:id",
  authenticate,
  deleteFinishGoodStore
);
finishGoodStoreRouter.put(
  "/finishGoodStore",
  authenticate,
  updateFinishGoodStore
);

export default finishGoodStoreRouter;
