import { useEffect, useState } from "react";
import api from "../../utils/api";

const DepartmentForm = ({ departmentId, onClose }) => {
  const [name, setName] = useState("");
  const isEdit = !!departmentId;

  useEffect(() => {
    const fetchDepartment = async () => {
      if (isEdit) {
        const res = await api.get(`/admin/department/${departmentId}`);
        setName(res.data.name);
      }
    };
    fetchDepartment();
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/admin/department/${departmentId}`, { name });
      } else {
        await api.post("/admin/department", { name });
      }
      onClose();
    } catch (err) {
      alert("Failed to submit");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Update Department" : "Add Department"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white rounded"
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
