import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    f_userName: { type: String, required: true, unique: true },
    f_Pwd: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
