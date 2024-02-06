import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_TEAMS, SHORT_URL } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class DisplayUserTeams extends Component {
    state = {
        teams: []
    };

    //get users from API function
    async getTeams() {
        axios.get(API_URL_TEAMS + this.props.belongs_to + '/admin/teams').then((response) => this.setState({ teams: response.data }));
    }

    getUserTeams() {
        var teams = this.state.teams;
        var team_ids = this.props.teams;
        var user_teams = [];

        for (var i = 0; i < teams.length; i++) {
            if (team_ids.includes(parseInt(teams[i].id))) {
                user_teams.push(teams[i]);
            }
        }

        return user_teams;
    }

    displayTeams() {
        var teams = this.getUserTeams();
        var returnList = [];
        console.log('user', this.props.user.role);

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    {teams[i].team_photo === null ? (
                        <img src={SHORT_URL + 'media/profile_images/default.jpg'} alt="user profile" className="small-team-member-photo" />
                    ) : (
                        <img src={teams[i].team_photo} alt="hey" className="small-team-member-photo" />
                    )}

                    {this.props.user.role === 'admin' ? (
                        <Link to="/teamName/details" state={{ team: teams[i] }} className="link small-card-info">
                            {teams[i].team_name}
                        </Link>
                    ) : (
                        <Link to="/team/team-dashboard" state={{ teams: teams, user:this.props.user, current_team:teams[i] }} className="link small-card-info">
                            {teams[i].team_name}
                        </Link>
                    )}
                </div>
            );
        }
        return returnList;
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState() {
        this.getTeams();
    }

    render() {
        return <div>{this.displayTeams()}</div>;
    }
}

export default DisplayUserTeams;
