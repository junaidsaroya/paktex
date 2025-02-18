import mongoose from "mongoose";

const batchRawMaterialSchema = new mongoose.Schema(
  {
    productName: { type: 'string'},
    manufactureDate: { type: Date, required: true },
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
    description: {type: String},
    remarks: { type: String, },
    qcAnalyst: {type: String, required: true},
    batchNumber: {type: String, required: true},
  },
  { timestamps: true }
);

const BatchRawMaterial = mongoose.model("BatchRawMaterial", batchRawMaterialSchema);

export default BatchRawMaterial;
