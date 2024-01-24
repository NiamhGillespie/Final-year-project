import React from 'react';
import { useLocation } from 'react-router-dom';
import TeamDashboard from '../dashboards/team_dashboard';

function TeamDashboardFunction(props) {
    const location = useLocation();
    var teams = location.state.teams;
    var user = location.state.user;

    return (
        <TeamDashboard teams={teams} user={user}/>
    );
}
export default TeamDashboardFunction;