import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  length: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: null,
  },
});

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true, // Test name is mandatory
  },
  specifications: {
    type: String,
    required: true, // Specifications are mandatory
  },
  acceptanceCriteria: {
    type: String,
    required: true, // Acceptance criteria are mandatory
  },
  rejectionCriteria: {
    type: String,
    required: true, // Rejection criteria are mandatory
  },
  instrument: {
    type: String,
    required: true, // Instrument selection is mandatory
  },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productVariants: [productVariantSchema],
    tests: [testSchema],
    status: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
