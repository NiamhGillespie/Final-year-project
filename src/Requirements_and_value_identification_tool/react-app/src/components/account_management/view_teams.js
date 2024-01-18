import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_TEAMS, API_URL_USERS } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class ViewTeams extends Component {
    state = {
        organisation_id: 2,
        teams: [],
        users: []
    };

    //get teams from API function
    async getTeams() {
        await axios
            .get(API_URL_TEAMS + this.state.organisation_id + '/admin/teams', this.state)
            .then((response) => this.setState({ teams: response.data }));
    }

    async getUsers() {
        await axios
            .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
            .then((response) => this.setState({ users: response.data }));
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState() {
        this.getTeams();
        this.getUsers();
    }

    displayTeams() {
        var teams = this.state.teams;
        var returnList = [];

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-row flex-nowrap">
                    <img src={teams[i].team_photo} alt="team profile" className="team-card-photo" />
                    <p className="team-card-info">
                        {' '}
                        {teams[i].team_name} - {teams[i].id}{' '}
                    </p>

                    <Link to="/teamName/details" state={{ team: teams[i], users: this.state.users }}>
                        Team Profile
                    </Link>

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

                    <p className="me-1 mt-2 search-bar">Search bar?</p>

                    {this.displayTeams()}
                </div>
            </div>
        );
    }
}

export default ViewTeams;
