import express from "express";
import authenticate from "../middleware/authenticate.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/product.js";

const productRouter = express.Router();

productRouter.get("/getAllProducts", authenticate, getAllProducts);
productRouter.get("/getProductById/:id", authenticate, getProductById);
productRouter.post("/addProduct", authenticate, addProduct);
productRouter.delete("/deleteProduct/:id", authenticate, deleteProduct);
productRouter.put("/updateProduct/:id", authenticate, updateProduct);

export default productRouter;
