import React, { Component, useEffect, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/navigation_bar.css';

export function NavigationBar() {
    const [isAuth, setIsAuth] = useState(false);
    var user = JSON.parse(localStorage.getItem('user'));
    //bit hackey
    user.profile_photo = 'http://localhost:8000/' + user.profile_photo
    console.log('nav bar', user.profile_photo)

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth, user]);

    // constructor(props) {
    //     super(props);

    //     this.toggleNavbar = this.toggleNavbar.bind(this);
    //     this.state = {
    //         collapsed: true
    //     };
    // }

    // toggleNavbar() {
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    return (
        <>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand>{/* image goes here */}</NavbarBrand>

                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                    <ul className="navbar-nav flex-grow">
                        {isAuth ? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/">
                                        <span>Home LOGGED IN </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="/logout">
                                        <span>Log out </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : null}
                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/">
                                <span>Home </span>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/tag-dashboard">
                                <span>Tag Dashboard </span>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/details">
                                <span>Team Dashboard </span>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/tracking-dashboard">
                                <span>Tracking Dashboard </span>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/epics-dashboard">
                                <span>Epics Dashboard </span>
                            </NavLink>
                        </NavItem>

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

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/username/details" state={{ user: user }} >
                                <span> User Profile </span>
                            </NavLink>
                        </NavItem>

                        {/* admin pages - team_lead here for now due to ..? */}
                        {user.role === 'admin' || user.role === 'team_lead'? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/add-team">
                                        <span>Add team </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/add-user">
                                        <span> Add user </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/view-teams">
                                        <span> View Teams </span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} className="text-dark nav-item" to="admin/view-users">
                                        <span> View Users </span>
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavigationBar;
