import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const DepartmentTable = ({ departments, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await api.delete(`/admin/department/${id}`);
      toast.success("Department deleted successfully");
      onDelete();
    } catch (err) {
      toast.error("Failed to delete department");
    }
  };

  return (
    <table className="min-w-full table-auto text-sm text-left border-collapse">
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th className="px-6 py-3 border-r border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 border-r border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider">
            Department Name
          </th>
          <th className="px-6 py-3 text-center text-gray-700 text-xs font-semibold uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {departments.map((dept) => (
          <tr
            key={dept.id}
            className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-150"
          >
            <td className="px-6 py-3 border-r border-gray-100 text-gray-800 font-medium">{dept.id}</td>
            <td className="px-6 py-3 border-r border-gray-100 text-gray-700">{dept.name}</td>
            <td className="px-6 py-3 text-center">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => onEdit(dept.id)}
                  className="text-blue-600 hover:text-blue-800 transition duration-150 cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-300 rounded transition duration-200 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
