import React from 'react';
import { useLocation } from 'react-router-dom';
import EpicsDashboard from '../dashboards/epic_dashboard';

function EpicsDashboardFunction(props) {
    const location = useLocation();
    var teams = location.state.teams;
    var user = location.state.user;
    var current_team = location.state.current_team;

    return (
        <EpicsDashboard teams={teams} user={user} current_team={current_team}/>
    );
}
export default EpicsDashboardFunction;