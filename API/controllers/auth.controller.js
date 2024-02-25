const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res) {
    try {
      const isUser = await User.findOne({ email: req.body.email });
      if (isUser) {
        return res.status(400).json({ message: "user already exist" });
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        email: req.body.email,
        password: hash,
      });
      res.status(201).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }

  static async login(req, res) {
    try {
      const isUser = await User.findOne({ email: req.body.email });
      console.log(isUser)
      if (!isUser) {
        return res.status(400).json({ message: "user not found" });
      }
      const match = await bcrypt.compare(req.body.password, isUser.password);
      if (!match) {
        return res.status(401).json({ message: "wrong password" });
      }
      const exp = Date.now() + 1000 * 60 * 60;
      const token = jwt.sign(
        { id: isUser._id, exp, role: isUser.role },
        process.env.SECRET_KEY
      );
      res
        .cookie("Authorization", token)
        .status(200)
        .json({
          user: {
            email: isUser.email,
            _id: isUser._id,
            role: isUser.role,
            avatar:isUser.avatar || null
          },
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("Authorization");
      res.status(200).json({ message: "logged out" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }
}

module.exports = UserController;
