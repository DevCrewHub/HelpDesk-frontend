import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../layout/SidebarLayout";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this customer?");
    if (!confirm) return;
    try {
      await api.delete(`/admin/customers/${id}`);
      toast.success("Customer deleted successfully");
      fetchCustomers(); // refresh list
    } catch (err) {
      toast.error("Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="flex-grow px-6 py-2">
      {/* Page Header */}
      <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight  pb-2 px-6">All Customers</h1>
      </div>

      {/* Subtext */}
      <p className="text-gray-600 text-sm mb-5 px-1">Manage registered customers</p>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-300">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-r border-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-center text-gray-800 text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-3 border-r border-gray-100 font-medium text-gray-800">
                  {c.fullName}
                </td>
                <td className="px-6 py-3 border-r border-gray-100 text-gray-700">{c.email}</td>
                <td className="px-6 py-3 border-r border-gray-100 text-gray-700">
                  {c.phoneNumber}
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-300 rounded transition duration-200 cursor-pointer"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {customers.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerListPage;
