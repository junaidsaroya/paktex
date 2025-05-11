import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
  length: {
    type: String,
    required: true,
  },
  lengthUnit: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: null,
  },
  widthUnit: {
    type: String,
    default: null,
  },
});

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  specifications: {
    type: String,
    required: true,
  },
  acceptanceCriteria: {
    type: String,
    required: true,
  },
  rejectionCriteria: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
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
    status: {type: Boolean, required: false, default: true},
  },
  {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
