import api from "../../utils/api";
import { toast } from "react-toastify";

const DeleteTicketButton = ({ ticketId, onDeleted }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await api.delete(`/customer/ticket/${ticketId}`);
      onDeleted?.(ticketId); // optional callback to refresh or remove from UI
      toast.success("Ticket deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete ticket.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
    >
      Delete
    </button>
  );
};

export default DeleteTicketButton;