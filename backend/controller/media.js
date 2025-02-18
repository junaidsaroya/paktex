import Media from "../model/media.js";

// Controller to add a new media
export const addMedia = async (req, res) => {
  try {
    const newMedia = new Media(req.body);
    const savedMedia = await newMedia.save();
    res.status(201).json({
      message: "Media added successfully",
      data: savedMedia,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add media",
      error: error.message,
    });
  }
};

// Controller to get all media
export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve media",
      error: error.message,
    });
  }
};

// Controller to get media by ID
export const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve media",
      error: error.message,
    });
  }
};

// Controller to delete media by ID
export const deleteMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    res.status(200).json({
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete media",
      error: error.message,
    });
  }
};

// Controller to update media by ID
export const updateMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedia = await Media.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedia) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    res.status(200).json({
      message: "Media updated successfully",
      data: updatedMedia,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update media",
      error: error.message,
    });
  }
};
