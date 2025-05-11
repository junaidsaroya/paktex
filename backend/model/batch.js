import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
  length: {type: Number, required: true},
  lengthType: {type: String, required: true},
  width: {type: Number, required: true},
  widthType: {type: String, required: true},
});

const batchSchema = new mongoose.Schema(
  {
    productName: {type: String, required: true},
    batchNumber: {type: String, required: true},
    sterile: {type: Boolean, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    mfgDate: {type: Date, required: true},
    expDate: {type: Date, required: true},
    batchLength: {type: Number, required: true},
    productSize: [productSizeSchema],
    numberOfWorkers: {type: String, required: true},
    perWorkerTarget: {type: String, required: true},
    status: {type: Boolean, default: true},
  },
  {timestamps: true}
);

const Batch = mongoose.models.Batch || mongoose.model('Batch', batchSchema);

export default Batch;
