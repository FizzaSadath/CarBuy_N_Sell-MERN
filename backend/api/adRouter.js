import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import adModel from "../database/models/ad.js";

import userModel from "../database/models/user.js";

const storage = multer.memoryStorage();

const deleteFilesInDirectory = (directoryPath) => {
  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
        });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/post", upload.array("pictures"), async (req, res) => {
  try {
    const { city, year, make, color, mileage, price, description } = req.body;
    const pictures = req.files.map((file) => {
      // console.log(file);
      return {
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      };
    });
    // console.log(req.files);

    const newAd = new adModel({
      city,
      year,
      make,
      color,
      description,
      price,
      mileage,
      pictures,
    });
    await newAd.save();

    res.json({ success: true });
    // now delete the pictures from the uploads folder// why?? because we don't want to store the pictures in the uploads folder because we are storing the pictures in the database
    deleteFilesInDirectory("uploads/");
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const ads = await adModel.find({});
    res.json({ success: true, ads });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

export default router;
