import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addProduction,
  deleteProduction,
  getAllProductions,
  getProductionById,
  getTodaysProduction,
  updateProduction,
} from "../controller/production.js";

const productionRouter = express.Router();

productionRouter.get("/production", authenticate, getAllProductions);
productionRouter.get("/production/:id", authenticate, getProductionById);
productionRouter.post("/production", authenticate, addProduction);
productionRouter.delete("/production/:id", authenticate, deleteProduction);
productionRouter.patch("/production/:id", authenticate, updateProduction);
productionRouter.get("/production", authenticate, getTodaysProduction);

export default productionRouter;
