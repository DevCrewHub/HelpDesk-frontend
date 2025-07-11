import { useEffect, useState } from "react";
import api from "../utils/api";

const Filters = ({ filters, onStatusChange, onPriorityChange, onDepartmentChange }) => {
  const [departments, setDepartments] = useState([]);

   useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/admin/department");
        setDepartments(res.data);
      } catch (err) {
        console.error("Failed to load departments", err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 text-gray-500 bg-gray-200 px-3 py-[2px] text-sm rounded cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="PENDING">Pending</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="border border-gray-300 text-gray-500 bg-gray-200 px-3 py-[2px] text-sm rounded cursor-pointer"
      >
        <option value="">All Priorities</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      {/* Department Filter */}
      <select
        value={filters.department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="border border-gray-300 text-gray-500 bg-gray-200 px-3 py-[2px] text-sm rounded cursor-pointer"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
