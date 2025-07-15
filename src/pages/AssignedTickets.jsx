import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import TicketTable from "../components/TicketTable";
import Filters from "../components/Filters";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AssignedTickets = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);    // For initial load
  const [searching, setSearching] = useState(false); // For search requests
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const isCustomer = userRole === "CUSTOMER";
  const isAgent = userRole === "AGENT";
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "AGENT") {
      navigate("/"); // Redirect
    }
  }, [navigate]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const url = "/agent/assigned/tickets";
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

  // Initial ticket load
  useEffect(() => {
    // Only fetch default if query is empty
    if (query === "") {
      fetchTickets();
    }
  }, [query]);

  // Search
  useEffect(() => {
    const fetchSearchedTickets = async () => {
      if (!query.trim()) return;

      try {
        setSearching(true);
        const url = `/agent/assigned/tickets/search/${encodeURIComponent(query.trim())}`;
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

  const fetchFilteredTickets = async (type, value) => {
    if (!value) return fetchTickets(); // reset filter

    try {
      const url = `/agent/assigned/tickets/${type}/${encodeURIComponent(value)}`;
      const res = await api.get(url);
      setTickets(res.data);
    } catch (err) {
      console.error("Filter failed", err);
      setTickets([]);
    }
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    fetchFilteredTickets("status", status);
  };

  const handlePriorityChange = (priority) => {
    setFilters((prev) => ({ ...prev, priority }));
    fetchFilteredTickets("priority", priority);
  };

  const handleDepartmentChange = (department) => {
    setFilters((prev) => ({ ...prev, department }));
    fetchFilteredTickets("department", department);
  };

  // Client-side filter: status + priority
  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filters.status === "" || ticket.status === filters.status) &&
      (filters.priority === "" || ticket.priority === filters.priority)
    );
  });

  return (
      <div className="flex-grow px-6 py-2">
        <div className="-mx-6 bg-gradient-to-b from-white to-gray-50 border-b border-gray-300 mt-2 pb-2 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight pb-2 px-6">Tickets</h1>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <>
          <Searchbar query={query} setQuery={setQuery} searching={searching} />
          {isCustomer ? "" : <Filters
            filters={filters}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onDepartmentChange={handleDepartmentChange}
          />}
        </>

        {(loading || searching) ? (
          <p className="text-gray-600">{loading ? "Loading tickets..." : "Searching..."}</p>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              {filteredTickets.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">No tickets match the current filters.</p>
              ) : (
                <TicketTable tickets={filteredTickets} />
              )}
            </div>
          </>
        )}
      </div>
  );
};

export default AssignedTickets;
