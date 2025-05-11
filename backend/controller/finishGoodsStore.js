import FinishGoodStore from '../model/finishGoodsStore.js';

// Add a new finish good store entry
export const addFinishGoodStore = async (req, res) => {
  try {
    const {productName, batchNo, quantity, quantityUnit} = req.body;

    if (!productName || !batchNo) {
      return res
        .status(400)
        .json({message: 'Product name and quantity are required.'});
    }

    const newEntry = new FinishGoodStore({
      productName,
      batchNo,
      quantity,
      quantityUnit,
    });
    await newEntry.save();

    res
      .status(201)
      .json({
        message: 'Finish Good Store entry added successfully',
        data: newEntry,
      });
  } catch (error) {
    res.status(500).json({message: 'Error adding entry', error: error.message});
  }
};

// Get all finish good store entries
export const getAllFinishGoodStores = async (req, res) => {
  try {
    const entries = await FinishGoodStore.find().sort({createdAt: -1});
    res.status(200).json(entries);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error fetching data', error: error.message});
  }
};

// Update a finish good store entry
export const updateFinishGoodStore = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedEntry = await FinishGoodStore.findByIdAndUpdate(id, req.body, {
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

// Delete a finish good store entry
export const deleteFinishGoodStore = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedEntry = await FinishGoodStore.findByIdAndDelete(id);

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
