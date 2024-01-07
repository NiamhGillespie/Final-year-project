import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';

export class ViewTeams extends Component {
    state = {
        teams: []
    };

    //get teams from API function

    resetState() {
        //call getTeams funct
    }

    displayTeams() {
        var teams = [1, 2, 3, 4, 5 ,6]; //this.state.teams
        var returnList = [];

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-row flex-nowrap">
                    <p className="team-card-photo" />
                    <p className="team-card-info"> Team name - id</p>

                    <p className="edit-button align-self-stretch float-end"> edit </p>
                </div>
            );
        }
        return returnList;
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Teams </h3>
                <div className="view-teams-box">
                    <div className="ms-1 mt-2 float-start drop-filter">
                        <p> dropdown filter :) </p>
                    </div>

                    <p className="me-1 mt-2 search-bar">
                        Search bar?
                    </p>

                    {this.displayTeams()}
                </div>
            </div>
        );
    }
}

export default ViewTeams;
