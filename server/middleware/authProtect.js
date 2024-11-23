import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authProtect = async (req, res, next) => {
  try {
    const token = req.cookies.admin_jwt;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-f_Pwd");
    

    if (!admin) {
      return res.status(401).json({ success: false, message: "Not authorized, admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired, please log in again"
        : "Not authorized, token failed";
    res.status(401).json({ success: false, message });
  }
};
