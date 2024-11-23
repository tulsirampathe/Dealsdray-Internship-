// src/components/Layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">EMS Admin</div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition duration-200"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition duration-200"
            >
              <FaUsers className="mr-3" />
              Employees
            </Link>
          </li>
          <li>
            <Link
              to="/add-employee"
              className="flex items-center px-4 py-2 hover:bg-gray-700 transition duration-200"
            >
              <FaUserPlus className="mr-3" />
              Add Employee
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
