import PackingMaterialStore from "../model/packingMaterialStore.js";


export const addPackingMaterialStore = async (req, res) => {
  try {
    const newPackingMaterialStore = new PackingMaterialStore(req.body);
    const savedPackingMaterialStore = await newPackingMaterialStore.save();
    res.status(201).json({
      message: "PackingMaterialStore added successfully",
      data: savedPackingMaterialStore,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add packingMaterialStore",
      error: error.message,
    });
  }
};

export const getAllPackingMaterialStore = async (req, res) => {
  try {
    const packingMaterialStore = await PackingMaterialStore.find();
    res.status(200).json(packingMaterialStore);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve packingMaterialStore",
      error: error.message,
    });
  }
};

export const updatePackingMeterialStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatch, dispatchBy, dispatchDate } = req.body; // Fixed `dispatchDate` key

    const updatedPackingMaterial = await PackingMaterialStore.findByIdAndUpdate(
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

    if (!updatedPackingMaterial) {
      return res.status(404).json({ message: "PackingMaterialStore not found" });
    }

    res.status(200).json({
      message: "Dispatch status updated successfully",
      data: updatedPackingMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update dispatch status",
      error: error.message,
    });
  }
};