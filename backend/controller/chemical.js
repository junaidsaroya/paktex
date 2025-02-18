import Chemical from "../model/chemical.js";

// Controller to add a new chemical
export const addChemical = async (req, res) => {
  try {
    const newChemical = new Chemical(req.body);
    const savedChemical = await newChemical.save();
    res.status(201).json({
      message: "Chemical added successfully",
      data: savedChemical,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add chemical",
      error: error.message,
    });
  }
};

// Controller to get all chemical
export const getAllChemical = async (req, res) => {
  try {
    const chemical = await Chemical.find();
    res.status(200).json(chemical);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve chemical",
      error: error.message,
    });
  }
};

// Controller to get chemical by ID
export const getChemicalById = async (req, res) => {
  try {
    const { id } = req.params;
    const chemical = await Chemical.findById(id);

    if (!chemical) {
      return res.status(404).json({
        message: "Chemical not found",
      });
    }

    res.status(200).json(chemical);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve chemical",
      error: error.message,
    });
  }
};

// Controller to delete chemical by ID
export const deleteChemicalById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChemical = await Chemical.findByIdAndDelete(id);

    if (!deletedChemical) {
      return res.status(404).json({
        message: "Chemical not found",
      });
    }

    res.status(200).json({
      message: "Chemical deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete chemical",
      error: error.message,
    });
  }
};

// Controller to update chemical by ID
export const updateChemicalById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedChemical = await Chemical.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedChemical) {
      return res.status(404).json({
        message: "Chemical not found",
      });
    }

    res.status(200).json({
      message: "Chemical updated successfully",
      data: updatedChemical,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update chemical",
      error: error.message,
    });
  }
};
