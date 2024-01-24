import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_TEAMS, API_URL_USERS } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditTeamModal from './edit_team_modal';

export class ViewTeams extends Component {
    state = {
        organisation_id: this.props.user.belongs_to,
        teams: [],
        users: [],
        full_teams: [],
    };

    //get teams from API function
    async getTeams() {
        await axios
            .get(API_URL_TEAMS + this.state.organisation_id + '/admin/teams', this.state)
            .then((response) => this.setState({ teams: response.data }, this.setState({ full_teams: response.data })));
    }

    async getUsers() {
        await axios
            .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
            .then((response) => this.setState({ users: response.data }));
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState = () => {
        this.getTeams();
        this.getUsers();
    }

    displayTeams() {
        var teams = this.state.teams;
        var returnList = [];

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-row flex-nowrap">
                    {teams[i].team_photo === null ? (
                        <img src='http://localhost:8000/media/profile_images/default.jpg' alt="user profile" className="team-card-photo" />
                    ) : (<img src={teams[i].team_photo} alt="hey" className="team-card-photo" />)}
                    <p className="team-card-info">
                        <Link to="/teamName/details" state={{ team: teams[i], users: this.state.users, belongs_to: this.props.user.belongs_to }} className="link">
                            {teams[i].team_name}
                        </Link>
                    </p>

                    <EditTeamModal team={teams[i]} resetState={this.resetState} />
                </div>
            );
        }

        if (returnList.length === 0) {
            returnList.push(
                <div className='top-margin'>
                    <p className='not-found-message'> No teams found </p>
                </div>
            )
        }
        return returnList;
    }

    updateSearchTerm = (e) => {
        this.state.search_term = e.target.value;
        this.search()
    };
    search = (e) => {

        var teams = this.state.full_teams;
        var search_term = this.state.search_term.toLowerCase();
        var returned_teams = [];

        for (var i = 0; i < teams.length; i++) {
            if (
                teams[i].team_name.toLowerCase().includes(search_term) ||
                teams[i].id === parseInt(search_term)
            ) {
                returned_teams.push(teams[i]);
            }
        }

        this.setState({ teams: returned_teams });
        this.state.teams = returned_teams;
    };

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Teams </h3>
                <div className="view-teams-box">
                    <div>
                        <input id="search-input" type="text" className="search-box" onChange={this.updateSearchTerm} placeholder="team search..." />
                        <button className="search-btn">
                            🔍
                        </button>
                    </div>

                    {this.displayTeams()}
                </div>
            </div>
        );
    }
}

export default ViewTeams;
