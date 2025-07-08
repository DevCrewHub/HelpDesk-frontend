import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiFileText, FiUser } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { FaBook, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? true : stored === "true";
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      localStorage.setItem("sidebarOpen", !prev);
      return !prev;
    });
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar isOpenProp={isOpen} setIsOpenProp={toggleSidebar} />
      <div className="flex md:ml-64 flex-grow">{children}</div>
      {/* Mobile Bottom Nav (below md) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-40 shadow-sm">
        <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-sm text-gray-700">
          <FiUser className="w-5 h-5 mb-1" />
          Dashboard
        </button>

        <button onClick={() => navigate("/create-ticket")} className="flex flex-col items-center text-sm text-gray-700">
          <GoPlusCircle className="w-5 h-5 mb-1" />
          Create
        </button>

        <button onClick={() => navigate("/tickets")} className="flex flex-col items-center text-sm text-gray-700">
          <FiFileText className="w-5 h-5 mb-1" />
          Tickets
        </button>

        <button onClick={() => navigate("/knowledge")} className="flex flex-col items-center text-sm text-gray-700">
          <FaBook className="w-5 h-5 mb-1" />
          Knowledge
        </button>

        {userRole === "ADMIN" && (
          <button
            onClick={() => navigate("/agentregistration")}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <FaUserPlus className="w-5 h-5 mb-1" />
            Add Agent
          </button>
        )}

        <button onClick={() => {
            localStorage.clear();
            navigate("/login");
          }} className="flex flex-col items-center text-sm text-red-500">
          <FaSignOutAlt className="w-5 h-5 mb-1" />
          Logout
        </button>
      </div>
    </div>
  );
}
