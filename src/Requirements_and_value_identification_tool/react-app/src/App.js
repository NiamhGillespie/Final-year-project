import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import BaseTemplate from './components/base_template';
import Home from './components/dashboards/home';
import TrackingDashboard from './components/dashboards/tracking_dashboard';
import EpicsDashboard from './components/dashboards/epic_dashboard';
import TagDashboard from './components/dashboards/tag_dashboard';
import TeamDashboard from './components/dashboards/team_dashboard';

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