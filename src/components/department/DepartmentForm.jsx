import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const DepartmentForm = ({ departmentId, onClose }) => {
  const [name, setName] = useState("");
  const isEdit = !!departmentId;

  useEffect(() => {
    if (isEdit) {
      const fetchDepartment = async () => {
        try {
          const res = await api.get(`/admin/department/${departmentId}`);
          setName(res.data.name);
        } catch {
          toast.error("Failed to load department details");
        }
      };
      fetchDepartment();
    }
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/admin/department/${departmentId}`, { name });
        toast.success("Department updated successfully");
      } else {
        await api.post("/admin/department", { name });
        toast.success("Department created successfully");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to submit department");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {isEdit ? "Update Department" : "Add Department"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-400 "
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
