import React from 'react';
import { useLocation } from 'react-router-dom';
import TagDashboard from '../dashboards/tag_dashboard';
import UnauthorisedPage from '../unauthorised_page';

function TagDashboardFunction(props) {
    const location = useLocation();

    if (location.state !== null) {
        var teams = location.state.teams;
        var user = location.state.user;
        var current_team = location.state.current_team;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
        teams = JSON.parse(localStorage.getItem('teams'));
        current_team = teams[0]
    }
    

    if (user !== null && (user.role === 'team_member' || user.role === 'team_lead')) {
        return (
            <TagDashboard teams={teams} user={user} current_team={current_team}/>
        );
    } else {
        return (
            <UnauthorisedPage/>
        )
    }
}
export default TagDashboardFunction;