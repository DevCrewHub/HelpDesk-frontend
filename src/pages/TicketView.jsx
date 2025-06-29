import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Layout from "../layout/SidebarLayout";

const TicketView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
        <div className="flex flex-grow min-h-screen">
      {/* Middle Section - Conversation */}
        <div className="flex flex-grow flex-col justify-between px-6 py-2 bg-gray-50">
          <div>
            <div className="text-2xl mb-4 border-b border-gray-300 -mx-6">
              <div className="px-6 pb-2">
              <span className="hover:underline cursor-pointer " onClick={() => navigate('/')}>Tickets</span> / <span className="font-medium">Welcome to Helpdesk</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
              <h1 className="text-xl font-bold">#{id} Welcome to HelpDesk</h1> {/*Handle title*/}
              </div>
              <select className="bg-gray-200 text-gray-500 border border-gray-300 px-3 py-1 rounded text-sm">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded shadow mb-6">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">A</div>
                <span className="font-medium">Admin@Example.Com</span>
                <span className="text-gray-400 ml-2 text-sm">· 2 days ago</span>
              </div>
              <div className="text-gray-800">
                <p>Login Issue</p>
              </div>
            </div>
          </div>

          <div>
            <div className="pb-4">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full border border-gray-300 bg-gray-100 px-4 py-2 rounded focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Ticket Details */}
        <div className="w-72 border-l border-gray-100 shadow-xs bg-white p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">J</div>
              <span className="font-medium">John Doe</span>
            </div>
          </div>

          <h2 className="font-bold mb-2">Ticket Details</h2>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Ticket ID</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green-600 font-medium">Open</span>
            </div>
            <div className="flex justify-between">
              <span>Resolution</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">Due in 22h 24m 5s</span>
            </div>
            <div className="flex justify-between">
              <span>Department</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span>Priority</span>
              <span>Medium</span>
            </div>
          </div>

          <button className="mt-auto bg-gray-900 text-white px-4 py-2 rounded mt-6">Close</button>
        </div>
        </div>
    </Layout>

  );
}

export default TicketView;