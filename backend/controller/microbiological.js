import Microbiological from '../model/microbiological.js';

// Add new microbiological data
export const addMicrobiologicalData = async (req, res) => {
  try {
    const {
      productName,
      batchNumber,
      microbiologist,
      remarks,
      releaseNote,
      tests,
    } = req.body;

    const newMicrobiologicalData = new Microbiological({
      productName,
      batchNumber,
      microbiologist,
      remarks,
      releaseNote,
      tests,
    });

    const savedData = await newMicrobiologicalData.save();
    res.status(201).json({success: true, data: savedData});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save data',
      error: error.message,
    });
  }
};

// Update microbiological data
export const updateMicrobiologicalData = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      productName,
      batchNumber,
      microbiologist,
      remarks,
      releaseNote,
      tests,
    } = req.body;

    const existingData = await Microbiological.findById(id);

    if (!existingData) {
      return res.status(404).json({success: false, message: 'Data not found'});
    }

    existingData.productName = productName || existingData.productName;
    existingData.batchNumber = batchNumber || existingData.batchNumber;
    existingData.microbiologist = microbiologist || existingData.microbiologist;
    existingData.remarks = remarks || existingData.remarks;
    existingData.releaseNote = releaseNote || existingData.releaseNote;
    existingData.tests = tests || existingData.tests;

    const updatedData = await existingData.save();

    res.status(200).json({success: true, data: updatedData});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update data',
      error: error.message,
    });
  }
};
// Get all microbiological data
export const getAllMicrobiologicalData = async (req, res) => {
  try {
    const data = await Microbiological.find();
    res.status(200).json({success: true, data});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: error.message,
    });
  }
};

// Get microbiological data by ID
export const getMicrobiologicalDataById = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await Microbiological.findById(id);

    if (!data) {
      return res.status(404).json({success: false, message: 'Data not found'});
    }

    res.status(200).json({success: true, data});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: error.message,
    });
  }
};
