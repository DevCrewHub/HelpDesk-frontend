import React from "react";

const TicketTable = ({ tickets }) => {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 text-left">Ticket ID</th>
          <th className="p-2 text-left">Subject</th>
          <th className="p-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <tr key={ticket.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{ticket.id}</td>
              <td className="p-2">{ticket.subject}</td>
              <td className="p-2">{ticket.status}</td>
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