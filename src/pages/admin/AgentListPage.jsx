import { useEffect, useState } from "react";
import api from "../../utils/api";
import Layout from "../../layout/SidebarLayout";

const AgentListPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get("/admin/agents")
      .then(res => setAgents(res.data))
      .catch(err => console.error("Error fetching agents:", err));
  }, []);

  return (
    <Layout>
      <div className="flex-grow px-6 py-4">
        <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6">All Agents</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-2">{a.fullName}</td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2">{a.departmentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {agents.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No agents found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentListPage;
