import mongoose from "mongoose";

const chemicalSchema = new mongoose.Schema(
  {
    chemicalName: { type: String, required: true },
    batchNo: { type: String, required: true },
    mfgDate: { type: Date, required: true },
    expDate: { type: Date, required: true },
    brand: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

const Chemical = mongoose.model("Chemical", chemicalSchema);

export default Chemical;
