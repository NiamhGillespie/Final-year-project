import React, { Component, useState } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import AddStoryModal from './add_story_modal';
import axios from "axios";
import { API_URL } from "../constants";



export class EpicsDashboard extends Component {

    state = {
        epics: [],
        stories: [],
        colour: null,
    };
    
    async componentDidMount() {
        await this.resetState();
    }
    
    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0] }));
    };

    async getStories() {
        await axios.get(API_URL).then(response => this.setState({ stories: response.data[1] }));
    };
    
    async resetState() {
        await this.getEpics();
        await this.getStories();
    };

    

    displayEpics() {
        var epics = this.state.epics;
        var return_list = [];

        console.log(epics)
        for (var i = 0; i < epics.length; i++) {
            
            return_list.push(
                <div className="epic-container">
                    <div style={{background: '#' + epics[i].epic_colour}} className="epic-box" > { epics[i].title }</div>

                    <div className="d-flex flex-column">
                        { this.displayStories(epics[i].epic_id, epics[i].epic_colour) }

                        <div style={{border: '2px dashed ' + '#' + epics[i].epic_colour}} className="add-story-box">
                            <AddStoryModal resetState={this.resetState} epic_id={epics[i].epic_id}/>
                        </div>

                    </div>
                </div>
            )
        }
        return return_list;
    };

    
    displayStories(epic_id, epic_colour) {
        var stories = this.state.stories;
        var matching_list = [];
        var return_list = [];

        for (var i = 0; i < stories.length; i++) {
            if (stories[i].epic_id === epic_id) {
                matching_list.push(stories[i]);
            }
        }
        
        for (var j = 0; j < matching_list.length; j++) {
            return_list.push(
                <div>
                    <div style={{border: '2px solid ' + '#' + epic_colour}} className="story-box">{matching_list[j].title}</div>
                </div>
            )
        }

        return return_list;
    }
    

    render() {
        return (
            <div>
                <div className= "border-bottom d-flex flex-row">
                    <p className='w-75 text-center'> Stats bar </p>
                    <AddEpicModal create={true} resetState={this.resetState} />
                </div>

                <div>
                    <div> 
                        <p> Team name - Epic Dashboard</p>
                    </div>
                    
                    <div className="d-flex flex-row w-30 h-100 overflow-auto">
                        { this.displayEpics() }
                    </div>
                </div>
            </div>
        );
    }
}

export default EpicsDashboard;