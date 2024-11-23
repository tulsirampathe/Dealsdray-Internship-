// src/App.jsx
import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddEditEmployeeForm from "./components/Dashboard/AddEditEmployeeForm";
import EmployeeTable from "./components/Dashboard/EmployeeTable";
import Header from "./components/Layout/Header";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProtectRoute from "./components/Auth/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "./constants/config";
import { adminExists, adminNotExists } from "./redux/reducers/auth";

function App() {
  const { admin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/auth/me`, { withCredentials: true })
      .then(({ data }) => dispatch(adminExists(data.admin)))
      .catch((err) => dispatch(adminNotExists()));
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute user={admin} />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectRoute user={!admin} redirect="/">
              <LoginPage />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
