import express from "express";
import { check } from "express-validator";
import {
  registerAdmin,
  loginAdmin,
  getMyProfile,
  logout,
} from "../controllers/authController.js";
import { authProtect } from "../middleware/authProtect.js";

const router = express.Router();

// Admin Registration
router.post(
  "/register",
  [
    check("f_userName", "Username is required").not().isEmpty(),
    check("f_Pwd", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registerAdmin
);

// Admin Login
router.post(
  "/login",
  [
    check("f_userName", "Username is required").not().isEmpty(),
    check("f_Pwd", "Password is required").not().isEmpty(),
  ],
  loginAdmin
);

// get Admin
router.get("/me", authProtect, getMyProfile);

// admin logout
router.get("/logout", authProtect, logout);

export default router;
