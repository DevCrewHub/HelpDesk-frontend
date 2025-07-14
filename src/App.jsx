import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import AgentDashboard from "./pages/AgentDashboard";
import TicketView from "./pages/TicketView";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import KnowledgeBase from "./pages/KnowledgeBase";
import AgentRegistrationPage from "./pages/AgentRegistrationPage";
import AssignedTickets from "./pages/AssignedTickets";
import AgentListPage from "./pages/admin/AgentListPage";
import CustomerListPage from "./pages/admin/CustomerListPage";
import DepartmentPage from "./pages/admin/DepartmentPage";
import SidebarLayout from "./layout/SidebarLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import MorePage from "./components/navbar/More";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        window.location.reload();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
     <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Layout Routes */}
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AgentDashboard />
            </ProtectedRoute>
          } />

          <Route path="create-ticket" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateTicket />
            </ProtectedRoute>
          } />

          <Route path="tickets" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AllTickets />
            </ProtectedRoute>
          } />

          <Route path="ticket/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TicketView />
            </ProtectedRoute>
          } />

          <Route path="knowledge" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <KnowledgeBase />
            </ProtectedRoute>
          } />

          <Route path="/admin/agentregistration" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AgentRegistrationPage />
            </ProtectedRoute>
          } />

          <Route path="assigned-tickets" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AssignedTickets />
            </ProtectedRoute>
          } />

          <Route path="admin/customers" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CustomerListPage />
            </ProtectedRoute>
          } />

          <Route path="admin/agents" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AgentListPage />
            </ProtectedRoute>
          } />

          <Route path="admin/departments" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DepartmentPage />
            </ProtectedRoute>
          } />

          <Route path="/more" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MorePage />
            </ProtectedRoute>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
