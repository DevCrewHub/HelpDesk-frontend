import { useEffect } from "react";
import { FaSignOutAlt, FaUser, FaUserTie } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MorePage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if(userRole !== "ADMIN"){
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <div className="bg-gray-100 border-b border-black text-center py-7">
        <h1 className="text-3xl font-semibold">Helpdesk</h1>
      </div>

      {/* Links */}
      <div className="flex flex-col">
        {userRole === "ADMIN" && (
          <>
            <button
              onClick={() => navigate("/admin/customers")}
              className="text-left justify-center px-8 py-5 border-b border-black"
            >
              <div className="flex gap-4 justify-content items-center">
              <FaUser className="w-4 h-4" />
              Customers
              </div>
            </button>

            <button
              onClick={() => navigate("/admin/agents")}
              className="text-left px-8 py-5 border-b border-black"
            >
              <div className="flex gap-4 justify-content items-center">
              <FaUserTie className="w-4 h-4" />
              Agents
              </div>
            </button>

            <button
              onClick={() => navigate("/admin/departments")}
              className="text-left px-8 py-5 border-b border-black"
            >
              <div className="flex gap-4 justify-content items-center">
              <MdApartment className="w-4 h-4" />
              Departments
              </div>
            </button>

            <button onClick={() => {
                localStorage.clear();
                navigate("/login");
              }} className="text-left px-8 py-5 text-red-500 border-b border-black">
              <div className="flex gap-4 justify-content items-center">
              <FaSignOutAlt className="w-4 h-4" />
              Logout
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MorePage;