import BatchRawMaterial from '../model/batchRawMaterial.js';

export const addBatchRawMaterial = async (req, res) => {
  try {
    const {
      productName,
      manufactureDate,
      qcNumber,
      tests,
      description,
      remarks,
      qcAnalyst,
      batchNumber,
    } = req.body;

    const newBatchRawMaterial = new BatchRawMaterial({
      productName,
      manufactureDate,
      qcNumber,
      tests,
      description,
      remarks,
      qcAnalyst,
      batchNumber,
    });

    const savedBatchRawMaterial = await newBatchRawMaterial.save();
    res
      .status(201)
      .json({
        message: 'Lims entry added successfully',
        data: savedBatchRawMaterial,
      });
  } catch (error) {
    console.error('Error adding BatchRawMaterial entry:', error);
    res
      .status(500)
      .json({message: 'Failed to add BatchRawMaterial entry', error});
  }
};

export const getAllBatchRawMaterial = async (req, res) => {
  try {
    const batchRawMaterialEntries = await BatchRawMaterial.find();
    res
      .status(200)
      .json({
        message: 'BatchRawMaterial entries fetched successfully',
        data: batchRawMaterialEntries,
      });
  } catch (error) {
    console.error('Error fetching BatchRawMaterial entries:', error);
    res
      .status(500)
      .json({message: 'Failed to fetch BatchRawMaterial entries', error});
  }
};

// Controller to get a Lims entry by ID
export const getBatchRawMaterialById = async (req, res) => {
  try {
    const {id} = req.params;

    const batchRawMaterialEntry = await BatchRawMaterial.findById(id);
    if (!batchRawMaterialEntry) {
      return res
        .status(404)
        .json({message: 'BatchRawMaterial entry not found'});
    }

    res
      .status(200)
      .json({
        message: 'BatchRawMaterial entry fetched successfully',
        data: batchRawMaterialEntry,
      });
  } catch (error) {
    console.error('Error fetching BatchRawMaterial entry by ID:', error);
    res
      .status(500)
      .json({message: 'Failed to fetch BatchRawMaterial entry by ID', error});
  }
};

// Controller to delete a BatchRawMaterial entry by ID
export const deleteBatchRawMaterialById = async (req, res) => {
  try {
    const {id} = req.params;

    const deletedBatchRawMaterial = await BatchRawMaterial.findByIdAndDelete(
      id
    );
    if (!deletedBatchRawMaterial) {
      return res
        .status(404)
        .json({message: 'BatchRawMaterial entry not found'});
    }

    res
      .status(200)
      .json({
        message: 'BatchRawMaterial entry deleted successfully',
        data: deletedBatchRawMaterial,
      });
  } catch (error) {
    console.error('Error deleting BatchRawMaterial entry:', error);
    res
      .status(500)
      .json({message: 'Failed to delete BatchRawMaterial entry', error});
  }
};
