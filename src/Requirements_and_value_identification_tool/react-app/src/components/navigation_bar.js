import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/navigation_bar.css';

export class NavigationBar extends Component {
    static displayName = NavigationBar.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand>{/* image goes here */}</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark nav-item" to="/">
                                    <span>Home </span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-dark nav-item" to="/teamName/teamTags">
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

                            {/* admin pages */}
                            <NavItem>
                                <NavLink tag={Link} className="text-dark nav-item" to="admin/add-team">
                                    <span>Add team </span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-dark nav-item" to="admin/view-teams">
                                    <span> View Teams </span>
                                </NavLink>
                            </NavItem>

                        </ul>
                    </Collapse>
                </Navbar>
            </>
        );
    }
}

export default NavigationBar;
