import ProductIntimate from "../model/productIntimate.js";


// Add a new record
export const addIntimate = async (req, res) => {
  try {
    const newIntimate = new ProductIntimate(req.body);
    const savedIntimate = await newIntimate.save();
    res.status(201).json({ message: "Product intimate added successfully.", data: savedIntimate });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product intimate.", error: error.message });
  }
};

// Get all records
export const getAllIntimates = async (req, res) => {
  try {
    const intimates = await ProductIntimate.find();
    res.status(200).json({ message: "Records fetched successfully.", data: intimates });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records.", error: error.message });
  }
};

// Get record by name and batch
export const getIntimateProduct = async (req, res) => {
  try {
    const { name, batchName } = req.query; // Access query params

    // Query your database with the received parameters
    const query = {};
    if (name) query.name = name;
    if (batchName) query.batchName = batchName;

    const intimates = await ProductIntimate.find(query);
    
    res.status(200).json({ message: "Records fetched successfully.", data: intimates });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records.", error: error.message });
  }
};



// Get a record by ID
export const getIntimateById = async (req, res) => {
  try {
    const intimate = await ProductIntimate.findById(req.params.id).populate("productId", "productName");
    if (!intimate) return res.status(404).json({ message: "Record not found." });
    res.status(200).json({ message: "Record fetched successfully.", data: intimate });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch record.", error: error.message });
  }
};

// Delete a record by ID
export const deleteIntimate = async (req, res) => {
  try {
    const deleted = await ProductIntimate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found." });
    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete record.", error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedProduct = await ProductIntimate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Status updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};


