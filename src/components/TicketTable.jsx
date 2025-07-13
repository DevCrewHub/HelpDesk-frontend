import React, { useState, useEffect } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TicketTable = ({ tickets }) => {
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const formatDate = (isoString) => {
    const date = new Date(isoString).toLocaleDateString("en-CA");
    return date;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tickets]);

  return (
    <div>
      <div className="min-h-[220px]">
      <table className="min-w-full text-sm text-left bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Ticket ID</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              >
                <td className="p-2">{ticket.id}</td>
                <td className="p-2">{ticket.title}</td>
                <td className="p-2">{ticket.status}</td>
                <td className="p-2">{ticket.priority}</td>
                <td className="p-2">{formatDate(ticket.createdDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 text-center" colSpan="5">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {<FaAngleLeft />}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {<FaAngleRight />}
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
