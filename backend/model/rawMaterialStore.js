import mongoose from "mongoose";

const rawMaterialStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    dispatch: { type: Boolean, required: false, default: false },
    dispatchBy: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const RawMaterialStore = mongoose.model("RawMaterialStore", rawMaterialStoreSchema);

export default RawMaterialStore;
