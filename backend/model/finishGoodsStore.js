import mongoose from "mongoose";

const finishGoodStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    quantity: { type: String, required: false },
    quantityUnit: { type: String, required: false },
  },
  { timestamps: true }
);

const FinishGoodStore = mongoose.model("FinishGoodStore", finishGoodStoreSchema);

export default FinishGoodStore;
