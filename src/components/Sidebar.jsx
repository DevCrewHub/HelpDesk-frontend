import { useState } from "react";
import { FaHome, FaTicketAlt, FaUser, FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-orange-900 text-white shadow-lg p-4 flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <div className="h-14 flex items-center justify-between">
        <h2 className={`text-xl font-bold transition-all duration-300 ${isOpen ? "opacity-100 traslate-x-0" : "opacity-0 hidden"}`}>
          HelpDesk
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white px-2 py-4 hover:bg-orange-950 hover:rounded-md transform transition-transform duration-300 cursor-pointer"
        >
          {isOpen ? <FaTimes className="min-w-[18px] min-h-[18px]"/> : <FaBars className="min-w-[18px] min-h-[18px]"/>}
        </button>
      </div>
      
      <nav className="flex flex-col flex-grow">
        <a href="#" className="h-14 flex items-center space-x-2 px-[6px] py-4 hover:bg-orange-950 hover:rounded-md transition-all">
          <FaHome className="min-w-[18px] min-h-[18px]"/>
          <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-0"}`}>Dashboard</span>
        </a>

        <a href="#" className="h-14 flex items-center space-x-2 px-[6px] py-4 hover:bg-orange-950 hover:rounded-md transition-all">
          <FaTicketAlt className="min-w-[18px] min-h-[18px]"/>
          <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-0"}`}>Tickets</span>
        </a>

        <a href="#" className="h-14 flex items-center space-x-2 px-[6px] py-4 hover:bg-orange-950 hover:rounded-md transition-all">
          <FaUser className="min-w-[18px] min-h-[18px]"/>
          <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-0"}`}>Profile</span>
        </a>
      </nav>

      <button className="h-14 flex items-center space-x-2 px-[6px] py-4 hover:bg-orange-950 hover:rounded-md transition-all mt-8 cursor-pointer">
        <FaSignOutAlt className="min-w-[18px] min-h-[18px]"/>
        <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-0"}`}>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;