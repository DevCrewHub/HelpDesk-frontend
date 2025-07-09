import React, { useEffect, useState } from "react";
import './App.css';
import AuthPage from "./pages/AuthPage";
import AgentDashboard from "./pages/AgentDashboard";
import TicketView from "./pages/TicketView";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import KnowledgeBase from "./pages/KnowledgeBase";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AgentRegistrationPage from "./pages/AgentRegistrationPage";
import AssignedTickets from "./pages/AssignedTickets";

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

        <Route path="/" element={
          isAuthenticated ? <AgentDashboard /> : <Navigate to="/login" replace />
        } />

        <Route path="/create-ticket" element={
          isAuthenticated ? <CreateTicket /> : <Navigate to="/login" replace />
        } />

        <Route path="/tickets" element={
          isAuthenticated ? <AllTickets /> : <Navigate to="/login" replace />
        } />

        <Route path="/ticket/:id" element={
          isAuthenticated ? <TicketView /> : <Navigate to="/login" replace />
        } />

        <Route path="/knowledge" element={
          isAuthenticated ? <KnowledgeBase /> : <Navigate to="/login" replace />
        } />
        <Route path="/agentregistration" element={
          isAuthenticated ? <AgentRegistrationPage /> : <Navigate to="/login" replace />
        } />
        <Route path="/assigned-tickets" element={
          isAuthenticated ? <AssignedTickets /> : <Navigate to="/login" replace />
        } />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
