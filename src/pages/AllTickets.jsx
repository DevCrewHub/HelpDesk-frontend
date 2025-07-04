import { useState } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import Layout from "../layout/SidebarLayout";

const AllTickets = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    date: "",
  });

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
          <h1 className="text-2xl pb-2 px-6">Tickets</h1>
        </div>

        <Searchbar query={query} setQuery={setQuery} />
        <Filters filters={filters} setFilters={setFilters} />
        <TicketTable tickets={filteredTickets} />

      </div>
    </Layout>
  );
};

export default AllTickets;