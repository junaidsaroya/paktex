import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addIntimate, deleteIntimate, getAllIntimates, getIntimateById, getIntimateProduct, updateStatus } from "../controller/productIntimate.js";

const productIntimateRouter = express.Router();

productIntimateRouter.get("/getAllIntimateProducts", authenticate, getAllIntimates);
productIntimateRouter.get("/intimateProduct/getAllBatch", authenticate, getIntimateProduct);
productIntimateRouter.get("/getIntimateProductById/:id", authenticate, getIntimateById);
productIntimateRouter.post("/addIntimateProduct", authenticate, addIntimate);
productIntimateRouter.put("/statusUpdate/:id", authenticate, updateStatus);
productIntimateRouter.delete("/deleteMedia/:id", authenticate, deleteIntimate);

export default productIntimateRouter;
