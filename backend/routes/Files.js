import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addFile,
  deleteFile,
  getFilesByProduct,
  updateFile,
} from "../controller/Files.js";

const fileRouter = express.Router();

fileRouter.post("/file", authenticate, addFile);
fileRouter.get("/file/:productName", authenticate, getFilesByProduct);
fileRouter.put("/file/:id", authenticate, updateFile);
fileRouter.delete("/file/:id", authenticate, deleteFile);

export default fileRouter;
