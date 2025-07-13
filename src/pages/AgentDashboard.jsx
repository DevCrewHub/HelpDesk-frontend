import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import Layout from "../layout/SidebarLayout";
import { FaCheckCircle, FaSpinner, FaTicketAlt, FaTimesCircle, FaUserCheck } from "react-icons/fa";
import api from "../utils/api";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const role = localStorage.getItem("userRole");
  const isAgent = role === "AGENT";
  const isCustomer = role === "CUSTOMER";

  useEffect(() => {
    fetchtickets();
  }, []);

  const fetchtickets = async () => {
    try {
      const url = isAgent ? "/agent/tickets" : isCustomer ? "/customer/ticketsCreated" : "/admin/tickets";
      const response = await api.get(url);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching ticket tickets:", error);
    }
  };

  const total = tickets.length;
  const pending = tickets.filter(ticket => ticket.status == "PENDING").length;
  const inProgress = tickets.filter(ticket => ticket.status === "INPROGRESS").length;
  const resolved = tickets.filter(ticket => ticket.status === "RESOLVED").length;
  const closed = tickets.filter(ticket => ticket.status === "CLOSED").length;

  const items = [
    { label: "Total Tickets", count: total, icon: <FaTicketAlt className="text-blue-500 w-6 h-6" /> },
    { label: "Pending Tickets", count: pending, icon: <FaUserCheck className="text-yellow-500 w-6 h-6" /> },
    { label: "In Progress Tickets", count: inProgress, icon: <FaSpinner className="text-orange-500 w-6 h-6 animate-spin" /> },
    { label: "Resolved Tickets", count: resolved, icon: <FaCheckCircle className="text-green-500 w-6 h-6" /> },
    { label: "Closed Tickets", count: closed, icon: <FaTimesCircle className="text-gray-500 w-6 h-6" /> },
  ];

  return (
      <div className="flex-grow px-6 py-2">

        <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6">DashBoard</h1>
        </div>

        <div className="px-4 pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back! {/*add name*/}
          </h1>
          <p className="mt-0 text-gray-600">
            Here's an overview of your support tickets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
            >
              <div className="mb-2">{item.icon}</div>
              <div className="text-3xl font-semibold text-gray-800">{item.count}</div>
              <div className="mt-2 text-gray-500 text-sm text-center">{item.label}</div>
            </div>
          ))}
        </div>

      </div>
  );
};

export default AgentDashboard;