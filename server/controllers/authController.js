import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { validationResult } from "express-validator";

const generateToken = ({ id, username }) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Admin Registration
export const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { f_userName, f_Pwd } = req.body;

  try {
    const existingUser = await Admin.findOne({ f_userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(f_Pwd, 10);
    const newAdmin = new Admin({ f_userName, f_Pwd: hashedPassword });
    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { f_userName, f_Pwd } = req.body;

  try {
    const admin = await Admin.findOne({ f_userName });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(f_Pwd, admin.f_Pwd);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken({ id: admin._id, username: admin.f_userName });
    res.cookie("admin_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: `Welcome Back, ${admin.f_userName}`,
      admin
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getMyProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  res.status(200).json({
    success: true,
    admin,
  });
};

export const logout = async (req, res) => {
  return res.status(200).cookie("admin_jwt", "").json({
    success: true,
    message: "Logged out successfully",
  });
};
