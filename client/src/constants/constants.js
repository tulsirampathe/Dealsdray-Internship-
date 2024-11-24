import { Buffer } from "buffer";

export const data = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    designation: "Software Engineer",
    gender: "Male",
    course: "Computer Science",
    createdAt: "2024-11-21",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+0987654321",
    designation: "Product Manager",
    gender: "Female",
    course: "Business Administration",
    createdAt: "2024-11-19",
  },
  // Add more entries as needed
];

export const dataFields = [
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
];

export const getImageSrc = (imag) => {
  if (imag && imag.data) {
    const base64Image = Buffer.from(imag.data).toString("base64");
    return `data:${imag.contentType};base64,${base64Image}`;
  }
  return null;
};

export const validate = (formData) => {
  const errors = {};

  if (!formData.f_Name.trim()) {
    errors.f_Name = "Name is required.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;

  if (!formData.f_Email.trim() || !emailRegex.test(formData.f_Email)) {
    errors.f_Email = "Valid email is required.";
  }

  if (!formData.f_Mobile.trim() || !/^\d{10}$/.test(formData.f_Mobile)) {
    errors.f_Mobile = "Valid 10-digit mobile number is required.";
  }

  if (!formData.f_Designation.trim()) {
    errors.f_Designation = "Designation is required.";
  }

  if (!formData.f_gender) {
    errors.f_gender = "Gender is required.";
  }

  if (!formData.f_Course || formData.f_Course.length === 0) {
    errors.f_Course = "Course is required.";
  }

  return errors;
};
