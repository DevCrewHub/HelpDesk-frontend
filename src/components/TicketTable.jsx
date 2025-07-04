import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TicketTable = ({ tickets }) => {
  const navigate = useNavigate();
  
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 text-left">Ticket ID</th>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Priority</th>
          <th className="p-2 text-left">Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <tr key={ticket.id} className="border-t border-gray-300 hover:bg-gray-50"
            onClick={() => navigate(`/ticket/${ticket.id}`)}
            >
              <td className="p-2">{ticket.id}</td>
              <td className="p-2">{ticket.title}</td>
              <td className="p-2">{ticket.status}</td>
              <td className="p-2">{ticket.priority}</td>
              <td className="p-2">{ticket.date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-2 text-center" colSpan="3">No tickets found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TicketTable;