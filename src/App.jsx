import React from "react";
import './App.css';
import AgentDashboard from "./pages/AgentDashboard";
import TicketView from "./pages/TicketView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AgentDashboard />} />
        <Route path='/ticket/:id' element={<TicketView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;