import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class TeamDashboard extends Component {
    
    render() {
        return (
            <>
                <p> Team Dashboard </p>
                <NavLink tag={Link} className="text-dark nav-item" to="/teamName/epicsDashboard">
                    <span> Epic Dashboard </span>
                </NavLink>
            </>
        );
    }
}

export default TeamDashboard;
