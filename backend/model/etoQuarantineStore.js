import mongoose from "mongoose";

const etoQuarantineStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    quantity: { type: String, required: false },
    quantityUnit: { type: String, required: false },
  },
  { timestamps: true }
);

const EtoQuarantineStore = mongoose.model("EtoQuarantineStore", etoQuarantineStoreSchema);

export default EtoQuarantineStore;
