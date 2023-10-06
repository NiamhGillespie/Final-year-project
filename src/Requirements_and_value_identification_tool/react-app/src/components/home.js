import React, { Component } from 'react';
import AddEpicModal from './add_epic_modal';
import axios from "axios";
import { API_URL } from "../constants";
import EpicsDashboard from './epic_dashboard';



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