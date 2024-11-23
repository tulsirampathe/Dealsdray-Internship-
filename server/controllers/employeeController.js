import Employee from "../models/Employee.js";

// Get All Employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Add Employee
export const addEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

    console.log(req.body);
    

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPG and PNG files are allowed",
      });
    }

    const f_Image = file.buffer;

    const newEmployee = new Employee({
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Edit Employee
export const editEmployee = async (req, res) => {
  const { id } = req.params;

  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  try {
    const file = req.file;
    let f_Image;

    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Only JPG and PNG files are allowed",
        });
      }
      f_Image = file.buffer;
    }

    const updateFields = {
      ...(f_Image && { f_Image }),
      ...(f_Name && { f_Name }),
      ...(f_Email && { f_Email }),
      ...(f_Mobile && { f_Mobile }),
      ...(f_Designation && { f_Designation }),
      ...(f_gender && { f_gender }),
      ...(f_Course && { f_Course }),
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete emp
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
