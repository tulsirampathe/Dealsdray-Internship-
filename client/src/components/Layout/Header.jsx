import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../constants/config";
import { adminNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Header = () => {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const { data } = await axios.get(`${server}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(adminNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-blue-600">DEALSDRAY</div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:block text-gray-700">
            Welcome, {admin.f_userName}
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md transition hover:bg-red-600"
            title="Logout"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
