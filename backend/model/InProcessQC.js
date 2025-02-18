import mongoose from "mongoose";

const inProcessQC = new mongoose.Schema(
  {
    productName: { type: String },
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
        results: {
          type: [[String]],
          required: true,
          validate: {
            validator: function (results) {
              return results.length === 5;
            },
            message: "Each test must have exactly 5 result arrays.",
          },
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
    description: { type: String },
    remarks: { type: String },
    qcAnalyst: {type: String, required: true},
    batchNumber: {type: String, required: true},
  },
  { timestamps: true }
);

const InProcessQC = mongoose.model("InProcessQC", inProcessQC);

export default InProcessQC;