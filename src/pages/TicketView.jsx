import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/SidebarLayout";
import api from "../utils/api";
import CloseTicketButton from "../components/buttons/CloseTicketButton";
import AssignTicketButton from "../components/buttons/AssignTicketButton";
import { FaCheck } from "react-icons/fa";

const TicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  // Detect Role
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  const isAgent = userRole === "AGENT";

  useEffect(() => {
    const url = isAgent ? `/agent/ticket/${id}` : `/customer/ticket/${id}`;
    api.get(url).then((res) => {
      setTicket(res.data);
    });
  }, [id, isAgent]);

  const fetchTicketDetails = () => {
    return ticket;
  }

  const reDirect = async () => {
      navigate("/dashboard"); // Redirect
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  const handleStatusChange = () => {
    api.put(`/agent/assigned/tickets/${id}/status`, null, {
        params: { status: "RESOLVED" }
    })
    .then(() => {
      setTicket((prev) => ({ ...prev, status: newStatus }));
      alert("Ticket marked as RESOLVED.");
      navigate('/dashboard');
    })
    .catch((error) => {
      console.error("Error updating status:", error);
      alert("Failed to update ticket status.");
    });
  };

  const handlePriorityChange = (newPriority) => {
    api.put(`/agent/assigned/tickets/${id}/priority`, null, {
        params: { priority: newPriority }
    })
    .then(() => {
      setTicket((prev) => ({ ...prev, priority: newPriority }));
      alert(`Ticket marked as ${newPriority}`);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.error("Error updating priority:", error);
      alert("Failed to update ticket priority.");
    });
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="flex flex-grow min-h-screen">
        
        {/* Middle Section */}
        <div className="flex flex-grow flex-col justify-between px-6 py-2 bg-gray-50">
          
          <div>
            {/* Header */}
            <div className="text-2xl -mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
              <div className="px-6 pb-2">
                <span onClick={() => navigate('/tickets')} className="hover:underline cursor-pointer">Tickets</span> / 
                <span className="font-medium"> {ticket.title}</span>
              </div>
            </div>

            {/* Ticket Title & Status */}
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl font-bold">#{ticket.id} {ticket.title}</h1>
              
              <div className="flex gap-2">
                {isAgent ? (
                  <>
                    {ticket.status === "PENDING" && ticket.agentName == null && (
                      <AssignTicketButton ticketId={ticket.id} onSuccess={fetchTicketDetails} />
                    )}

                    {userRole === "AGENT" && ticket.status === "INPROGRESS" && ticket.agentName === userName && (
                      <button
                        onClick={() => handleStatusChange()}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center"
                      >
                        <FaCheck className="mr-1" /> Mark as Resolved
                      </button>
                    )}

                    <select
                      value={ticket.priority}
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      className="bg-gray-200 text-gray-700 border border-gray-300 px-3 py-1 rounded text-sm"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </>
                ) : (
                  <>
                    <span className={`px-2 py-0.5 rounded text-sm ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-200'}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-sm ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ticket.priority}
                    </span>
                    <span>
                      {ticket.status !== "CLOSED" ? <CloseTicketButton ticketId={ticket.id} onSuccess={reDirect} /> : ""}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4 ">
              {/* Created Date */}
              <div className="text-sm text-gray-500 mb-2">
                Created: {formatDate(ticket.createdDate)}
              </div>

              <div className="text-sm text-gray-500 mb-2">
                Assigned To: {ticket.agentName || "UnAssigned"}
              </div>

              <div className="text-sm text-gray-500 mb-6">
                Department: {ticket.departmentName}
              </div>
            </div>

            {/* Conversation Card */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-medium mb-2">Conversation</h3>
              <p className="text-gray-500">No messages yet.</p>
            </div>

          </div>

          {/* Message Input */}
          <div>
            <div className="pb-4">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full border border-gray-300 bg-gray-100 px-4 py-2 rounded focus:outline-none"
              />
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default TicketView;
