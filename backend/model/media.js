import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    mediaName: { type: String, required: true },
    batchNo: { type: String, required: true },
    mfgDate: { type: Date, required: true },
    expDate: { type: Date, required: true },
    brand: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
