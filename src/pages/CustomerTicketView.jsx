import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layout/SidebarLayout";
import api from "../utils/api";

const CustomerTicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/customer/ticket/${id}`).then((res) => setTicket(res.data));
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">

        {/* Ticket Header */}
        <div className="border rounded shadow p-4 bg-white space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-mono text-gray-600">TK-{ticket.id}</div>
            <div className="flex gap-2">
              <span className={`px-2 py-0.5 rounded text-xs ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-200'}`}>
                {ticket.status}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {ticket.priority}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold">{ticket.title}</h2>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <div>👤 Customer: {ticket.customerName}</div>
            <div>🕒 Created: {ticket.createdAt}</div>
          </div>

          <div className="mt-4 flex justify-end">
            {ticket.status !== "CLOSED" && (
              <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => alert("Close ticket API")}>
                Close Ticket
              </button>
            )}
          </div>
        </div>

        {/* Ticket Description */}
        <div className="bg-white border rounded shadow p-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-700">{ticket.description}</p>
        </div>

        {/* Conversation Placeholder */}
        <div className="bg-white border rounded shadow p-4">
          <h3 className="font-medium mb-2">Conversation</h3>
          <p className="text-gray-500">No messages yet.</p>
        </div>

      </div>
    </Layout>
  );
};

export default CustomerTicketView;

