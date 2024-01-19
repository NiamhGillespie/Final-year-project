import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_TEAMS } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class DisplayUserTeams extends Component {
    state = {
        teams: [],
        
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

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    <img src={teams[i].team_photo} alt="user profile" className="small-team-member-photo" />
                    <Link to="/teamName/details" state={{ team: teams[i] }} className="link small-card-info">
                            {teams[i].team_name}
                    </Link>
                </div>
            );
        }
        return returnList;
    };

    async componentDidMount() {
        this.resetState();
    }

    resetState() {
        this.getTeams();
    }


    render() {
        return (
            <div>
               {this.displayTeams()}
            </div>
        );
    }
}

export default DisplayUserTeams;
