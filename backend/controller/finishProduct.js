import FinishProduct from "../model/finishProduct.js";

export const addFinishProduct = async (req, res) => {
  try {
    const { productName, manufactureDate, qcNumber, tests, description, remarks, qcAnalyst, batchNumber } = req.body;

    const newFinishProduct = new FinishProduct({
      productName,
      manufactureDate,
      qcNumber,
      tests,
      description,
      remarks,
      qcAnalyst,
      batchNumber
    });

    const savedFinishProduct = await newFinishProduct.save();
    res.status(201).json({ message: "FinishProduct entry added successfully", data: savedFinishProduct });
  } catch (error) {
    console.error("Error adding FinishProduct entry:", error);
    res.status(500).json({ message: "Failed to add FinishProduct entry", error });
  }
};

export const getAllFinishProduct = async (req, res) => {
  try {
    const finishProductEntries = await FinishProduct.find(); // Fetch all documents from the collection
    res.status(200).json({ message: "FinishProduct entries fetched successfully", data: finishProductEntries });
  } catch (error) {
    console.error("Error fetching FinishProduct entries:", error);
    res.status(500).json({ message: "Failed to fetch FinishProduct entries", error });
  }
};

// Controller to get a FinishProduct entry by ID
export const getFinishProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const finishProductEntry = await BatchRawMaterial.findById(id);
    if (!finishProductEntry) {
      return res.status(404).json({ message: "FinishProduct entry not found" });
    }

    res.status(200).json({ message: "FinishProduct entry fetched successfully", data: finishProductEntry });
  } catch (error) {
    console.error("Error fetching FinishProduct entry by ID:", error);
    res.status(500).json({ message: "Failed to fetch FinishProduct entry by ID", error });
  }
};

// Controller to delete a FinishProduct entry by ID
export const deleteFinishProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFinishProduct = await FinishProduct.findByIdAndDelete(id);
    if (!deletedFinishProduct) {
      return res.status(404).json({ message: "FinishProduct entry not found" });
    }

    res.status(200).json({ message: "FinishProduct entry deleted successfully", data: deletedFinishProduct });
  } catch (error) {
    console.error("Error deleting FinishProduct entry:", error);
    res.status(500).json({ message: "Failed to delete FinishProduct entry", error });
  }
};
