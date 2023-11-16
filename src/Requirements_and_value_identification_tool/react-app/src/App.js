import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/home";
import BaseTemplate from './components/base_template';
import EpicsDashboard from './components/epic_dashboard';
import TeamDashboard from './components/team_dashboard';
import TagDashboard from './components/tag_dashboard';
import TrackingDashboard from './components/tracking_dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<Home />} />
          <Route path="teamTags" element={<TagDashboard />} />
          <Route path="teamName"  index element={<TeamDashboard />} />
          <Route path="teamName/epics-dashboard" element={<EpicsDashboard />} />
          <Route path="teamName/tracking-dashboard" element={<TrackingDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);