import mongoose from "mongoose";

const etoSterlizationStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    dispatch: { type: Boolean, required: false, default: false },
    dispatchBy: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const ETOSterlizationStore = mongoose.model("ETOSterlizationStore", etoSterlizationStoreSchema);

export default ETOSterlizationStore;
