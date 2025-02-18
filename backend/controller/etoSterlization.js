import ETOSterlization from "../model/etoSterlization.js";

export const addETOSterlization = async (req, res) => {
  try {
    const {
      productName,
      manufactureDate,
      cycleNumber,
      startDate,
      startTime,
      endDate,
      endTime,
      cylinderLotNumber,
      cylinderNumber,
      initialWeight,
      finalWeight,
      gasConsume,
      etoExposureDuration,
      sterlizationTemperature,
      gasExposureTemperature,
      batchNumber,
    } = req.body;

    const newETOSterlization = new ETOSterlization({
      productName,
      manufactureDate,
      cycleNumber,
      startDate,
      startTime,
      endDate,
      endTime,
      cylinderLotNumber,
      cylinderNumber,
      initialWeight,
      finalWeight,
      gasConsume,
      etoExposureDuration,
      sterlizationTemperature,
      gasExposureTemperature,
      batchNumber
    });

    const savedETOSterlization = await newETOSterlization.save();
    res
      .status(201)
      .json({
        message: "ETOSterlization entry added successfully",
        data: savedETOSterlization,
      });
  } catch (error) {
    console.error("Error adding ETOSterlization entry:", error);
    res
      .status(500)
      .json({ message: "Failed to add ETOSterlization entry", error });
  }
};

export const getAllETOSterlization = async (req, res) => {
  try {
    const etoSterlizationEntries = await ETOSterlization.find();
    res
      .status(200)
      .json({
        message: "ETOSterlization entries fetched successfully",
        data: etoSterlizationEntries,
      });
  } catch (error) {
    console.error("Error fetching ETOSterlization entries:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch ETOSterlization entries", error });
  }
};

// Controller to get a ETOSterlization entry by ID
export const getETOSterlizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const etoSterlizationEntry = await ETOSterlization.findById(id);
    if (!etoSterlizationEntry) {
      return res
        .status(404)
        .json({ message: "ETOSterlization entry not found" });
    }

    res
      .status(200)
      .json({
        message: "ETOSterlization entry fetched successfully",
        data: etoSterlizationEntry,
      });
  } catch (error) {
    console.error("Error fetching ETOSterlization entry by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch ETOSterlization entry by ID", error });
  }
};

// Controller to delete a ETOSterlization entry by ID
export const deleteETOSterlizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedETOSterlization = await ETOSterlization.findByIdAndDelete(
      id
    );
    if (!deletedETOSterlization) {
      return res
        .status(404)
        .json({ message: "ETOSterlization entry not found" });
    }

    res
      .status(200)
      .json({
        message: "ETOSterlization entry deleted successfully",
        data: deletedETOSterlization,
      });
  } catch (error) {
    console.error("Error deleting ETOSterlization entry:", error);
    res
      .status(500)
      .json({ message: "Failed to delete ETOSterlization entry", error });
  }
};
