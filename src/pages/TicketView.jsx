import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../utils/api";
import { toast } from "react-toastify";

import CloseTicketButton from "../components/buttons/CloseTicketButton";
import AssignTicketButton from "../components/buttons/AssignTicketButton";
import CommentSection from "../components/CommentSection";
import AssignAgentModal from "../components/modal/AssignAgentModal";
import DeleteTicketButton from "../components/buttons/DeleteTicketButton";

import { FaCheck } from "react-icons/fa";

const TicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const isAgent = userRole === "AGENT";
  const isCustomer = userRole === "CUSTOMER";
  const isAdmin = userRole === "ADMIN";
  const isAssigned = ticket?.agentId === Number(userId);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const url = isAgent
          ? `/agent/ticket/${id}`
          : isCustomer
          ? `/customer/ticket/${id}`
          : `/admin/ticket/${id}`;

        const res = await api.get(url);
        setTicket(res.data);
      } catch (err) {
        console.error("Ticket not found", err);
        alert("Invalid Ticket");
        setTicket(null);
        navigate("/");
      }
    };

    fetchTicket();
  }, [id, isAgent, isCustomer, navigate]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  const handleStatusChange = () => {
    api
      .put(`/agent/assigned/tickets/${id}/status`, null, {
        params: { status: "RESOLVED" },
      })
      .then(() => {
        setTicket((prev) => ({ ...prev, status: "RESOLVED" }));
        toast.success("Ticket marked as RESOLVED");
        navigate("/tickets");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update ticket status");
      });
  };

  const handlePriorityChange = (newPriority) => {
    api
      .put(`/agent/assigned/tickets/${id}/priority`, null, {
        params: { priority: newPriority },
      })
      .then(() => {
        setTicket((prev) => ({ ...prev, priority: newPriority }));
        toast.success(`Priority updated to ${newPriority}`);
        navigate("/tickets");
      })
      .catch((error) => {
        console.error("Error updating priority:", error);
        toast.error("Failed to update priority");
      });
  };

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

  if (!ticket) return <div className="px-6 py-4">Loading...</div>;

  return (
    <div className="flex-grow px-6 py-2">
      <div className="-mx-6 border-b border-gray-300 bg-gray-50 pb-2 mb-6 flex items-center justify-between px-6 pt-2">
  <h1 className="text-2xl font-semibold tracking-tight">
    Ticket Details
  </h1>
  <button
    onClick={() => navigate("/tickets")}
    className="text-sm text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
  >
    <FaArrowLeft className="w-4 h-4" />
    Back to Tickets
  </button>
</div>


      <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 text-indigo-700">
              #{ticket.id} {ticket.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
              {ticket.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Always show status */}
            <span className={getStatusBadge(ticket.status)}>
              {ticket.status}
            </span>

            {isAgent ? (
              <>
                {ticket.status === "PENDING" && ticket.agentName == null && (
                  <AssignTicketButton ticketId={ticket.id} onSuccess={() => {}} />
                )}

                {ticket.status === "INPROGRESS" &&
                  isAssigned && (
                    <button
                      onClick={handleStatusChange}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center"
                    >
                      <FaCheck className="mr-1" />
                      Mark as Resolved
                    </button>
                )}

                {isAssigned ?
                <select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="bg-indigo-100 text-sm border-indigo-600 rounded px-2 py-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select> :
                <span className={getPriorityBadge(ticket.priority)}>
                  {ticket.priority}
                </span>
                }
              </>
            ) : (
              <>
                <span className={getPriorityBadge(ticket.priority)}>
                  {ticket.priority}
                </span>

                {ticket.status !== "CLOSED" && isCustomer && (
                  <CloseTicketButton
                    ticketId={ticket.id}
                    onSuccess={() => navigate("/tickets")}
                  />
                )}

                {isCustomer && (
                  <DeleteTicketButton
                    ticketId={ticket.id}
                    onDeleted={() => navigate("/tickets")}
                  />
                )}

                {isAdmin && !ticket.agentName && (
                  <>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      Assign to Agent
                    </button>

                    {showModal && (
                      <AssignAgentModal
                        ticketId={ticket.id}
                        ticket={ticket}
                        onClose={() => setShowModal(false)}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <div>
            <strong>Created:</strong> {formatDate(ticket.createdDate)}
          </div>
          <div>
            <strong>Assigned To:</strong> {ticket.agentName || "Unassigned"}
          </div>
          <div>
            <strong>Department:</strong> {ticket.departmentName}
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection ticketId={ticket.id} ticket={ticket} />
    </div>
  );
};

export default TicketView;
