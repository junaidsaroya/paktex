import Batch from "../model/batch.js";

// Add a new batch
export const addBatch = async (req, res) => {
  try {
    const newBatch = new Batch(req.body);
    const savedBatch = await newBatch.save();
    res.status(201).json({ message: "Batch added successfully!", batch: savedBatch });
  } catch (error) {
    console.error("Error adding batch:", error);
    res.status(500).json({ message: "Failed to add batch.", error: error.message });
  }
};

// Get all batches
export const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ message: "Failed to fetch batches.", error: error.message });
  }
};

// Update batch status by ID
export const updateBatchStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Invalid status value. It must be a boolean." });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found." });
    }

    res.status(200).json({ message: "Batch status updated successfully!", batch: updatedBatch });
  } catch (error) {
    console.error("Error updating batch status:", error);
    res.status(500).json({ message: "Failed to update batch status.", error: error.message });
  }
};


// Get batch by ID
export const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found." });
    }
    res.status(200).json(batch);
  } catch (error) {
    console.error("Error fetching batch by ID:", error);
    res.status(500).json({ message: "Failed to fetch batch by ID.", error: error.message });
  }
};

// Delete batch by ID
export const deleteBatchById = async (req, res) => {
  try {
    const deletedBatch = await Batch.findByIdAndDelete(req.params.id);
    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found." });
    }
    res.status(200).json({ message: "Batch deleted successfully!", batch: deletedBatch });
  } catch (error) {
    console.error("Error deleting batch by ID:", error);
    res.status(500).json({ message: "Failed to delete batch by ID.", error: error.message });
  }
};

// Update batch by ID
export const updateBatchById = async (req, res) => {
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found." });
    }
    res.status(200).json({ message: "Batch updated successfully!", batch: updatedBatch });
  } catch (error) {
    console.error("Error updating batch by ID:", error);
    res.status(500).json({ message: "Failed to update batch by ID.", error: error.message });
  }
};
