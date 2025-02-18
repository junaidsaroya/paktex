import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addChemical,
  deleteChemicalById,
  getAllChemical,
  getChemicalById,
  updateChemicalById,
} from "../controller/chemical.js";

const chemicalRouter = express.Router();

chemicalRouter.get("/getAllChemicals", authenticate, getAllChemical);
chemicalRouter.get("/getChemicalById/:id", authenticate, getChemicalById);
chemicalRouter.post("/addChemical", authenticate, addChemical);
chemicalRouter.delete("/deleteChemical/:id", authenticate, deleteChemicalById);
chemicalRouter.put("/updateChemical/:id", authenticate, updateChemicalById);

export default chemicalRouter;
