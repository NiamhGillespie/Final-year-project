import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_TEAMS, API_URL_USERS, SHORT_URL } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class DisplayTeamUsers extends Component {
    state = {
        users: [],
        leads: [],
        members: []
    };

    //get users from API function
    async getUsers() {
        axios.get(API_URL_USERS + this.props.belongs_to + '/admin/users').then((response) => this.setState({ users: response.data }));
    }

    getTeamLeads() {
        var users = this.state.users;
        var lead_ids = this.props.team_leads;
        var team_leads = [];

        for (var i = 0; i < users.length; i++) {
            if (lead_ids.includes(parseInt(users[i].id))) {
                team_leads.push(users[i]);
            }
        }

        return team_leads;
    }

    getTeamMembers() {
        var users = this.state.users;
        var member_ids = this.props.team_members;
        var team_members = [];

        for (var i = 0; i < users.length; i++) {
            if (member_ids.includes(parseInt(users[i].id))) {
                team_members.push(users[i]);
            }
        }

        return team_members;
    }

    displayTeamLeads() {
        var leads = this.getTeamLeads();

        var returnList = [];

        for (var i = 0; i < leads.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    {leads[i].profile_photo === null ? (
                        <img src={SHORT_URL + "media/profile_images/default.jpg"} alt="user profile" className="small-team-member-photo" />
                    ) : (
                        <img src={leads[i].profile_photo} alt="hey" className="small-team-member-photo" />
                    )}

                    {this.props.links === false ? (
                        <div className="small-card-info">
                            {leads[i].first_name} {leads[i].surname} - {leads[i].role}
                        </div>
                    ) : (
                        <Link to="/username/details" state={{ user: leads[i] }} className="link small-card-info">
                            {leads[i].first_name} {leads[i].surname} - {leads[i].role}
                        </Link>
                    )}
                </div>
            );
        }
        return returnList;
    }

    displayTeamMembers() {
        var members = this.getTeamMembers();
        var returnList = [];

        for (var i = 0; i < members.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    {members[i].profile_photo === null ? (
                        <img src={SHORT_URL + "/media/profile_images/default.jpg"} alt="user profile" className="small-team-member-photo" />
                    ) : (
                        <img src={members[i].profile_photo} alt="hey" className="small-team-member-photo" />
                    )}
                    
                    {this.props.links === false ? (
                        <div className="small-card-info">
                            {members[i].first_name} {members[i].surname} - {members[i].role}
                        </div>
                    ) : (
                        <Link to="/username/details" state={{ user: members[i] }} className="link small-card-info">
                            {members[i].first_name} {members[i].surname} - {members[i].role}
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
        this.getUsers();
    }

    render() {
        return (
            <div>
                {this.displayTeamLeads()}
                {this.displayTeamMembers()}
            </div>
        );
    }
}

export default DisplayTeamUsers;
