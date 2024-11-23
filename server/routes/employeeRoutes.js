import express from "express";
import multer from "multer";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
} from "../controllers/employeeController.js";
import { authProtect } from "../middleware/authProtect.js";

const router = express.Router();
const upload = multer();

// Get All Employees
router.get("/", authProtect, getAllEmployees);

// Add Employee
router.post("/add", authProtect, upload.single("f_Image"), addEmployee);

// Edit Employee
router.put("/edit/:id", authProtect, upload.single("f_Image"), editEmployee);

//  Delete Employee
router.delete("/delete/:id", authProtect, deleteEmployee);

export default router;
