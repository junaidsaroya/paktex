import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  getBatchCounts,
  getChemicalCounts,
  getInstrumentCounts,
  getIntimateProgressCounts,
  getMediaCounts,
  getProductCounts,
  getUserCounts,
} from "../controller/dashboard.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/batch", authenticate, getBatchCounts);
dashboardRouter.get("/product", authenticate, getProductCounts);
dashboardRouter.get("/media", authenticate, getMediaCounts);
dashboardRouter.get("/instrument", authenticate, getInstrumentCounts);
dashboardRouter.get("/chemical", authenticate, getChemicalCounts);
dashboardRouter.get("/user", authenticate, getUserCounts);
dashboardRouter.get(
  "/intimateProgress",
  authenticate,
  getIntimateProgressCounts
);

export default dashboardRouter;
