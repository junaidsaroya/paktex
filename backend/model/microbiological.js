import mongoose from "mongoose";

const microbiologicalSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    microbiologist: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    releaseNote: {
      type: String,
    },
    tests: [
      {
        testDate: {
          type: Date,
          required: true,
        },
        result: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Microbiological = mongoose.model(
  "Microbiological",
  microbiologicalSchema
);

export default Microbiological;
