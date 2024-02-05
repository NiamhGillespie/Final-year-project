import React, { Component, useEffect, useState } from 'react';
import { Collapse, Label, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/navigation_bar.css';

export function NavigationBar() {
    const [isAuth, setIsAuth] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const teams = JSON.parse(localStorage.getItem('teams'));

    if (user !== null && user.profile_photo !== null) {
        if (user.profile_photo[1] === 'm') {
            user.profile_photo = 'http://localhost:8000/' + user.profile_photo;
            console.log(user.profile_photo)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth, user]);

    
    return (
        <>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand>
                    <img src={'http://localhost:8000/media/logo.png'} alt="logo" className='logo' />
                </NavbarBrand>

                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/">
                                <span>Home </span>
                            </NavLink>
                        </NavItem>

                        {user !== null && (user.role === 'team_member' || user.role === 'team_lead') ? (
                            <>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark nav-item"
                                        to="/teamName/tag-dashboard"
                                        state={{ teams: teams, user: user, current_team: teams[0] }}>
                                        <span>Tag Dashboard </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/team/team-dashboard" state={{ teams: teams, user: user }}>
                                        <span>Team Dashboard </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark nav-item"
                                        to="/teamName/tracking-dashboard"
                                        state={{ teams: teams, user: user, current_team: teams[0] }}>
                                        <span>Tracking Dashboard </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark nav-item"
                                        to="/teamName/epics-dashboard"
                                        state={{ teams: teams, user: user, current_team: teams[0] }}>
                                        <span>Epics Dashboard </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <></>
                        )}

                        {user !== null && user.role === 'admin' ? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/add-team" state={{ user: user }}>
                                        <span>Add team </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/add-user" state={{ user: user }}>
                                        <span> Add user </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/view-teams" state={{ user: user }}>
                                        <span> View Teams </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/view-users" state={{ user: user }}>
                                        <span> View Users </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <></>
                        )}

                        {isAuth ? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="userDashboard" state={{ user: user, teams: teams }}>
                                        <span> User Profile </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/logout">
                                        <span>Log out </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/login">
                                        <span>Log in </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/sign-up">
                                        <span>Sign up </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavigationBar;
