import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import instrumentRouter from "./routes/instrument.js";
import mediaRouter from "./routes/media.js";
import chemicalRouter from "./routes/chemical.js";
import productIntimateRouter from "./routes/productIntimate.js";
import batchRouter from "./routes/batch.js";
import limsRouter from "./routes/lims.js";
import dashboardRouter from "./routes/dashboard.js";
import batchRawMaterialRouter from "./routes/batchRawMaterial.js";
import inProcessQCRouter from "./routes/inProcessQC.js";
import fileRouter from "./routes/Files.js";
import finishProductRouter from "./routes/finishProduct.js";
import etoSterlizationRouter from "./routes/etoSterlization.js";
import microbiologicalRouter from "./routes/microbiological.js";
import chemicalMaterialStoreRouter from "./routes/chemicalMaterialStore.js";
import packingMaterialStoreRouter from "./routes/packingMaterialStore.js";
import rawMaterialStoreRouter from "./routes/rawMaterialStore.js";
import etoSterlizationStoreRouter from "./routes/etoSterlizationStore.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "*",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://paktex.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/instrument", instrumentRouter);
app.use("/chemical", chemicalRouter);
app.use("/media", mediaRouter);
app.use("/intimateProduct", productIntimateRouter);
app.use("/batch", batchRouter);
app.use("/lims", limsRouter);
app.use("/batchRawMaterial", batchRawMaterialRouter);
app.use("/inProcessQC", inProcessQCRouter);
app.use("/finishProduct", finishProductRouter);
app.use("/etoSterlization", etoSterlizationRouter)
app.use("/microbiological", microbiologicalRouter);
app.use("/rawMaterialStore", rawMaterialStoreRouter);
app.use("/packingMaterialStore", packingMaterialStoreRouter);
app.use("/chemicalMaterialStore", chemicalMaterialStoreRouter);
app.use("/etoSterlizationStore", etoSterlizationStoreRouter);
app.use("/count", dashboardRouter)
app.use("/file", fileRouter);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = process.env.PORT || 7001;

app.get("/", (req, res) => {
  res.json({ message: "Hello, world from Paktex Backend!" });
});
app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
