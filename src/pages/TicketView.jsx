import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/SidebarLayout";
import api from "../utils/api";
import CloseTicketButton from "../components/buttons/CloseTicketButton";
import AssignTicketButton from "../components/buttons/AssignTicketButton";
import CommentSection from "../components/CommentSection";

import { FaCheck } from "react-icons/fa";
import AssignAgentModal from "../components/modal/AssignAgentModal";
import DeleteTicketButton from "../components/buttons/DeleteTicketButton";

const TicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const isAgent = userRole === "AGENT";
  const isCustomer = userRole === "CUSTOMER";
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    const url = isAgent ? `/agent/ticket/${id}` : isCustomer ? `/customer/ticket/${id}` : `/admin/ticket/${id}`;
    api.get(url).then((res) => {
      setTicket(res.data);
    });
  }, [id, isAgent]);

  const fetchTicketDetails = () => {
    return ticket;
  };

  const reDirect = async () => {
    navigate("/dashboard");
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  const handleStatusChange = () => {
    api
      .put(`/agent/assigned/tickets/${id}/status`, null, {
        params: { status: "RESOLVED" },
      })
      .then(() => {
        setTicket((prev) => ({ ...prev, status: "RESOLVED" }));
        alert("Ticket marked as RESOLVED.");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update ticket status.");
      });
  };

  const handlePriorityChange = (newPriority) => {
    api
      .put(`/agent/assigned/tickets/${id}/priority`, null, {
        params: { priority: newPriority },
      })
      .then(() => {
        setTicket((prev) => ({ ...prev, priority: newPriority }));
        alert(`Ticket marked as ${newPriority}`);
        navigate("/dashboard");
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
        <div className="flex flex-grow flex-col justify-between px-6 py-2 bg-gray-50">
          <div>
            <div className="text-2xl -mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
              <div className="px-6 pb-2">
                <span
                  onClick={() => navigate("/tickets")}
                  className="hover:underline cursor-pointer"
                >
                  Tickets
                </span>{" "}/
                <span className="font-medium"> {ticket.title}</span>
              </div>
            </div>

            {/* Ticket Info Container */}
            <div className="bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">#{ticket.id} {ticket.title}</h1>
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  {isAgent ? (
                    <>
                      {ticket.status === "PENDING" && ticket.agentName == null && (
                        <AssignTicketButton
                          ticketId={ticket.id}
                          onSuccess={fetchTicketDetails}
                        />
                      )}

                      {userRole === "AGENT" &&
                        ticket.status === "INPROGRESS" &&
                        ticket.agentId === Number(userId) && (
                          <button
                            onClick={() => handleStatusChange()}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center"
                          >
                            <FaCheck className="mr-1" /> Mark as Resolved
                          </button>
                        )}

                      {(ticket.customerId === Number(userId) || ticket.agentId === Number(userId)) ? (
                        <select
                          value={ticket.priority}
                          onChange={(e) => handlePriorityChange(e.target.value)}
                          className="bg-gray-200 text-gray-700 border border-gray-300 px-3 py-1 rounded text-sm"
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                        </select>
                      ) : (
                        <span className="bg-gray-200 text-gray-700 border border-gray-300 px-3 py-1 rounded text-sm">{ticket.priority}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <span
                        className={`px-2 py-0.5 rounded text-sm ${
                          ticket.status === "OPEN"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200"
                        }`}
                      >
                        {ticket.status}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-sm ${
                          ticket.priority === "HIGH"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                      <span>
                        {ticket.status !== "CLOSED" && isCustomer ? (
                          <CloseTicketButton
                            ticketId={ticket.id}
                            onSuccess={reDirect}
                          />
                        ) : (
                          ""
                        )}
                      </span>
                      <span>
                        {
                          isCustomer ? 
                          <div>
                            <DeleteTicketButton ticketId={ticket.id} onDeleted={() => navigate('/tickets')}/>
                          </div>
                          :
                          ""
                        }
                      </span>
                      <span>
                      {
                        isAdmin && ticket.agentName === null ?
                        <div>
                          <button
                            className="bg-indigo-600 text-white px-2 py-0.5 text-sm rounded hover:bg-indigo-700"
                            onClick={() => setShowModal(true)}
                          >
                            Assign to Agent
                          </button>

                          {showModal && (
                            <AssignAgentModal
                              ticketId={ticket.id}
                              ticket = {ticket}
                              onClose={() => setShowModal(false)}
                            />
                          )}
                        </div>
                        : ""
                      }
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div><strong>Created:</strong> {formatDate(ticket.createdDate)}</div>
                <div><strong>Assigned To:</strong> {ticket.agentName || "UnAssigned"}</div>
                <div><strong>Department:</strong> {ticket.departmentName}</div>
              </div>
            </div>

            <CommentSection ticketId={ticket.id} ticket={ticket} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketView;
