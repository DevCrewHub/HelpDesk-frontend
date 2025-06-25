import { useState } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Sidebar from "../components/Sidebar";

const AgentDashboard = () => {
  const [query, setQuery] = useState("");

  const tickets = [
    { id: 1, subject: "Login issue", status: "Open" },
    { id: 2, subject: "Payment failed", status: "Closed" },
    { id: 3, subject: "App crash", status: "Open" },
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
    ticket.id.toString().includes(query)
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      
      <div className="flex-grow p-6">
        <div className="-mx-6 border-b border-gray-300 mb-4">
          <h1 className="text-2xl font-bold pb-2 px-6">Tickets</h1>
        </div>
        <Searchbar query={query} setQuery={setQuery} />
        <TicketTable tickets={filteredTickets} />
      </div>
    </div>
  );
};

export default AgentDashboard;