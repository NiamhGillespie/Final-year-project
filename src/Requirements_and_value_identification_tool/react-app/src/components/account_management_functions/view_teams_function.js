import React from 'react';
import { useLocation } from 'react-router-dom';
import ViewTeams from '../account_management/view_teams';
import UnauthorisedPage from '../unauthorised_page';

function ViewTeamsFunction(props) {
    const location = useLocation();
    
    if (location.state !== null) {
        var user = location.state.user;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
    }

    if (user !== null && user.role === 'admin') {
        return (
            <ViewTeams user={user}/>
        );
    } else {
        return( <UnauthorisedPage/>)
    }
    
}
export default ViewTeamsFunction;