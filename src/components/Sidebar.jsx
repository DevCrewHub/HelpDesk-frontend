import { memo, useMemo, useRef } from "react";
import { FaSignOutAlt, FaUserCircle, FaUser, FaBook, FaUserPlus, FaUserCheck, FaUserTie,} from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { FiFileText, FiUser } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const fullName = useMemo(() => localStorage.getItem("userName") || "User", []);
  const userRole = useMemo(() => localStorage.getItem("userRole"), []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

 const isActive = (path) => {
  if (path === "/dashboard" && location.pathname === "/") return "bg-indigo-100 text-indigo-700";
  if (path === "/tickets" && (location.pathname.startsWith("/tickets") || location.pathname.startsWith("/ticket/"))) {
    return "bg-indigo-100 text-indigo-700";
  }
  return location.pathname === path
    ? "bg-indigo-100 text-indigo-700"
    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600";
};

  return (
    <div className="hidden md:flex overflow-x-hidden fixed top-0 left-0 h-full w-64 z-40">
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
          <nav className={`space-y-3 ${userRole === "ADMIN" ? "text-sm" : ""}`}>
            <button
              onClick={() => navigate("/dashboard")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/","/dashboard")}`}
            >
              <FiUser className="w-4 h-4" />
              Dashboard
            </button>

            {userRole === "CUSTOMER" && (
              <button
                onClick={() => navigate("/create-ticket")}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/create-ticket")}`}
              >
                <GoPlusCircle className="w-4 h-4" />
                Create Ticket
              </button>
            )}

            {userRole === "AGENT" && (
              <button
                onClick={() => navigate("/assigned-tickets")}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/assigned-tickets")}`}
              >
                <FaUserCheck className="w-4 h-4" />
                Assigned To Me
              </button>
            )}

            <button
              onClick={() => navigate("/tickets")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/tickets")}`}
            >
              <FiFileText className="w-4 h-4" />
              View Tickets
            </button>

            {userRole === "CUSTOMER" && (
              <button
                onClick={() => navigate("/knowledge")}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/knowledge")}`}
              >
                <FaBook className="w-4 h-4" />
                Knowledge Base
              </button>
            )}

            {userRole === "ADMIN" && (
              <>
                <button
                  onClick={() => navigate("/admin/customers")}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/admin/customers")}`}
                >
                  <FaUser className="w-4 h-4" />
                  View Customers
                </button>

                <button
                  onClick={() => navigate("/admin/agents")}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/admin/agents")}`}
                >
                  <FaUserTie className="w-4 h-4" />
                  View Agents
                </button>

                <button
                  onClick={() => navigate("/admin/departments")}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/admin/departments")}`}
                >
                  <FaUserTie className="w-4 h-4" />
                  Departments
                </button>

                <button
                  onClick={() => navigate("/admin/agentregistration")}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive("/admin/agentregistration")}`}
                >
                  <FaUserPlus className="w-4 h-4" />
                  Add Agent
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <FaUserCircle className="w-5 h-5" />
            <span className="text-sm truncate">{fullName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default memo(Sidebar);
