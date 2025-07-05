// import React from "react";
// import './App.css';
// import AgentDashboard from "./pages/AgentDashboard";
// import TicketView from "./pages/TicketView";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<AgentDashboard />} />
//         <Route path='/ticket/:id' element={<TicketView />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// src/App.jsx

import React, { useEffect, useState } from "react";
import './App.css';
import AuthPage from "./pages/AuthPage";
import AgentDashboard from "./pages/AgentDashboard";
import TicketView from "./pages/TicketView";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AllTickets from "./pages/AllTickets";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateTicket from "./pages/CreateTicket";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;

      if (Date.now() > expiry) {
        // Token expired, clear storage & redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Invalid token format", err);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  } else {
    setIsAuthenticated(false);
  }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/' 
        element={
          isAuthenticated ? <AgentDashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="/create-ticket" 
        element={
          isAuthenticated ? <CreateTicket /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        <Route path='/tickets' element={
          isAuthenticated ? <AllTickets /> : <Navigate to="/login" replace />
        } />
        <Route path='/ticket/:id' element={
          isAuthenticated ? <TicketView /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
