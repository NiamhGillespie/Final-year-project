import React, { Component } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import axios from "axios";
import { API_URL } from "../constants";



export class EpicsDashboard extends Component {

    state = {
        epics: []
    };
    
    async componentDidMount() {
        await this.resetState();
    }
    
    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0] }));
    };
    
    async resetState() {
        await this.getEpics();
    };

    displayEpics() {

        
        console.log("Epics:", this.state.epics);
        var epics = this.state.epics;
        var return_list = [];

        for (var i = 0; i < epics.length; i++) {
            
            return_list.push(
                <div class="epic-container">
                    <div class="epic-box"> { epics[i].title }</div>

                    <div class="d-flex flex-column">
                        <div className="story-box">Story 1</div>
                        <div class="story-box">Story 2</div>
                        <div class="story-box">Story 3</div>
                        <div class="add-story-box">+</div>
                    </div>
                </div>
            )
        }

        return return_list;

    };

    render() {
        return (
            <>
                <div className= "border-bottom d-flex flex-row">
                    <p className='w-75 text-center'> Stats bar </p>
                    <AddEpicModal create={true} resetState={this.resetState} />
                </div>

                <div>
                    <div> 
                        <p> Team name - Epic Dashboard</p>
                    </div>
                    
                    <div class="d-flex flex-row w-30 h-100 overflow-auto">
                        { this.displayEpics() }
                    </div>
                </div>
            </>
        );
    }
}

export default EpicsDashboard;