import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AssignAgentModal = ({ ticketId, onClose, ticket}) => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/agents")
      .then(res => setAgents(res.data))
      .catch(() => alert("Failed to load agents."));
  }, []);

  const handleAssign = async (agentId) => {
    try {
      await api.put(`/admin/tickets/${ticketId}/assign`, null, {
        params: { agentId: agentId}
      });
      alert("Ticket assigned successfully");
      navigate("/dashboard");
      onClose();
    } catch (err) {
      alert("Assignment failed.");
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.departmentName === ticket.departmentName &&
    (agent.fullName.toLowerCase().includes(search.toLowerCase()) ||
    agent.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Assign Ticket</h2>

        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
        />

        <ul className="max-h-60 overflow-y-auto space-y-2">
          {filteredAgents.map((agent) => (
            <li key={agent.id} className="flex justify-between items-center border p-2 rounded hover:bg-gray-50">
              <div>
                <p className="font-medium">{agent.fullName}</p>
                <p className="text-sm text-gray-500">{agent.email}</p>
              </div>
              <button
                onClick={() => handleAssign(agent.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Assign
              </button>
            </li>
          ))}
          {filteredAgents.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-2">No agents found</p>
          )}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignAgentModal;
