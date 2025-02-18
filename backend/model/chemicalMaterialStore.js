import mongoose from "mongoose";

const chemicalMaterialStoreSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    dispatch: { type: Boolean, required: false, default: false },
    dispatchBy: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const ChemicalMaterialStore = mongoose.model("ChemicalMaterialStore", chemicalMaterialStoreSchema);

export default ChemicalMaterialStore;
