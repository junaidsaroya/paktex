import ChemicalMaterialStore from "../model/chemicalMaterialStore.js";


export const addChemicalMaterialStore = async (req, res) => {
  try {
    const newChemicalMaterialStore = new ChemicalMaterialStore(req.body);
    const savedChemicalMaterialStore = await newChemicalMaterialStore.save();
    res.status(201).json({
      message: "ChemicalMaterialStore added successfully",
      data: savedChemicalMaterialStore,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add chemicalMaterialStore",
      error: error.message,
    });
  }
};

export const getAllChemicalMaterialStore = async (req, res) => {
  try {
    const chemicalMaterialStore = await ChemicalMaterialStore.find();
    res.status(200).json(chemicalMaterialStore);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve chemicalMaterialStore",
      error: error.message,
    });
  }
};

export const updateChemicalMeterialStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatch, dispatchBy, dispatchDate } = req.body; // Fixed `dispatchDate` key

    const updatedChemicalMaterial = await ChemicalMaterialStore.findByIdAndUpdate(
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

    if (!updatedChemicalMaterial) {
      return res.status(404).json({ message: "ChemicalMaterialStore not found" });
    }

    res.status(200).json({
      message: "Dispatch status updated successfully",
      data: updatedChemicalMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update dispatch status",
      error: error.message,
    });
  }
};