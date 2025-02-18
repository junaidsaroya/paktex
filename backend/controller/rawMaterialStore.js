import RawMaterialStore from "../model/rawMaterialStore.js";

export const addRawMaterialStore = async (req, res) => {
  try {
    const newRawMaterialStore = new RawMaterialStore(req.body);
    const savedRawMaterialStore = await newRawMaterialStore.save();
    res.status(201).json({
      message: "RawMaterialStore added successfully",
      data: savedRawMaterialStore,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add rawMaterialStore",
      error: error.message,
    });
  }
};

export const getAllRawMaterialStore = async (req, res) => {
  try {
    const rawMaterialStore = await RawMaterialStore.find();
    res.status(200).json(rawMaterialStore);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve rawMaterialStore",
      error: error.message,
    });
  }
};

export const updateRawMeterialStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatch, dispatchBy, dispatchDate } = req.body; // Fixed `dispatchDate` key

    const updatedRawMaterial = await RawMaterialStore.findByIdAndUpdate(
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

    if (!updatedRawMaterial) {
      return res.status(404).json({ message: "RawMaterialStore not found" });
    }

    res.status(200).json({
      message: "Dispatch status updated successfully",
      data: updatedRawMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update dispatch status",
      error: error.message,
    });
  }
};

