import { useEffect, useState } from "react";
import api from "../utils/api";

const Filters = ({ filters, onStatusChange, onPriorityChange, onDepartmentChange }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const role = localStorage.getItem("userRole");
      let endpoint = "/admin/department"; // default

      if (role === "CUSTOMER") {
        endpoint = "/customer/departments"; 
      } else if (role === "AGENT") {
        endpoint = "/agent/departments"; 
      }

      try {
        const res = await api.get(endpoint);
        setDepartments(res.data);
      } catch (err) {
        console.error("Failed to load departments", err);
      }
    };

    fetchDepartments();
  }, []);

  const baseStyle =
    "border border-gray-300 text-gray-700 bg-gray-100 px-3 py-[6px] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer";

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={baseStyle}
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
        className={baseStyle}
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
        className={baseStyle}
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
