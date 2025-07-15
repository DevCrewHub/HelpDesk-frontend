import { useEffect, useState } from "react";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentForm from "../../components/department/DepartmentForm";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const ITEMS_PER_PAGE = 4;

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editDeptId, setEditDeptId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const currentDepartments = departments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/admin/department");
      const sorted = res.data.sort((a, b) => a.id - b.id); // ascending order
      setDepartments(sorted);
    } catch (err) {
      setError("Failed to load departments");
    }
  };

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  
  useEffect(() => {
    if(userRole !== "ADMIN"){
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEdit = (id) => {
    setEditDeptId(id);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditDeptId(null);
    setShowForm(false);
    fetchDepartments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await api.delete(`/admin/department/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Failed to delete department:", err);
    }
  };

  return (
    <div className="flex-grow px-6 py-2">
      {/* Page Header */}
      <div className="-mx-6 border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 mt-2 pb-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight px-6 pb-2">Departments</h1>
      </div>

      {/* Subtext */}
      <p className="text-gray-600 text-sm mb-5 px-1">Manage support departments</p>

      {/* Add Department Button */}
      <div className="mb-4 text-left">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Add Department
        </button>
      </div>

      {/* Department Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-300">
        <DepartmentTable
          departments={currentDepartments}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {departments.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">No departments found.</p>
        )}
      </div>

      {/* Department Form */}
      {showForm && (
        <DepartmentForm
          onClose={handleFormClose}
          departmentId={editDeptId}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(departments.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />

    </div>
  );
};

export default DepartmentPage;
