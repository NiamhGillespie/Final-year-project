import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/navigation_bar.css';



export class NavigationBar extends Component {

    static displayName = NavigationBar.name;

    constructor (props) {

        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };

    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand>
                        {/* image goes here */}
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

                        <ul className="navbar-nav flex-grow">

                                <NavItem>
                                    <NavLink className="text-dark nav-item"><span>Home </span></NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="text-dark nav-item"><span>Log in </span></NavLink>
                                </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default NavigationBar;