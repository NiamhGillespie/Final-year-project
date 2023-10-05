import React, { Component } from 'react';
import AddEpicModal from './add_epic_modal';
import axios from "axios";
import { API_URL } from "../constants";



export class Home extends Component {

    static displayName = Home.name;

    state = {
        epics: []
      };
    
      componentDidMount() {
        this.resetState();
      }
    
      getEpics = () => {
        axios.get(API_URL).then(res => this.setState({ epics: res.data }));
      };
    
      resetState = () => {
        this.getEpics();
      };

    render() {
        return (
            <>
            
                <p> Home page! </p>
            
                <AddEpicModal create={true} resetState={this.resetState} />
            
            </>
        );
    }
}

export default Home;