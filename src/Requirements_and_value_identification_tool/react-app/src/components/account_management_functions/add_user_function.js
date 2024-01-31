import React from 'react';
import { useLocation } from 'react-router-dom';
import AddUser from '../account_management/add_user';
import UnauthorisedPage from '../unauthorised_page';

function AddUserFunction(props) {
    const location = useLocation();
    
    if (location.state !== null) {
        var user = location.state.user;
    } else {
        user = JSON.parse(localStorage.getItem('user'));
    }

    if (user !== null && user.role === 'admin') {
        return (
            <AddUser user={user}/>
        );
    } else {
        return( <UnauthorisedPage/>)
    }

}
export default AddUserFunction;