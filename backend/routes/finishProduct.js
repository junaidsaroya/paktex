import express from "express";
import authenticate from "../middleware/authenticate.js";
import { addFinishProduct, deleteFinishProductById, getAllFinishProduct, getFinishProductById } from "../controller/finishProduct.js";

const finishProductRouter = express.Router();

finishProductRouter.post("/finishProduct", authenticate, addFinishProduct);
finishProductRouter.get("/finishProduct", authenticate, getAllFinishProduct);
finishProductRouter.get("/finishProduct/:id", authenticate, getFinishProductById);
finishProductRouter.delete("/finishProduct/:id", authenticate, deleteFinishProductById);

export default finishProductRouter;
