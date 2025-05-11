import mongoose from "mongoose";

const productionSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNumber: { type: String, required: true },
    sterile: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    bandageLength: { type: String, required: true },
    bandageWidth: { type: String, required: true },
    totalPacks: { type: String, required: true },
    packSize: { type: String, required: true },
    perPackMaterial: { type: String, required: true },
    totalMaterialUsage: { type: String, required: true },
    todayPacks: { type: String, required: false },
    remainingMaterialUsage: { type: String, required: false },
    remainingPacks: { type: String, required: false },
    todayMaterialUsage: { type: String, required: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Production = mongoose.model("Production", productionSchema);

export default Production;
