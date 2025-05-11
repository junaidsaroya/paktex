import multer from 'multer';
import fs from 'fs';
import path from 'path';
import File from '../model/Files.js';

const uploadPath = 'D:/paktex';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage}).any();

export const uploadHandler = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({message: 'Multer error', error: err});
    }

    const {productName} = req.body;

    if (!productName) {
      return res.status(400).json({message: 'productName is required'});
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    const productFolder = path.join(uploadPath, productName);
    if (!fs.existsSync(productFolder)) {
      fs.mkdirSync(productFolder, {recursive: true});
    }

    const uploadedFile = req.files[0];
    const oldPath = uploadedFile.path;
    const newPath = path.join(productFolder, uploadedFile.originalname);

    // Replace existing file
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }

    fs.renameSync(oldPath, newPath);

    try {
      const newFile = new File({
        productName,
        fileName: uploadedFile.originalname,
        filePath: newPath.replace(/\\/g, '/'),
      });

      await newFile.save();

      res.status(200).json({
        message: 'File uploaded successfully',
        path: newFile.filePath,
      });
    } catch (error) {
      console.error('DB error:', error);
      res.status(500).json({message: 'Database error', error});
    }
  });
};
