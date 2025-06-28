import { useState } from "react";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border border-gray-300 text-gray-500 bg-gray-200 px-3 py-[2px] text-sm rounded cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        className="border border-gray-300 text-gray-500 bg-gray-200 px-3 py-[2px] text-sm rounded cursor-pointer"
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default Filters;