import React, { useState } from "react";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
import { useDeleteEmpMutation } from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";

const EmployeeTable = ({ onEdit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees } = useSelector((state) => state.auth);
  const [deleteEmp, deleteStatus] = useDeleteEmpMutation(); // Use delete mutation

  useMutationToast({
    ...deleteStatus,
    loadingMessage: "Deleting employee....",
  });

  // Filter employees based on the search query
  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.f_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.f_Mobile.includes(searchQuery) ||
      employee.f_Designation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.f_Course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmp({ id }).unwrap();
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Header with Search and Total Count */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Employee List</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="text-gray-600 font-medium">
            Total Employees:{" "}
            <span className="text-blue-600 font-bold">
              {filteredEmployees?.length}
            </span>
          </span>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Unique Id</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Create Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.map((employee, i) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 relative">
                  <div className="relative group">
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(
                        employee.f_Image.data
                      ).toString("base64")}`}
                      alt="Profile"
                      className="w-24 h-24 rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-150 group-hover:z-10"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">{employee.f_Name}</td>
                <td className="px-4 py-2">{employee.f_Email}</td>
                <td className="px-4 py-2">{employee.f_Mobile}</td>
                <td className="px-4 py-2">{employee.f_Designation}</td>
                <td className="px-4 py-2">{employee.f_gender}</td>
                <td className="px-4 py-2">{employee.f_Course}</td>
                <td className="px-4 py-2">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(employee)} // Trigger edit
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)} // Trigger delete
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                      disabled={deleteStatus.isLoading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Employees Found */}
      {filteredEmployees?.length === 0 && (
        <div className="mt-6 text-center text-gray-600">
          No employees match your search.
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
