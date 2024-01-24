import React from 'react';
import { useLocation } from 'react-router-dom';
import AddTeam from '../account_management/add_team';

function AddTeamFunction(props) {
    const location = useLocation();
    var user = location.state.user;

    return (
        <AddTeam user={user}/>
    );
}
export default AddTeamFunction;