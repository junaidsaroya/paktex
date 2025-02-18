import mongoose from "mongoose";

const packingMaterialStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    dispatch: { type: Boolean, required: false, default: false },
    dispatchBy: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const PackingMaterialStore = mongoose.model("PackingMaterialStore", packingMaterialStoreSchema);

export default PackingMaterialStore;
