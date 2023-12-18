import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from "../../constants";



export class Home extends Component {

    static displayName = Home.name;

    render() {
        return (
            <>
            
                <p> Home page! </p>
            
            </>
        );
    }
}

export default Home;