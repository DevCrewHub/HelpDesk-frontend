import api from "../../utils/api";
import { FaUserPlus } from "react-icons/fa";

const AssignTicketButton = ({ ticketId, onSuccess }) => {
  const assignTicket = async () => {
    try {
      await api.put(`/agent/tickets/${ticketId}/assign`);
      alert("Ticket assigned successfully.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error assigning ticket:", error);
      alert("Failed to assign ticket.");
    }
  };

  return (
    <button
      onClick={assignTicket}
      className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm"
    >
      <FaUserPlus className="mr-2" />
      Assign to Me
    </button>
  );
};

export default AssignTicketButton;