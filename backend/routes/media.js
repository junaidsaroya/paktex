import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addMedia,
  deleteMediaById,
  getAllMedia,
  getMediaById,
  updateMediaById,
} from "../controller/media.js";

const mediaRouter = express.Router();

mediaRouter.get("/getAllMedia", authenticate, getAllMedia);
mediaRouter.get("/getMediaById/:id", authenticate, getMediaById);
mediaRouter.post("/addMedia", authenticate, addMedia);
mediaRouter.delete("/deleteMedia/:id", authenticate, deleteMediaById);
mediaRouter.put("/updateMedia/:id", authenticate, updateMediaById);

export default mediaRouter;
