import DispatchBay from "../model/dispatchBay.js";


// Add a new dispatch entry
export const addDispatchBay = async (req, res) => {
  try {
    const newEntry = new DispatchBay(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Dispatch entry added successfully", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error adding dispatch entry", error: error.message });
  }
};

// Get all dispatch entries
export const getAllDispatchBay = async (req, res) => {
  try {
    const entries = await DispatchBay.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dispatch entries", error: error.message });
  }
};

// Update dispatch entry by ID
export const updateDispatchBay = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await DispatchBay.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Dispatch entry updated successfully", data: updatedEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating dispatch entry", error: error.message });
  }
};

// Delete dispatch entry by ID
export const deleteDispatchBay = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await DispatchBay.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Dispatch entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting dispatch entry", error: error.message });
  }
};
