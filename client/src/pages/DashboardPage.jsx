import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddEditEmployeeForm from "../components/Dashboard/AddEditEmployeeForm";
import EmployeeTable from "../components/Dashboard/EmployeeTable";
import Header from "../components/Layout/Header";
import { useEmpDataQuery } from "../redux/api/api";
import { setData } from "../redux/reducers/auth";

const DashboardPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [employees, setEmployees] = useState([]);

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useEmpDataQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setData(data?.employees));
      setEmployees(data?.employees);
    }
  }, [isSuccess, data?.employees]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedEmployee(null);
    setIsFormOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Main Dashboard Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8 bg-gray-50 overflow-auto">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-gray-800">
                Admin Dashboard
              </h1>
              <button
                onClick={handleAddEmployee}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md transition hover:bg-blue-700"
              >
                + Add Employee
              </button>
            </div>

            {/* Employee List Section */}
            <div className="mt-8">
              {isLoading ? (
                // Loading Spinner
                <div className="flex justify-center items-center h-64 bg-white shadow rounded-lg">
                  <div className="flex flex-col items-center">
                    <svg
                      className="animate-spin h-12 w-12 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <p className="mt-4 text-gray-500">Loading employees...</p>
                  </div>
                </div>
              ) : employees?.length === 0 ? (
                <div className="text-center py-20 bg-white shadow rounded-lg">
                  <p className="text-gray-500">
                    No employees. Start by adding a new employee!
                  </p>
                  <button
                    onClick={handleAddEmployee}
                    className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg transition hover:bg-green-600"
                  >
                    Add Employee
                  </button>
                </div>
              ) : (
                <div className="">
                  <EmployeeTable
                    onEdit={handleEditEmployee}
                    employees={employees}
                  />
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Add/Edit Employee Modal */}
        <AddEditEmployeeForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          employee={selectedEmployee}
        />
      </div>
    </>
  );
};

export default DashboardPage;
