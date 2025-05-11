import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: false },
    dispatchBy: { type: String, required: false },
    dispatchTo: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
    requestMaterial: { type: String, required: false },
    sterile: { type: String, required: false },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
    quantityUnit: { type: String, required: true },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
