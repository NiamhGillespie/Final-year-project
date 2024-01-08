import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';

export class ViewUsers extends Component {
    state = {
        Users: []
    };

    //get users from API function

    resetState() {
        //call getUsers funct
    }

    displayUsers() {
        var users = [1, 2, 3, 4]; //this.state.userrs
        var returnList = [];

        for (var i = 0; i < users.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-row flex-nowrap">
                    <p className="team-card-photo" />
                    <p className="team-card-info"> id - username - role </p>

                    <p className="edit-button align-self-stretch float-end"> edit </p>
                </div>
            );
        }
        return returnList;
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Users </h3>
                <div className="view-teams-box">
                    <div className="ms-1 mt-2 float-start drop-filter">
                        <p> dropdown filter :) </p>
                    </div>

                    <p className="me-1 mt-2 search-bar">
                        Search bar?
                    </p>

                    {this.displayUsers()}
                </div>
            </div>
        );
    }
}

export default ViewUsers;
