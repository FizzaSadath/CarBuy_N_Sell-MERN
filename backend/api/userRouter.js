import express from "express";
import userModel from "../database/models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      res.json({ success: false, error: "email" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await userModel.create({
        name,
        email,
        contact,
        password: hashedPassword,
      });
      const payload = { user: user._id }; // this is the payload that we will use to create the token to send the token to the client so that the client can use the token to access protected routes
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res.cookie("token", token, { httpOnly: true }); // httpOnly: true means that the cookie can only be accessed by the server and not by the client // we are sending the token as a cookie because we want the browser to automatically send the token to the server whenever the user makes a request to the server
      const { password: pass, ...rest } = user._doc; // remove password from the response because we don't want to send the password to the client

      res.json({ success: true, user: rest });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, error: "cred" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.json({ success: false, error: "cred" });
      } else {
        const payload = { user: user._id }; // this is the payload that we will use to create the token to send the token to the client so that the client can use the token to access protected routes
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.cookie("token", token, { httpOnly: true }); // httpOnly: true means that the cookie can only be accessed by the server and not by the client // we are sending the token as a cookie because we want the browser to automatically send the token to the server whenever the user makes a request to the server
        const { password: pass, ...rest } = user._doc;
        res.json({ success: true, user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "crash" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false });
  }
});

router.get("/getUser", async (req, res) => {
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
        const { password, ...rest } = user._doc;
        res.json({ success: true, user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "server error" });
  }
});

export default router;
