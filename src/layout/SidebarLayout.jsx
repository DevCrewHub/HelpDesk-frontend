import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      localStorage.setItem("sidebarOpen", !prev);
      return !prev;
    });
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar isOpenProp={isOpen} setIsOpenProp={toggleSidebar} />
      <div className="flex flex-grow">{children}</div>
    </div>
  );
}
