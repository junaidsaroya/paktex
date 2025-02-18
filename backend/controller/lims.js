import Lims from "../model/lims.js";


// Controller to add a new Lims entry
export const addLims = async (req, res) => {
  try {
    const { releaseDate, qcNumber, tests, remarks } = req.body;

    // Create a new Lims entry
    const newLims = new Lims({
      releaseDate,
      qcNumber,
      tests,
      remarks,
    });

    const savedLims = await newLims.save();
    res.status(201).json({ message: "Lims entry added successfully", data: savedLims });
  } catch (error) {
    console.error("Error adding Lims entry:", error);
    res.status(500).json({ message: "Failed to add Lims entry", error });
  }
};

// Controller to get all Lims entries
export const getAllLims = async (req, res) => {
  try {
    const limsEntries = await Lims.find(); // Fetch all documents from the collection
    res.status(200).json({ message: "Lims entries fetched successfully", data: limsEntries });
  } catch (error) {
    console.error("Error fetching Lims entries:", error);
    res.status(500).json({ message: "Failed to fetch Lims entries", error });
  }
};

// Controller to get a Lims entry by ID
export const getLimsById = async (req, res) => {
  try {
    const { id } = req.params;

    const limsEntry = await Lims.findById(id);
    if (!limsEntry) {
      return res.status(404).json({ message: "Lims entry not found" });
    }

    res.status(200).json({ message: "Lims entry fetched successfully", data: limsEntry });
  } catch (error) {
    console.error("Error fetching Lims entry by ID:", error);
    res.status(500).json({ message: "Failed to fetch Lims entry by ID", error });
  }
};

// Controller to delete a Lims entry by ID
export const deleteLimsById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLims = await Lims.findByIdAndDelete(id);
    if (!deletedLims) {
      return res.status(404).json({ message: "Lims entry not found" });
    }

    res.status(200).json({ message: "Lims entry deleted successfully", data: deletedLims });
  } catch (error) {
    console.error("Error deleting Lims entry:", error);
    res.status(500).json({ message: "Failed to delete Lims entry", error });
  }
};
