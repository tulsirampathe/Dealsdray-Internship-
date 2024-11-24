# **Dealsdray Internship - MERN Machine Test**

This repository contains the submission for the MERN Machine Test project, developed as part of the selection process for the internship at Dealsdray. The project demonstrates the use of the MERN stack (MongoDB, Express.js, React.js, Node.js) with robust functionality and a responsive design.

---

## **Features**

- **Full-Stack Application**: Built using the MERN stack for efficient handling of both frontend and backend requirements.
- **CRUD Operations**: Seamlessly manage data with Create, Read, Update, and Delete functionalities.
- **Responsive Design**: Ensures the application works well on both desktop and mobile devices.
- **Error Handling**: Comprehensive error handling with toast notifications using React Hot Toast.
- **File Upload**: Includes file upload functionality for employee profile images.
- **State Management**: Implemented with Redux Toolkit for consistent and scalable state management.

---

## **Technologies Used**

### **Frontend**
- React.js
- Tailwind CSS
- Redux Toolkit
- React Hot Toast

### **Backend**
- Node.js
- Express.js
- MongoDB (Database)
- Multer (File Uploads)
- JWT (JSON Web Tokens) for Authentication

---

## **Setup Instructions**

To run this project locally, follow these steps:

### **1. Clone the Repository**

```bash
git clone https://github.com/tulsirampathe/Dealsdray-Internship-.git
cd Dealsdray-Internship-
```
### **2. Install Dependencies**
#Backend (Node.js)
```bash
cd server
npm install
```

#Frontend (React.js)
```bash
cd client
npm install
```

### **3.  Set Up Environment Variables**
Create a .env file in the root directory for the backend with the following variables:
```env
MONGO_URI=<Your MongoDB Connection String>
PORT=5000
JWT_SECRET=<Your JWT Secret>
```
### **4.  Start the Application**
#Backend (Node.js)
```bash
npm start
```

#Frontend (React.js)
```bash
npm run dev
```
