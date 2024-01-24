import React from 'react';
import { useLocation } from 'react-router-dom';
import UserDashboard from '../dashboards/user_dashboard';

function UserDashboardFunction(props) {
    const location = useLocation();
    var teams = location.state.teams;
    var user = location.state.user;

    return (
        <UserDashboard teams={teams} user={user}/>
    );
}
export default UserDashboardFunction;