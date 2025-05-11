import Batch from "../model/batch.js";
import Chemical from "../model/chemical.js";
import Instrument from "../model/instrument.js";
import Media from "../model/media.js";
import Product from "../model/product.js";
import ProductIntimate from "../model/productIntimate.js";
import User from "../model/user.js";

export const getBatchCounts = async (req, res) => {
  try {
    const totalBatches = await Batch.countDocuments();
    const activeBatches = await Batch.countDocuments({ status: true });
    const inactiveBatches = await Batch.countDocuments({ status: false });

    res.status(200).json({
      totalBatches,
      activeBatches,
      inactiveBatches,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getProductCounts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: true });
    const inactiveProducts = await Product.countDocuments({ status: false });

    res.status(200).json({
      totalProducts,
      activeProducts,
      inactiveProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getChemicalCounts = async (req, res) => {
  try {
    const totalChemicals = await Chemical.countDocuments();
    const activeChemicals = await Chemical.countDocuments({ status: true });
    const inactiveChemicals = await Chemical.countDocuments({ status: false });

    res.status(200).json({
      totalChemicals,
      activeChemicals,
      inactiveChemicals,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getInstrumentCounts = async (req, res) => {
  try {
    const totalInstruments = await Instrument.countDocuments();
    const activeInstruments = await Instrument.countDocuments({ status: true });
    const inactiveInstruments = await Instrument.countDocuments({
      status: false,
    });

    res.status(200).json({
      totalInstruments,
      activeInstruments,
      inactiveInstruments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getMediaCounts = async (req, res) => {
  try {
    const totalMedias = await Media.countDocuments();
    const activeMedias = await Media.countDocuments({ status: true });
    const inactiveMedias = await Media.countDocuments({ status: false });

    res.status(200).json({
      totalMedias,
      activeMedias,
      inactiveMedias,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getUserCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: true });
    const inactiveUsers = await User.countDocuments({ status: false });

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getIntimateProgressCounts = async (req, res) => {
  try {
    const totalCount = await ProductIntimate.countDocuments();
    const pendingCount = await ProductIntimate.countDocuments({
      status: "Pending",
    });
    const inProgressCount = await ProductIntimate.countDocuments({
      status: "In Progress",
    });
    const completeCount = await ProductIntimate.countDocuments({
      status: "Complete",
    });

    res.status(200).json({
      totalCount,
      pendingCount,
      inProgressCount,
      completeCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
