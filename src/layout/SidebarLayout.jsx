import React, { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { FiFileText, FiUser } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { FaBars, FaBook, FaHamburger, FaSignOutAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const userRole = useMemo(() => localStorage.getItem("userRole"), []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex md:ml-64 flex-grow pb-16 md:pb-0"><Outlet /></div>
      {/* Mobile Bottom Nav (below md) */}
      <div className="fixed bottom-0 left-0 w-full text-[11px] bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-40 shadow-sm">
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
          <>
          <button
            onClick={() => navigate("/agentregistration")}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <FaUserPlus className="w-5 h-5 mb-1" />
            Add Agent
          </button>

          <button
            onClick={() => navigate("/more")}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <FaBars className="w-5 h-5 mb-1" />
            More
          </button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Layout);