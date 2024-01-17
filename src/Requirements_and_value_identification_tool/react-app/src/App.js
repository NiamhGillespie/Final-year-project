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
import LogIn from './components/account_management/log_in';
import SignUp from './components/account_management/sign_up';
import ViewTeams from './components/account_management/view_teams';
import AddTeam from './components/account_management/add_team';
import TeamDetails from './components/account_management/team_details';
import ViewUsers from './components/account_management/view_users';
import UserDetails from './components/account_management/user_details';
import AddUser from './components/account_management/add_user';

export default function App() {
  return (
    <Fragment>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseTemplate />}>
            <Route path="login" element={<LogIn />} />
            <Route path="sign-up" element={<SignUp />} />

            <Route path="admin/add-team" element={<AddTeam />} />
            <Route path="admin/view-teams" element={<ViewTeams />} />
            <Route path="admin/add-user" element={<AddUser />} />
            <Route path="admin/view-users" element={<ViewUsers />} />

            <Route path="teamName/details" element={<TeamDetails />} />
            <Route path="username/details" element={<UserDetails />} />

            <Route index element={<Home />} />
            <Route path="teamName/tag-dashboard" element={<TagDashboard />} />
            {/* <Route path="teamName"  index element={<TeamDashboard />} /> */}
            <Route path="teamName/epics-dashboard" element={<EpicsDashboard />} />
            <Route path="teamName/tracking-dashboard" element={<TrackingDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);