import React from 'react';
import { useLocation } from 'react-router-dom';
import ViewTeams from '../account_management/view_teams';

function ViewTeamsFunction(props) {
    const location = useLocation();
    var user = location.state.user;

    return (
        <ViewTeams user={user}/>
    );
}
export default ViewTeamsFunction;