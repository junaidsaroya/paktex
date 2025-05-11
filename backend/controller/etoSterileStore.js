import EtoSterileStore from '../model/etoStoreSterile.js';

// Add a new eto sterile store entry
export const addEtoSterileStore = async (req, res) => {
  try {
    const {productName, batchNo, quantity, quantityUnit} = req.body;

    if (!productName || !batchNo) {
      return res
        .status(400)
        .json({message: 'Product name and quantity are required.'});
    }

    const newEntry = new EtoSterileStore({
      productName,
      batchNo,
      quantity,
      quantityUnit,
    });
    await newEntry.save();

    res.status(201).json({
      message: 'Eto Sterile Store entry added successfully',
      data: newEntry,
    });
  } catch (error) {
    res.status(500).json({message: 'Error adding entry', error: error.message});
  }
};

// Get all eto sterile store entries
export const getAllEtoSterileStores = async (req, res) => {
  try {
    const entries = await EtoSterileStore.find().sort({createdAt: -1});
    res.status(200).json(entries);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error fetching data', error: error.message});
  }
};

// Update a eto sterile store entry
export const updateEtoSterileStore = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedEntry = await EtoSterileStore.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEntry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    res
      .status(200)
      .json({message: 'Entry updated successfully', data: updatedEntry});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error updating entry', error: error.message});
  }
};

// Delete a eto sterile store entry
export const deleteEtoSterileStore = async (req, res) => {
  try {
    let {productName} = req.params;
    productName = decodeURIComponent(productName);

    const deletedEntry = await EtoSterileStore.findOneAndDelete({
      productName: new RegExp(`^${productName}$`, 'i'),
    });

    if (!deletedEntry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    res.status(200).json({message: 'Entry deleted successfully'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error deleting entry', error: error.message});
  }
};
