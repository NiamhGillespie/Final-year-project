import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavigationBar } from './navigation_bar';
import Favicon from 'react-favicon'

export class BaseTemplate extends Component {
    static displayName = BaseTemplate.name;

    componentDidMount() {
        document.title = "Requirements and value identification tool for prioritisation";
    }
    
    render() {
        return (
            <div className="wrapper">

                <NavigationBar />
                
                <Container tag="main" className="main-content">
                    {this.props.children}
                </Container>
                
                {/* add in footer here */}
            </div>
        );
    }
}

export default BaseTemplate;