import React from 'react';
import ViewUsers from '../account_management/view_users';
import { useLocation } from 'react-router-dom';

function ViewUsersFunction(props) {
    const location = useLocation();
    var user = location.state.user;

    console.log('user is', user)
    return (
        <ViewUsers user={user}/>
    );
}
export default ViewUsersFunction;
