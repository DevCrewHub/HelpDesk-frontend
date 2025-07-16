import api from "../../utils/api";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const AssignTicketButton = ({ ticketId, onSuccess }) => {
  const assignTicket = async () => {
    try {
      await api.put(`/agent/tickets/${ticketId}/assign`);
      toast.success("Ticket assigned successfully.");
      if (onSuccess) onSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Error assigning ticket:", error);
      toast.error("Failed to assign ticket.");
    }
  };

  return (
    <button
      onClick={assignTicket}
      className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm cursor-pointer"
    >
      <FaUserPlus className="mr-2" />
      Assign to Me
    </button>
  );
};

export default AssignTicketButton;