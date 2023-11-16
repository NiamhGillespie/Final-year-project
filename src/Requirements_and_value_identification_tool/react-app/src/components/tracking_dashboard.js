import React, { Component } from 'react';
import '../css/basic.css';
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS } from "../constants";
import AddColumnModal from './add_tracking_column_modal';
import EditColumnModal from './edit_tracking_column_modal';


export class TrackingDashboard extends Component {

    state = {
        boards: [],
    };

    async componentDidMount() {
        await this.resetState();
    }
    
    async getColumns() {
        await axios.get(API_URL_DASHBOARD_TRACKING_COLUMNS).then(response => this.setState({ columns: response.data }));
    };

   
    resetState= () => {
        this.getColumns();
    };
    
    displayColumns() {
        var return_list = [];
        const columns = this.state.columns;

        if (columns !== undefined) {
            for (var i = 0; i < this.state.columns.length; i++) {
                return_list.push(
                    <div className='column-container'> 
                        <EditColumnModal className='pb-0 mb-0' resetState={this.resetState} column={columns[i]}/>
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
