import File from "../model/Files.js";

// Add a new file
export const addFile = async (req, res) => {
  try {
    const { productName, fileName, fileUrl } = req.body;

    const newFile = new File({ productName, fileName, fileUrl });
    await newFile.save();

    res
      .status(201)
      .json({ message: "File uploaded successfully!", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Error saving file", error });
  }
};

// Get all files for a specific product
export const getFilesByProduct = async (req, res) => {
  try {
    const { productName } = req.params;
    const files = await File.find({ productName });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving files", error });
  }
};

// Update file details
export const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, fileUrl } = req.body;

    const updatedFile = await File.findByIdAndUpdate(
      id,
      { fileName, fileUrl },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File updated successfully", file: updatedFile });
  } catch (error) {
    res.status(500).json({ message: "Error updating file", error });
  }
};

// Delete a file
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFile = await File.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error });
  }
};
