import Instrument from "../model/instrument.js";

// Controller to add a new instrument
export const addInstrument = async (req, res) => {
  try {
    const newInstrument = new Instrument(req.body);
    const savedInstrument = await newInstrument.save();
    res.status(201).json({
      message: "Instrument added successfully",
      data: savedInstrument,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add instrument",
      error: error.message,
    });
  }
};

// Controller to get all instruments
export const getAllInstruments = async (req, res) => {
  try {
    const instruments = await Instrument.find();
    res.status(200).json(instruments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve instruments",
      error: error.message,
    });
  }
};

// Controller to get an instrument by ID
export const getInstrumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const instrument = await Instrument.findById(id);

    if (!instrument) {
      return res.status(404).json({
        message: "Instrument not found",
      });
    }

    res.status(200).json(instrument);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve instrument",
      error: error.message,
    });
  }
};

// Controller to delete an instrument by ID
export const deleteInstrumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInstrument = await Instrument.findByIdAndDelete(id);

    if (!deletedInstrument) {
      return res.status(404).json({
        message: "Instrument not found",
      });
    }

    res.status(200).json({
      message: "Instrument deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete instrument",
      error: error.message,
    });
  }
};

// Controller to update an instrument by ID
export const updateInstrumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInstrument = await Instrument.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInstrument) {
      return res.status(404).json({
        message: "Instrument not found",
      });
    }

    res.status(200).json({
      message: "Instrument updated successfully",
      data: updatedInstrument,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update instrument",
      error: error.message,
    });
  }
};
