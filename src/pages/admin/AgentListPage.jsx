import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

const ITEMS_PER_PAGE = 4;

const AgentListPage = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [currentPage, setCurrentPage] = useState(1);
  const currentAgents = agents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if(userRole !== "ADMIN"){
      navigate("/");
    }
  }, [navigate]);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this agent?");
    if (!confirm) return;
    try {
      await api.delete(`/admin/agents/${id}`);
      toast.success("Agent deleted successfully");
      fetchAgents(); // refresh list
    } catch (err) {
      toast.error("Failed to delete agent");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="flex-grow px-6 py-2">
      {/* Page Header */}
      <div className="-mx-6 border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 mt-2 pb-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight  pb-2 px-6">All Agents</h1>
      </div>

      {/* Subtext */}
      <p className="text-gray-600 text-sm mb-5 px-1">Manage support agents</p>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-300">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-center text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((a) => (
              <tr
                key={a.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-3 border-r border-gray-100 font-medium text-gray-800">
                  {a.fullName}
                </td>
                <td className="px-6 py-3 border-r border-gray-100 text-gray-700">{a.email}</td>
                <td className="px-6 py-3 border-r border-gray-100 text-gray-700">
                  {a.departmentName}
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-300 rounded transition duration-200 cursor-pointer"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {agents.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">No agents found.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(agents.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AgentListPage;
