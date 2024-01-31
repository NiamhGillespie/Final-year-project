import React from 'react';
import ViewUsers from '../account_management/view_users';
import { useLocation } from 'react-router-dom';
import UnauthorisedPage from '../unauthorised_page';

function ViewUsersFunction(props) {
    const location = useLocation();
    
    if (location.state !== null) {
        var user = location.state.user;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
    }

    if (user !== null && user.role === 'admin') {
        return (
            <ViewUsers user={user}/>
        );
    } else {
        return( <UnauthorisedPage/>)
    }
}
export default ViewUsersFunction;
