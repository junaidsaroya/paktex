import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addInstrument,
  deleteInstrumentById,
  getAllInstruments,
  getInstrumentById,
  updateInstrumentById,
} from "../controller/instrument.js";

const instrumentRouter = express.Router();

instrumentRouter.get("/getAllInstruments", authenticate, getAllInstruments);
instrumentRouter.get("/getInstrumentById/:id", authenticate, getInstrumentById);
instrumentRouter.post("/addInstrument", authenticate, addInstrument);
instrumentRouter.delete(
  "/deleteInstrument/:id",
  authenticate,
  deleteInstrumentById
);
instrumentRouter.put(
  "/updateInstrument/:id",
  authenticate,
  updateInstrumentById
);

export default instrumentRouter;
