import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const TicketTable = ({ tickets }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTickets = [...tickets].sort((a, b) => b.id - a.id);
  const currentTickets = sortedTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString).toLocaleDateString("en-CA");
    return date;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tickets]);

  const getStatusBadge = (status) => {
    const base = "text-xs font-semibold px-2 py-1 rounded-full";
    switch (status) {
      case "PENDING":
        return `${base} bg-blue-100 text-blue-700`;
      case "INPROGRESS":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "RESOLVED":
        return `${base} bg-green-100 text-green-700`;
      case "CLOSED":
        return `${base} bg-gray-200 text-gray-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getPriorityBadge = (priority) => {
    const base = "text-xs font-semibold px-2 py-1 rounded-full";
    switch (priority) {
      case "HIGH":
        return `${base} bg-red-100 text-red-700`;
      case "MEDIUM":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "LOW":
        return `${base} bg-gray-100 text-gray-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div>
      <div className="min-h-[220px] overflow-x-auto">
        <table className="min-w-full text-sm bg-white shadow rounded-lg border border-gray-300 ">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left">Ticket ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Agent</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.length > 0 ? (
              currentTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3">{ticket.id}</td>
                  <td className="px-4 py-3">{ticket.title}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(ticket.status)}>{ticket.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span>
                  </td>
                  <td className="px-4 py-3">{formatDate(ticket.createdDate)}</td>
                  <td className="px-4 py-3">
                    {ticket.agentName ? (
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                        {ticket.agentName}
                      </span>
                    ) : (
                      <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded inline-flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Unassigned
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-center text-gray-500" colSpan="6">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tickets.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TicketTable;
