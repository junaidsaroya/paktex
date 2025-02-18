import InProcessQC from "../model/InProcessQC.js";

export const addInProcessQC = async (req, res) => {
  try {
    const { productName, releaseDate, qcNumber, tests, description, remarks, qcAnalyst, batchNumber } = req.body;

    const newInProcessQC = new InProcessQC({
      productName,
      releaseDate,
      qcNumber,
      tests,
      description,
      remarks,
      qcAnalyst,
      batchNumber
    });

    const savedInProcessQC = await newInProcessQC.save();
    res.status(201).json({ message: "InProcessQC entry added successfully", data: savedInProcessQC });
  } catch (error) {
    console.error("Error adding InProcessQC entry:", error);
    res.status(500).json({ message: "Failed to add InProcessQC entry", error });
  }
};

export const getAllInProcessQC = async (req, res) => {
  try {
    const InProcessQCEntries = await InProcessQC.find(); // Fetch all documents from the collection
    res.status(200).json({ message: "InProcessQC entries fetched successfully", data: InProcessQCEntries });
  } catch (error) {
    console.error("Error fetching InProcessQC entries:", error);
    res.status(500).json({ message: "Failed to fetch InProcessQC entries", error });
  }
};

// Controller to get a InProcessQC entry by ID
export const getInProcessQCById = async (req, res) => {
  try {
    const { id } = req.params;

    const InProcessQCEntry = await InProcessQC.findById(id);
    if (!InProcessQCEntry) {
      return res.status(404).json({ message: "InProcessQC entry not found" });
    }

    res.status(200).json({ message: "InProcessQC entry fetched successfully", data: InProcessQCEntry });
  } catch (error) {
    console.error("Error fetching InProcessQC entry by ID:", error);
    res.status(500).json({ message: "Failed to fetch InProcessQC entry by ID", error });
  }
};

// Controller to delete a InProcessQC entry by ID
export const deleteInProcessQCById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInProcessQC = await InProcessQC.findByIdAndDelete(id);
    if (!deletedInProcessQC) {
      return res.status(404).json({ message: "InProcessQC entry not found" });
    }

    res.status(200).json({ message: "InProcessQC entry deleted successfully", data: deletedInProcessQC });
  } catch (error) {
    console.error("Error deleting InProcessQC entry:", error);
    res.status(500).json({ message: "Failed to delete InProcessQC entry", error });
  }
};
