import React from 'react';
import { useLocation } from 'react-router-dom';
import UserDashboard from '../dashboards/user_dashboard';
import UnauthorisedPage from '../unauthorised_page';

function UserDashboardFunction(props) {
    const location = useLocation();

    if (location.state !== null) {
        var teams = location.state.teams;
        var user = location.state.user
    } else {
        user = JSON.parse(localStorage.getItem('user'));
        teams = JSON.parse(localStorage.getItem('teams'));
    }

    
    if (user !== null && user.profile_photo !== null) {
        if (user.profile_photo[1] === 'm') {
            user.profile_photo = 'http://localhost:8000/' + user.profile_photo;
        }
    }
    
    if (user !== null) {
        return (
            <UserDashboard teams={teams} user={user}/>
        );
    } else {
        return (
            <UnauthorisedPage/>
        )
    }
    
}
export default UserDashboardFunction;