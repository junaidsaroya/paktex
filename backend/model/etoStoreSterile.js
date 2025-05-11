import mongoose from "mongoose";

const etoSterileStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    quantity: { type: String, required: false },
    quantityUnit: { type: String, required: false },
  },
  { timestamps: true }
);

const EtoSterileStore = mongoose.model("EtoSterileStore", etoSterileStoreSchema);

export default EtoSterileStore;
