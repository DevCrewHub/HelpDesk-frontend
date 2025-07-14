import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../layout/SidebarLayout";
import { useNavigate } from "react-router-dom";

const CustomerListPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userrole");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if(userRole !== "ADMIN"){
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    api.get("/admin/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error("Error fetching customers:", err));
  }, []);

  return (
      <div className="flex-grow px-6 py-4">
        <div className="-mx-6 border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6">All Customers</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-2">{c.fullName}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No customers found.</p>
          )}
        </div>
      </div>
  );
};

export default CustomerListPage;
