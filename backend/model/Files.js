import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);

export default File;
