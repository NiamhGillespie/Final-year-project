import React from 'react';
import { useLocation } from 'react-router-dom';
import TrackingDashboard from '../dashboards/tracking_dashboard';

function TrackingDashboardFunction(props) {
    const location = useLocation();
    var teams = location.state.teams;
    var user = location.state.user;
    var current_team = location.state.current_team;

    return (
        <TrackingDashboard teams={teams} user={user} current_team={current_team}/>
    );
}
export default TrackingDashboardFunction;