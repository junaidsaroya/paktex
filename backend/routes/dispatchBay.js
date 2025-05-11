import express from "express";
import {
  addDispatchBay,
  deleteDispatchBay,
  getAllDispatchBay,
  updateDispatchBay,
} from "../controller/dispatchBay.js";

const dispatchRouter = express.Router();

dispatchRouter.post("/dispatch", addDispatchBay);
dispatchRouter.get("/dispatch", getAllDispatchBay);
dispatchRouter.put("/dispatch/:id", updateDispatchBay);
dispatchRouter.delete("/dispatch/:id", deleteDispatchBay);

export default dispatchRouter;
