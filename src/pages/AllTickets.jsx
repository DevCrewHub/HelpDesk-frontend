import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Filters from "../components/Filters";
import Layout from "../layout/SidebarLayout";
import api from "../utils/api";

const AllTickets = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Detect Role
  const userRole = localStorage.getItem("userRole");
  const isCustomer = userRole === "CUSTOMER";
  const isAgent = userRole === "AGENT";

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const url = isCustomer ? `/customer/ticketsCreated` : isAgent ? `/agent/tickets` : '/admin/tickets';
        const res = await api.get(url);
        setTickets(res.data);
      } catch (err) {
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (ticket.title.toLowerCase().includes(query.toLowerCase()) ||
        ticket.id.toString().includes(query)) &&
      (filters.status === "" || ticket.status === filters.status) &&
      (filters.priority === "" || ticket.priority === filters.priority)
    );
  });

  return (
    <Layout>
      <div className="flex-grow px-6 py-2">
        <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6">Tickets</h1>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          <>
            <Searchbar query={query} setQuery={setQuery} />
            <Filters filters={filters} setFilters={setFilters} />
            <div className="w-full overflow-x-auto">
              <TicketTable tickets={filteredTickets} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AllTickets;
