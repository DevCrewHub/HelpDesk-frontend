import { useState } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
      <Searchbar query={query} setQuery={setQuery} />
      <TicketTable tickets={filteredTickets} />
    </div>
  );
};

export default AgentDashboard;