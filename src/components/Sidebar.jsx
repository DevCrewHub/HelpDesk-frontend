import { useState, useRef } from "react";
import { FaHome, FaTicketAlt, FaUser, FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { useClickOutside } from "../hooks/ClickOutside";

const Sidebar = ({ isOpenProp, setIsOpenProp }) => {
  // Allow external control OR fallback to internal state
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalOpen;
  const setIsOpen = setIsOpenProp || setInternalOpen;
  const [tickOpen, setTickOpen] = useState(false);
  const flyoutRef = useRef();
  const triggerRef = useRef();

  useClickOutside(flyoutRef, () => setTickOpen(false), triggerRef, isOpen);

  return (
    <div className={`h-screen text-sm bg-orange-900 text-white shadow-lg px-4 pb-4 flex flex-col transition-all duration-300 ${isOpen ? "w-56" : "w-16"}`}>
      
      <div className="h-14 flex items-center justify-between">
        <h2 className={`text-xl font-bold transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 hidden"}`}>
          HelpDesk
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white px-2 py-4 hover:bg-orange-950 hover:rounded-md transform transition-transform duration-300 cursor-pointer"
        >
          {isOpen ? <FaTimes className="min-w-[20px] min-h-[20px]" /> : <FaBars className="min-w-[16px] min-h-[16px]" />}
        </button>
      </div>

      <nav className="relative flex flex-col flex-grow">
        
        {/* Dashboard */}
        <a href="#" className="h-14 flex items-center px-2 gap-3 hover:bg-orange-950 hover:rounded-md transition-all">
          <FaHome className="min-w-[16px] min-h-[16px]" />
          {isOpen && <span className="transition-opacity duration-300">Dashboard</span>}
        </a>
        
        {/* Tickets */}
        <div className="relative">
          <div 
            ref={triggerRef}
            onClick={(e) => { e.stopPropagation(); setTickOpen(!tickOpen); }}
            className="h-14 flex items-center px-2 gap-3 hover:bg-orange-950 hover:rounded-md transition-all cursor-pointer"
          >
            <FaTicketAlt className="min-w-[16px] min-h-[16px]" />
            {isOpen && <span className="transition-opacity duration-300">Tickets</span>}
          </div>
        
          {/* Dropdown when expanded */}
          {tickOpen && isOpen && (
            <div className="flex flex-col pl-2 space-y-1 py-2">
              <div className="flex items-center gap-2 hover:bg-orange-950 hover:rounded-md px-2 py-1 cursor-pointer">
                <FaAngleRight />
                <FaTicketAlt className="min-w-[16px] min-h-[16px]" />
                <div>Assigned to Me</div>
              </div>
              <div className="flex items-center gap-2 hover:bg-orange-950 hover:rounded-md px-2 py-1 cursor-pointer">
                <FaAngleRight />
                <FaTicketAlt className="min-w-[16px] min-h-[16px]" />
                <div>All Tickets</div>
              </div>
            </div>
          )}
      
          {/* Flyout when collapsed */}
          {!isOpen && tickOpen && (
            <div 
              ref={flyoutRef}
              className="absolute left-full top-0 ml-2 bg-orange-800 text-white border border-orange-500 rounded shadow w-36 z-10"
            >
              <div className="hover:bg-orange-900 px-2 py-1 cursor-pointer">Assigned to Me</div>
              <div className="hover:bg-orange-900 px-2 py-1 cursor-pointer">All Tickets</div>
            </div>
          )}
        </div>
        
        {/* Profile */}
        <a href="#" className="h-14 flex items-center px-2 gap-3 hover:bg-orange-950 hover:rounded-md transition-all">
          <FaUser className="min-w-[16px] min-h-[16px]" />
          {isOpen && <span className="transition-opacity duration-300">Profile</span>}
        </a>
        
      </nav>

      <button className="h-14 flex items-center space-x-2 px-[6px] py-4 hover:bg-orange-950 hover:rounded-md transition-all mt-8 cursor-pointer">
        <FaSignOutAlt className="min-w-[16px] min-h-[16px]" />
        <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-0"}`}>
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
