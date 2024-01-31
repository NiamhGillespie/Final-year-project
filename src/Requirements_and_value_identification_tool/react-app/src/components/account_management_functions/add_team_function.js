import React from 'react';
import { useLocation } from 'react-router-dom';
import AddTeam from '../account_management/add_team';
import UnauthorisedPage from '../unauthorised_page';

function AddTeamFunction(props) {
    const location = useLocation();
    
    if (location.state !== null) {
        var user = location.state.user;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
    }

    if (user !== null && user.role === 'admin') {
        return (
            <AddTeam user={user}/>
        );
    } else {
        return( <UnauthorisedPage/>)
    }
}
export default AddTeamFunction;