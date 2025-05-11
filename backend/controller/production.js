import Production from '../model/production.js';
import moment from 'moment';
import cron from 'node-cron';

// Schedule a cron job to reset today's production data every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const today = moment().startOf('day').toDate();

    await Production.updateMany(
      {},
      {todayItems: '', todayPacks: '', todayMaterialUsage: ''}
    );

    console.log(
      `[${moment().format(
        'YYYY-MM-DD HH:mm:ss'
      )}] Today's production data has been reset.`
    );
  } catch (error) {
    console.error("Error resetting today's production data:", error);
  }
});

// Add a new production record
export const addProduction = async (req, res) => {
  try {
    const production = new Production(req.body);
    await production.save();
    res
      .status(201)
      .json({message: 'Production record added successfully', production});
  } catch (error) {
    res.status(500).json({
      message: 'Error adding production record',
      error: error.message,
    });
  }
};

// Get all production records
export const getAllProductions = async (req, res) => {
  try {
    const productions = await Production.find();
    res.status(200).json(productions);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching production records',
      error: error.message,
    });
  }
};

// Get a single production record by ID
export const getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id);
    if (!production) {
      return res.status(404).json({message: 'Production record not found'});
    }
    res.status(200).json(production);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching production record',
      error: error.message,
    });
  }
};

// Update a production record by ID
export const updateProduction = async (req, res) => {
  try {
    const {todayPacks, todayMaterialUsage} = req.body;
    const {id} = req.params;

    const production = await Production.findById(id);
    if (!production) {
      return res.status(404).json({message: 'Production record not found'});
    }

    const lastUpdateDate = moment(
      production.updatedAt || production.createdAt
    ).format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');

    if (
      lastUpdateDate === todayDate &&
      production.todayPacks &&
      production.todayMaterialUsage
    ) {
      return res.status(400).json({
        message:
          "Today's production for this record has already been recorded. Try again tomorrow.",
      });
    }

    const todayPacksNum = Number(todayPacks) || 0;
    const todayMaterialUsageNum = Number(todayMaterialUsage) || 0;

    const totalPacksNum = Number(production.totalPacks) || 0;
    const totalMaterialUsageNum = Number(production.totalMaterialUsage) || 0;

    const remainingPacksNum =
      Number(production.remainingPacks) || totalPacksNum;
    const remainingMaterialUsageNum =
      Number(production.remainingMaterialUsage) || totalMaterialUsageNum;

    const newRemainingPacks = Math.max(remainingPacksNum - todayPacksNum, 0);
    const newRemainingMaterialUsage = Math.max(
      remainingMaterialUsageNum - todayMaterialUsageNum,
      0
    );

    production.todayPacks = todayPacksNum;
    production.todayMaterialUsage = todayMaterialUsageNum;
    production.remainingPacks = newRemainingPacks;
    production.remainingMaterialUsage = newRemainingMaterialUsage;
    console.log('new MU', newRemainingMaterialUsage);
    production.updatedAt = new Date();

    await production.save();

    res.status(200).json({
      message: 'Production record updated successfully',
      production,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating production record',
      error: error.message,
    });
  }
};

// Delete a production record by ID
export const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.id);
    if (!production) {
      return res.status(404).json({message: 'Production record not found'});
    }
    res.status(200).json({message: 'Production record deleted successfully'});
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting production record',
      error: error.message,
    });
  }
};

export const getTodaysProduction = async (req, res) => {
  try {
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const todaysProduction = await Production.find({
      updatedAt: {$gte: todayStart, $lte: todayEnd},
      $or: [{todayItems: {$gt: 0}}, {todayPacks: {$gt: 0}}],
    }).select('productName batchNumber todayItems todayPacks materialUsage');

    res.status(200).json(todaysProduction);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch today's production data"});
  }
};
