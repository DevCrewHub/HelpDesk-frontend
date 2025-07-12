import api from '../../utils/api';

const DepartmentTable = ({ departments, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await api.delete(`/admin/department/${id}`);
      onDelete();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <table className="w-full text-sm text-left bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Name</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.length ? (
          departments.map((dept) => (
            <tr key={dept.id} className="border-t hover:bg-gray-50">
              <td className="p-2 pr-10">{dept.id}</td>
              <td className="p-2">{dept.name}</td>
              <td className="p-2 space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                  onClick={() => onEdit(dept.id)}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                  onClick={() => handleDelete(dept.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-2 text-center" colSpan="3">
              No departments found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
