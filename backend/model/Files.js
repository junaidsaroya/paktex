import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  productName: String,
  fileName: String,
  filePath: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
