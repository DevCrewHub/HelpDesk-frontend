import { CheckCircle, Trash2 } from "lucide-react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow hover:shadow-md">
      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-semibold">{ticket.title}</h3>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{ticket.status}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{ticket.description}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Priority: {ticket.priority}</span>
        <span>Department: {ticket.department}</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> Resolved
        </button>
        <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;