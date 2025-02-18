import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addLims, deleteLimsById, getAllLims, getLimsById } from "../controller/lims.js";

const limsRouter = express.Router();

limsRouter.post("/lims", authenticate, addLims); // Add a new Lims entry
limsRouter.get("/lims", authenticate, getAllLims); // Get all Lims entries
limsRouter.get("/lims/:id", authenticate, getLimsById); // Get a Lims entry by ID
limsRouter.delete("/lims/:id", authenticate, deleteLimsById); // Delete a Lims entry by ID

export default limsRouter;
