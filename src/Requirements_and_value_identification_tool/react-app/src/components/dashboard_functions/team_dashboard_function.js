import React from 'react';
import { useLocation } from 'react-router-dom';
import TeamDashboard from '../dashboards/team_dashboard';
import UnauthorisedPage from '../unauthorised_page';

function TeamDashboardFunction(props) {
    const location = useLocation();

    if (location.state !== null) {
        var teams = location.state.teams;
        var user = location.state.user;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
        teams = JSON.parse(localStorage.getItem('teams'));
    }

    if (user !== null && (user.role === 'team_member' || user.role === 'team_lead')) {
        return (
            <TeamDashboard teams={teams} user={user}/>
        );
    } else {
        return (
            <UnauthorisedPage/>
        )
    }
    
}
export default TeamDashboardFunction;