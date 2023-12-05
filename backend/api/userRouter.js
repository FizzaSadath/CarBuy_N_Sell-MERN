import express from "express";
import userModel from "../database/models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      res.json({ success: false, error: "email" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const { password: pass, ...rest } = user._doc; // remove password from the response because we don't want to send the password to the client

      res.json({ success: true, user: rest });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});
router.post("/login", async (req, res) => {});

export default router;
