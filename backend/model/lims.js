import mongoose from "mongoose";

const limsSchema = new mongoose.Schema(
  {
    releaseDate: { type: Date, required: true },
    qcNumber: { type: String },
    tests: [
      {
        testName: {
          type: String,
          required: true,
        },
        specifications: {
          type: String,
          required: true,
        },
        result: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
    remarks: { type: String, },
  },
  { timestamps: true }
);

const Lims = mongoose.model("Lims", limsSchema);

export default Lims;
