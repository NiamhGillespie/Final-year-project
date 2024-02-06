import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import BaseTemplate from './components/base_template';
import Home from './components/dashboards/home';
import TrackingDashboard from './components/dashboards/tracking_dashboard';
import EpicsDashboard from './components/dashboards/epic_dashboard';
import TagDashboard from './components/dashboards/tag_dashboard';
import TeamDashboard from './components/dashboards/team_dashboard';
import { LogIn } from './components/account_management/log_in';
import SignUp from './components/account_management/sign_up';
import ViewTeams from './components/account_management/view_teams';
import AddTeam from './components/account_management/add_team';
import TeamDetails from './components/account_management/team_details';
import ViewUsers from './components/account_management/view_users';
import UserDetails from './components/account_management/user_details';
import AddUser from './components/account_management/add_user';
import { LogOut } from './components/account_management/log_out';
import ViewUsersFunction from './components/account_management_functions/view_users_function';
import ViewTeamsFunction from './components/account_management_functions/view_teams_function';
import AddTeamFunction from './components/account_management_functions/add_team_function';
import AddUserFunction from './components/account_management_functions/add_user_function';
import TagDashboardFunction from './components/dashboard_functions/tag_dashboard_function';
import EpicsDashboardFunction from './components/dashboard_functions/epic_dashboard_function';
import TrackingDashboardFunction from './components/dashboard_functions/tracking_dashboard_function';
import TeamDashboardFunction from './components/dashboard_functions/team_dashboard_function';
import UserDashboardFunction from './components/dashboard_functions/user_dashboard_function';
import ErrorPage from './components/error_page';
import HelpDashboard from './components/dashboards/help_dashboard';

export default function App() {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BaseTemplate />}>
                        <Route path="login" element={<LogIn />} />
                        <Route path="logout" element={<LogOut />} />
                        <Route path="sign-up" element={<SignUp />} />

                        <Route path="admin/add-team" element={<AddTeamFunction />} />
                        <Route path="admin/view-teams" element={<ViewTeamsFunction />} />
                        <Route path="admin/add-user" element={<AddUserFunction />} />
                        <Route path="admin/view-users" element={<ViewUsersFunction />} />

                        <Route path="teamName/details" element={<TeamDetails />} />
                        <Route path="username/details" element={<UserDetails />} />

                        <Route index element={<Home />} />
                        <Route path="teamName/tag-dashboard" element={<TagDashboardFunction />} />
                        <Route path="team/team-dashboard" element={<TeamDashboardFunction />} />
                        <Route path="teamName/epics-dashboard" element={<EpicsDashboardFunction />} />
                        <Route path="teamName/tracking-dashboard" element={<TrackingDashboardFunction />} />
                        <Route path="userDashboard" element={<UserDashboardFunction />} />

                        <Route path="help" element={<HelpDashboard />} />
                        <Route path='*' element={<ErrorPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
