import mongoose from "mongoose";

const productIntimateSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    lotNumber: { type: String, required: true },
    receiveDate: { type: Date, required: true },
    supplierName: { type: String, required: true },
    grNumber: { type: String, required: true },
    quantity: { type: Number, required: true },
    measurementType: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);


const ProductIntimate = mongoose.model("ProductIntimate", productIntimateSchema);

export default ProductIntimate;
