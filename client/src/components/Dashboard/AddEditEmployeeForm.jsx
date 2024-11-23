/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Buffer } from "buffer";

import useMutationToast from "../../hooks/useMutationToast";
import { useAddEmpMutation, useEditEmpMutation } from "../../redux/api/api";

const getImageSrc = (imag) => {
  if (imag && imag.data) {
    const base64Image = Buffer.from(imag.data).toString("base64");
    return `data:${imag.contentType};base64,${base64Image}`;
  }
  return null;
};

const AddEditEmployeeForm = ({ isOpen, onClose, employee }) => {
  const [selectImg, setSelectImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
  });
  const [formErrors, setFormErrors] = useState({}); // For validation errors

  useEffect(() => {
    if (employee) {
      setFormData({
        f_Name: employee.f_Name || "",
        f_Email: employee.f_Email || "",
        f_Mobile: employee.f_Mobile || "",
        f_Designation: employee.f_Designation || "",
        f_gender: employee.f_gender || "",
        f_Course: employee.f_Course || [],
      });
      setSelectImg(getImageSrc(employee.f_Image));
    } else {
      setFormData({
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_gender: "",
        f_Course: [],
      });
      setSelectImg(null);
      setSelectedFile(null);
    }
  }, [employee]);

  const [addEmp, addEmpStatus] = useAddEmpMutation();
  const [editEmp, editEmpStatus] = useEditEmpMutation();

  useMutationToast({
    ...addEmpStatus,
    loadingMessage: "Adding new employee....",
  });

  useMutationToast({
    ...editEmpStatus,
    loadingMessage: "Updating employee....",
  });

  const validate = () => {
    const errors = {};
    if (!formData.f_Name.trim()) errors.f_Name = "Name is required.";
    if (!formData.f_Email.trim() || !/\S+@\S+\.\S+/.test(formData.f_Email))
      errors.f_Email = "Valid email is required.";
    if (!formData.f_Mobile.trim() || !/^\d{10}$/.test(formData.f_Mobile))
      errors.f_Mobile = "Valid 10-digit mobile number is required.";
    if (!formData.f_Designation.trim())
      errors.f_Designation = "Designation is required.";
    if (!formData.f_gender) errors.f_gender = "Gender is required.";
    if (formData.f_Course.length === 0) errors.f_Course = "Course is required.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "f_Course") {
      // Handle checkbox group for courses
      const updatedCourses = formData.f_Course.includes(value)
        ? formData.f_Course.filter((course) => course !== value)
        : [...formData.f_Course, value];
      setFormData({ ...formData, [name]: updatedCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({}); // Clear errors if valid

    const data = new FormData();
    data.append("f_Name", formData.f_Name);
    data.append("f_Email", formData.f_Email);
    data.append("f_Mobile", formData.f_Mobile);
    data.append("f_Designation", formData.f_Designation);
    data.append("f_gender", formData.f_gender);
    data.append("f_Course", formData.f_Course); 
    if (selectedFile) {
      data.append("f_Image", selectedFile);
    }
    
    // console.log(formData.f_Course.join(", ").split(", "))

    try {
      if (employee) {
        // Edit action
        const response = await editEmp({ id: employee._id, data });
        if (response.error) throw new Error(response.error.data.message);
      } else {
        // Add action
        const response = await addEmp(data);
        if (response.error) throw new Error(response.error.data.message);
      }
      onClose();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while submitting the form."
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_gender: "",
      f_Course: [],
    });
    setFormErrors({});
    setSelectImg(null);
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            {
              label: "Name",
              name: "f_Name",
              type: "text",
              placeholder: "Enter Name",
            },
            {
              label: "Email",
              name: "f_Email",
              type: "email",
              placeholder: "Enter Email",
            },
            {
              label: "Mobile",
              name: "f_Mobile",
              type: "tel",
              placeholder: "Enter Mobile",
            },
            {
              label: "Designation",
              name: "f_Designation",
              type: "select",
              placeholder: "Select Designation",
              options: ["HR", "Manager", "Sales"],
            },
            {
              label: "Course",
              name: "f_Course",
              type: "checkbox",
              options: ["MCA", "BCA", "BSC"],
            },
          ].map(({ label, name, type, placeholder, options }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : type === "checkbox" ? (
                options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={name}
                      value={option}
                      checked={formData.f_Course.includes(option)}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <label className="text-gray-700">{option}</label>
                  </div>
                ))
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              )}
              {formErrors[name] && (
                <p className="text-red-500 text-sm">{formErrors[name]}</p>
              )}
            </div>
          ))}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="f_gender"
                  value="Male"
                  checked={formData.f_gender === "Male"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="f_gender"
                  value="Female"
                  checked={formData.f_gender === "Female"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Female
              </label>
            </div>
            {formErrors.f_gender && (
              <p className="text-red-500 text-sm">{formErrors.f_gender}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {selectImg && (
              <div className="mt-2">
                <img
                  src={selectImg}
                  alt="Selected Image"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              {employee ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEmployeeForm;
