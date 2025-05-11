import mongoose from "mongoose";

const dispatchBaySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    dispatchBy: { type: String, required: false },
    dispatchTo: { type: String, required: false },
    dispatchDate: { type: Date, required: false },
    sterile: { type: String, required: false },
    quantity: { type: String, required: false },
    quantityUnit: { type: String, required: false },
  },
  { timestamps: true }
);

const DispatchBay = mongoose.model("DispatchBay", dispatchBaySchema);

export default DispatchBay;
