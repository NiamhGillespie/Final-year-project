import React from 'react';
import { useLocation } from 'react-router-dom';
import TagDashboard from '../dashboards/tag_dashboard';

function TagDashboardFunction(props) {
    const location = useLocation();
    var teams = location.state.teams;
    var user = location.state.user;
    var current_team = location.state.current_team;

    return (
        <TagDashboard teams={teams} user={user} current_team={current_team}/>
    );
}
export default TagDashboardFunction;