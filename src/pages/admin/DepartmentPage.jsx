import { useEffect, useState } from "react";
import Layout from "../../layout/SidebarLayout";
import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentForm from "../../components/department/DepartmentForm";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editDeptId, setEditDeptId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/admin/department");
      setDepartments(res.data);
    } catch (err) {
      setError("Failed to load departments");
    }
  };

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userrole");
  
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
    fetchDepartments(); // Refresh after add/edit
  };

  return (
      <div className="flex-grow px-6 py-2">
        <div className="-mx-6 border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl px-6 pb-2">Departments</h1>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Add Department
        </button>

        <DepartmentTable
          departments={departments}
          onDelete={fetchDepartments}
          onEdit={handleEdit}
        />

        {showForm && (
          <DepartmentForm
            onClose={handleFormClose}
            departmentId={editDeptId}
          />
        )}
      </div>
  );
};

export default DepartmentPage;
