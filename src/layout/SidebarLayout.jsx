import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiFileText, FiUser } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { FaBook, FaSignOutAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { MdApartment } from "react-icons/md";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = useMemo(() => localStorage.getItem("userRole"), []);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex md:ml-64 flex-grow"><Outlet /></div>
      {/* Mobile Bottom Nav (below md) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-40 shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-sm text-gray-700">
          <FiUser className="w-5 h-5 mb-1" />
          Dashboard
        </button>

        {userRole === "CUSTOMER" && (
          <button onClick={() => navigate("/create-ticket")} className="flex flex-col items-center text-sm text-gray-700">
            <GoPlusCircle className="w-5 h-5 mb-1" />
            Create
          </button>
        )}

        {userRole === "AGENT" && (
          <button onClick={() => navigate("/assigned-tickets")} className="flex flex-col items-center text-sm text-gray-700">
            <FaUserCheck className="w-5 h-5 mb-1" />
            Assigned
          </button>
        )}

        <button onClick={() => navigate("/tickets")} className="flex flex-col items-center text-sm text-gray-700">
          <FiFileText className="w-5 h-5 mb-1" />
          Tickets
        </button>

        {userRole === "CUSTOMER" && 
        <button onClick={() => navigate("/knowledge")} className="flex flex-col items-center text-sm text-gray-700">
          <FaBook className="w-5 h-5 mb-1" />
          Knowledge
        </button>}

        {userRole === "ADMIN" && (
          <button
            onClick={() => navigate("/admin/departments")}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <MdApartment className="w-5 h-5 mb-1" />
            Departments
          </button>
        )}

        {userRole === "ADMIN" && (
          <button
            onClick={() => navigate("/admin/agentregistration")}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <FaUserPlus className="w-5 h-5 mb-1" />
            Add Agent
          </button>
        )}

        <button onClick={() => {
            localStorage.clear();
            navigate("/login");
          }} className="flex flex-col items-center text-sm text-red-500 cursor-pointer">
          <FaSignOutAlt className="w-5 h-5 mb-1" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default React.memo(Layout);