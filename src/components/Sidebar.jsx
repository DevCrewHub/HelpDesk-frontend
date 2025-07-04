import { useState, useRef } from "react";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../hooks/ClickOutside";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);

  useClickOutside(sidebarRef, () => setIsOpen(false)); // Collapses sidebar if clicked outside (optional)

  const fullName = localStorage.getItem("fullName") || "User";

  const handleCreateTicket = () => navigate("/create-ticket");
  const handleViewTickets = () => navigate("/tickets");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle for Mobile */}
      <button
        className="md:hidden p-2 m-2 text-gray-600 hover:text-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      {isOpen && (
        <aside
          ref={sidebarRef}
          className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col justify-between p-6 min-h-screen"
        >
          <div>
            <h1
              className="text-xl font-bold text-indigo-600 mb-8 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              HelpDesk
            </h1>
            <nav className="space-y-4">
              <button
                onClick={handleCreateTicket}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <GoPlusCircle className="w-5 h-5" />
                Create Ticket
              </button>

              <button
                onClick={handleViewTickets}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FiFileText className="w-5 h-5" />
                View Tickets
              </button>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUserCircle className="w-5 h-5" />
              <span className="text-sm truncate">{fullName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
