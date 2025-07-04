import { useState } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import Layout from "../layout/SidebarLayout";
import { FaCheckCircle, FaSpinner, FaTicketAlt, FaUserCheck } from "react-icons/fa";

const AgentDashboard = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    date: "",
  });
  const stats = [
    { label: 'Total Tickets', count: 120, icon: <FaTicketAlt className="text-blue-500 w-6 h-6" /> },
    { label: 'Assigned Tickets', count: 45, icon: <FaUserCheck className="text-yellow-500 w-6 h-6" /> },
    { label: 'In Progress', count: 30, icon: <FaSpinner className="text-orange-500 w-6 h-6 animate-spin" /> },
    { label: 'Resolved Tickets', count: 40, icon: <FaCheckCircle className="text-green-500 w-6 h-6" /> },
  ];

  const tickets = [
    { id: 1, title: "Login issue", status: "Open", priority: "High", date: "2025-06-25" },
    { id: 2, title: "Payment failed", status: "Closed", priority: "Low", date: "2025-06-19" },
    { id: 3, title: "App crash", status: "Open", priority: "High", date: "2025-07-05" },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    return(
      (ticket.title.toLowerCase().includes(query.toLowerCase()) ||
      ticket.id.toString().includes(query)) &&
      ((filters.status === "" || ticket.status === filters.status) &&
      (filters.priority === "" || ticket.priority === filters.priority))
    );
  });

  return (
    <Layout>
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
          {stats.map((item, index) => (
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
    </Layout>
  );
};

export default AgentDashboard;