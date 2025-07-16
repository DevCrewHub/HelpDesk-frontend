import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Filters from "../components/Filters";
import api from "../utils/api";

const AllTickets = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    department: ""
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const userRole = localStorage.getItem("userRole");
  const isCustomer = userRole === "CUSTOMER";
  const isAgent = userRole === "AGENT";
  const isAdmin = userRole === "ADMIN";

  // Fetch all tickets based on role
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const url = isCustomer
        ? "/customer/ticketsCreated"
        : isAgent
        ? "/agent/tickets"
        : "/admin/tickets";

      const res = await api.get(url);
      setTickets(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Search by title
  useEffect(() => {
    const fetchSearchedTickets = async () => {
      if (!query.trim()) {
        fetchTickets();
        return;
      }

      try {
        setSearching(true);
        const encodedQuery = encodeURIComponent(query.trim());
        const url = isCustomer
          ? `/customer/tickets/search/${encodedQuery}`
          : isAgent
          ? `/agent/tickets/search/${encodedQuery}`
          : `/admin/tickets/search/${encodedQuery}`;

        const res = await api.get(url);
        setTickets(res.data);
        setError("");
      } catch (err) {
        setError("Search failed");
        setTickets([]);
      } finally {
        setSearching(false);
      }
    };

    fetchSearchedTickets();
  }, [query]);

  
  const applyClientSideFilters = (tickets) => {
    return tickets.filter((ticket) => {
      return (
        (filters.status === "" || ticket.status === filters.status) &&
        (filters.priority === "" || ticket.priority === filters.priority) &&
        (filters.department === "" || ticket.departmentName === filters.department)
      );
    });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handlePriorityChange = (priority) => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const handleDepartmentChange = (department) => {
    setFilters((prev) => ({ ...prev, department }));
  };

  const filteredTickets = applyClientSideFilters(tickets);

  return (
    <div className="flex-grow px-6 py-2 overflow-x-scroll">
      <div className="-mx-6 bg-gradient-to-b from-white to-gray-50 border-b border-gray-300 mt-2 pb-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight pb-2 px-6">Tickets</h1>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Searchbar query={query} setQuery={setQuery} searching={searching} />

      <Filters
        filters={filters}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onDepartmentChange={handleDepartmentChange}
      />

      {loading || searching ? (
        <p className="text-gray-600">{loading ? "Loading tickets..." : "Searching..."}</p>
      ) : (
        <div className="w-full">
          {filteredTickets.length === 0 ? (
            <p className="text-gray-500 text-sm mt-4">No tickets match the current filters.</p>
          ) : (
            <TicketTable tickets={filteredTickets} />
          )}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
