import ETOSterlizationStore from "../model/etoSterlizationStore.js";

export const addETOSterlizationStore = async (req, res) => {
  try {
    const newETOSterlizationStore = new ETOSterlizationStore(req.body);
    const savedETOSterlizationStore = await newETOSterlizationStore.save();
    res.status(201).json({
      message: "ETOSterlizationStore added successfully",
      data: savedETOSterlizationStore,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add ETOSterlizationStore",
      error: error.message,
    });
  }
};

export const getAllETOSterlizationStore = async (req, res) => {
  try {
    const etoSterlizationStore = await ETOSterlizationStore.find();
    res.status(200).json(etoSterlizationStore);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve ETOSterlizationStore",
      error: error.message,
    });
  }
};

export const updateETOSterlizationStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatch, dispatchBy, dispatchDate } = req.body; // Fixed `dispatchDate` key

    const updatedETOSterlization = await ETOSterlizationStore.findByIdAndUpdate(
      id,
      { 
        $set: { 
          dispatch, 
          dispatchBy, 
          dispatchDate // Now updating all three fields
        } 
      },
      { new: true }
    );

    if (!updatedETOSterlization) {
      return res.status(404).json({ message: "ETOSterlizationStore not found" });
    }

    res.status(200).json({
      message: "Dispatch status updated successfully",
      data: updatedETOSterlization,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update dispatch status",
      error: error.message,
    });
  }
};