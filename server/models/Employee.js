import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    f_Image: { type: Buffer, required: true },
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true, unique: true },
    f_Mobile: { type: String, required: true, match: /^\d{10}$/ },
    f_Designation: {
      type: String,
      required: true,
      enum: ["HR", "Manager", "Sales"],
    },
    f_gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    f_Course: {
      type: [String],
      required: true,
      enum: ["MCA", "BCA", "BSC"],
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
