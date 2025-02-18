import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema(
  {
    instrumentName: { type: String, required: true },
    company: { type: String, required: true },
    modal: { type: String, required: true },
    size: { type: String, required: true },
    code: { type: String, required: true },
    staff: { type: String, required: true },
    workingRange: { type: String, required: true },
    labAddress: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

const Instrument = mongoose.model("Instrument", instrumentSchema);

export default Instrument;
