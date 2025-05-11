import Store from '../model/store.js';

// Add a new store item
export const addStoreItem = async (req, res) => {
  try {
    const newStoreItem = new Store(req.body);
    await newStoreItem.save();
    res
      .status(201)
      .json({message: 'Store item added successfully', data: newStoreItem});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error adding store item', error: error.message});
  }
};

// Get all store items
export const getAllStoreItems = async (req, res) => {
  try {
    const storeItems = await Store.find();
    res.status(200).json(storeItems);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error retrieving store items', error: error.message});
  }
};

// Delete a store item by ID
export const deleteStoreItem = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedItem = await Store.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({message: 'Store item not found'});
    }
    res.status(200).json({message: 'Store item deleted successfully'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error deleting store item', error: error.message});
  }
};

// Controller to add a request for material
export const addMaterialRequest = async (req, res) => {
  try {
    const {productName, requestMaterial} = req.body;

    const storeItem = await Store.findOne({productName});

    if (!storeItem) {
      return res.status(404).json({message: 'Store item not found'});
    }

    storeItem.requestMaterial = requestMaterial;
    await storeItem.save();

    res.status(200).json({
      message: 'Material request added successfully',
      requestMaterial: storeItem.requestMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding material request',
      error: error.message,
    });
  }
};

// Controller to process the request by subtracting from quantity
export const processMaterialRequest = async (req, res) => {
  try {
    const {id} = req.params;

    const storeItem = await Store.findById(id);

    if (!storeItem) {
      return res.status(404).json({message: 'Store item not found'});
    }

    const currentQuantity = parseFloat(storeItem.quantity);
    const requestedQuantity = parseFloat(storeItem.requestMaterial);

    if (!requestedQuantity || requestedQuantity <= 0) {
      return res.status(400).json({message: 'Invalid request quantity'});
    }

    if (currentQuantity < requestedQuantity) {
      return res.status(400).json({message: 'Not enough quantity available'});
    }

    storeItem.quantity = (currentQuantity - requestedQuantity).toString();

    storeItem.requestMaterial = '';

    await storeItem.save();

    res.status(200).json({
      message: 'Material request processed successfully',
      updatedQuantity: storeItem.quantity,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error processing material request',
      error: error.message,
    });
  }
};
