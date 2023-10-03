import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/home";
import BaseTemplate from './components/base_template';
import EpicsDashboard from './components/epic_dashboard';
import TeamDashboard from './components/team_dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<Home />} />
          <Route path="teamName"  index element={<TeamDashboard />} />
          <Route path="teamName/epicsDashboard" element={<EpicsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
