import express from "express";
import multer from "multer";
import adModel from "../database/models/ad.js";
import userModel from "../database/models/user.js";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/post", upload.array("pictures"), async (req, res) => {
  try {
    const { city, year, make, color, mileage, price, description } = req.body;
    const pictures = req.files.map((file) => {
      return {
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      };
    });

    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, error: "login" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      const user = await userModel.findById(req.user);
      if (!user) {
        res.json({ success: false, error: "exist" });
      } else {
        const newAd = new adModel({
          city,
          year,
          make,
          color,
          description,
          price,
          mileage,
          pictures,
          user: user._id,
        });
        await newAd.save();
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, error: "login" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      const user = await userModel.findById(req.user);
      if (!user) {
        res.json({ success: false, error: "exist" });
      } else {
        const ads = await adModel.find({});
        res.json({ success: true, ads });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

router.get("/my", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, error: "login" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      const user = await userModel.findById(req.user);
      if (!user) {
        res.json({ success: false, error: "exist" });
      } else {
        const ads = await adModel.find({ user: user._id });
        res.json({ success: true, ads });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, error: "login" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      const user = await userModel.findById(req.user);
      if (!user) {
        res.json({ success: false, error: "exist" });
      } else {
        const ad = await adModel.findById(req.params.id);
        if (!ad) {
          res.json({ success: false, error: "exist" });
        } else {
          await adModel.findByIdAndDelete(req.params.id);
          res.json({ success: true });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
