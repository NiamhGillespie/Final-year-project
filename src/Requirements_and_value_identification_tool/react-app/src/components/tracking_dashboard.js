import React, { Component } from 'react';
import '../css/basic.css';
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS, API_URL } from "../constants";
import AddColumnModal from './add_tracking_column_modal';
import EditColumnModal from './edit_tracking_column_modal';


export class TrackingDashboard extends Component {

    state = {
        boards: [],
        columns: [],
        non_completed_stories: [],
        epics: []
    };

    async componentDidMount() {
        await this.resetState();
    }
    
    async getColumns() {
        await axios.get(API_URL_DASHBOARD_TRACKING_COLUMNS).then(response => this.setState({ columns: response.data }));
    };

    async getUndefinedStories() {
        await axios.get(API_URL).then(response => this.setState({ non_completed_stories: response.data[1].filter(story => story.state != 'done') }));
    }

    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0]}));
    }
   
    resetState= () => {
        this.getColumns();
        this.getUndefinedStories();
        this.getEpics();
        
    };
    
    displayColumns() {
        var return_list = [];
        const columns = this.state.columns;
        const non_completed_stories = this.state.non_completed_stories;
        console.log(columns, non_completed_stories)

        if (columns !== undefined) {
            for (var i = 0; i < this.state.columns.length; i++) {
                return_list.push(
                    <div className='column-container'> 
                        <EditColumnModal className='pb-0 mb-0' resetState={this.resetState} column={columns[i]} non_completed_stories={non_completed_stories}
                        epics={this.state.epics}/>
                        <p> { columns[i].stories.length } </p>
                        <hr className='pt-0 mt-0'></hr>
                    </div>
                )
            }
        }

        return_list.push(
            <AddColumnModal resetState={this.resetState}/>
        )

        return return_list;
    }
    render() {
        return (
            <>

            <div className='d-flex flex-row overflow-y'>
                { this.displayColumns() }
            </div>
            </> 
        );
    }
}
export default TrackingDashboard;
