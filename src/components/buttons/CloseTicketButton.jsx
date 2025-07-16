import api from "../../utils/api";
import { FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const CloseTicketButton = ({ ticketId, onSuccess }) => {

  const closeTicket = async () => {
    if (!window.confirm("Are you sure you want to close this ticket?")) return;

    try {
      await api.put(`/customer/tickets/${ticketId}/status`, null, {
        params: { status: "CLOSED" }
      });
      toast.success("Ticket closed successfully.");
      if(onSuccess) onSuccess();
    } catch (error) {
      console.error("Error closing ticket:", error);
      toast.error("Failed to close ticket. Please try again.");
    }
  };

  return (
    <button 
      onClick={closeTicket}
      className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm cursor-pointer"
    >
      <FaTimesCircle className="mr-1" /> Close Ticket
    </button>
  );
};

export default CloseTicketButton;
