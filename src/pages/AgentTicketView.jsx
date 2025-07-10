// import { useNavigate, useParams } from "react-router-dom";
// import Layout from "../layout/SidebarLayout";
// import CommentSection from "../components/CommentSection";
// import { useEffect, useState } from "react";
// import api from "../utils/api";

// const AgentTicketView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       const res = await api.get(`/agent/ticket/${id}`);
//       setTicket(res.data);
//     };
//     fetchTicket();
//   }, [id]);

//   if (!ticket) return <div>Loading...</div>;

//   return (
//     <Layout>
//       <div className="flex flex-grow min-h-screen">
        
//         {/* Middle Section */}
//         <div className="flex flex-grow flex-col justify-between px-6 py-2 bg-gray-50">
//           <div>
//             <div className="text-2xl -mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
//               <div className="px-6 pb-2">
//                 <span className="hover:underline cursor-pointer" onClick={() => navigate("/tickets")}>Tickets</span> / 
//                 <span className="font-medium"> #{ticket.id} {ticket.title}</span>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-xl font-bold">{ticket.title}</h1>
//               <select className="bg-gray-200 text-gray-500 border border-gray-300 px-3 py-1 rounded text-sm">
//                 <option value={ticket.status}>{ticket.status}</option>
//                 <option value="IN_PROGRESS">In Progress</option>
//                 <option value="RESOLVED">Resolved</option>
//                 <option value="CLOSED">Closed</option>
//               </select>
//             </div>

//             <div className="bg-white p-4 rounded shadow mb-6">
//               <div className="text-gray-800">
//                 <p>{ticket.description}</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="pb-4">
//               <input type="text" placeholder="Type a message" className="w-full border border-gray-300 bg-gray-100 px-4 py-2 rounded focus:outline-none" />
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-72 border-l border-gray-100 shadow-xs bg-white p-4 flex flex-col">
//           <h2 className="font-bold mb-4">Ticket Details</h2>
//           <div className="space-y-2 text-sm text-gray-600">
//             <div className="flex justify-between"><span>Department</span><span>{ticket.departmentName}</span></div>
//             <div className="flex justify-between"><span>Priority</span><span>{ticket.priority}</span></div>
//             <div className="flex justify-between"><span>Status</span><span>{ticket.status}</span></div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AgentTicketView;