import React from 'react';
import { useLocation } from 'react-router-dom';
import AddUser from '../account_management/add_user';

function AddUserFunction(props) {
    const location = useLocation();
    var user = location.state.user;

    return (
        <AddUser user={user}/>
    );
}
export default AddUserFunction;