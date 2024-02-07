import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_USERS, SHORT_URL } from '../../constants';
import axios from 'axios';
import UserDetails from './user_details';
import { Link } from 'react-router-dom';
import { FormGroup, Label, NavLink } from 'reactstrap';
import EditUserModal from './edit_user_modal';

export class ViewUsers extends Component {

    state = {
        organisation_id: this.props.user.belongs_to,
        users: [],
        filter: 'all',
        search_term: '',
        filtered_users: []
    };

    //get users from API function
    async getUsers() {
        if (this.state.filter === 'all') {
            await axios
                .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
                .then((response) => this.setState({ users: response.data }, this.setState({ filtered_users: response.data })));
        }

        if (this.state.filter === 'admins') {
            await axios
                .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
                .then((response) =>
                    this.setState(
                        { users: response.data.filter((user) => user.role === 'admin') },
                        this.setState({ filtered_users: response.data.filter((user) => user.role === 'admin') })
                    )
                );
        }

        if (this.state.filter === 'team_members') {
            await axios
                .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
                .then((response) => this.setState({ users: response.data.filter((user) => user.role === 'team_member') },
                this.setState({ filtered_users: response.data.filter((user) => user.role === 'team_member') })));
        }

        if (this.state.filter === 'team_leads') {
            await axios
                .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
                .then((response) => this.setState({ users: response.data.filter((user) => user.role === 'team_lead') },
                this.setState({ filtered_users: response.data.filter((user) => user.role === 'team_lead') })));
        }

        if (this.state.filter === 'stakeholders') {
            await axios
                .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
                .then((response) => this.setState({ users: response.data.filter((user) => user.role === 'stakeholder') },
                this.setState({ filtered_users: response.data.filter((user) => user.role === 'stakeholder') })));
        }
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState = () => {
        this.getUsers();
    }

    changeFilter = (e) => {
        this.state.filter = e.target.value;
        this.resetState();
    };

    updateSearchTerm = (e) => {
        this.state.search_term = e.target.value;
        this.search()
    };
    search = (e) => {

        var users = this.state.filtered_users;
        var search_term = this.state.search_term.toLowerCase();
        var returned_users = [];

        for (var i = 0; i < users.length; i++) {
            var user_fullname = users[i].first_name + ' ' + users[i].surname;
            if (
                users[i].username.toLowerCase().includes(search_term) ||
                users[i].first_name.toLowerCase().includes(search_term) ||
                users[i].surname.toLowerCase().includes(search_term) ||
                user_fullname.toLowerCase().includes(search_term) ||
                users[i].id === parseInt(search_term)
            ) {
                returned_users.push(users[i]);
            }
        }

        this.setState({ users: returned_users });
        this.state.users = returned_users;
    };

    displayUsers() {
        const user = this.props;
        var users = this.state.users;
        var returnList = [];

        for (var i = 0; i < users.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-nowrap">
                    {users[i].profile_photo === null ? (
                        <img src={SHORT_URL + 'media/profile_images/default.jpg'} alt="user profile" className="team-card-photo" />
                    ) : (<img src={users[i].profile_photo} alt="hey" className="team-card-photo" />)}
                    <Link to="/username/details" state={{ user: users[i] }} className="link team-card-info">
                        {users[i].username}
                    </Link>
                    <p className="team-card-info"> - {users[i].role} </p>
                    <p className="users-name-section">
                        {users[i].first_name} {users[i].surname} - #{users[i].id}{' '}
                    </p>

                    <EditUserModal user={users[i]} resetState={this.resetState} />
                </div>
            );
        }

        if (returnList.length === 0) {
            returnList.push(
                <div className='top-margin'>
                    <p className='not-found-message'> No users found</p>
                </div>
            )
        }

        return returnList;
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Users </h3>
                <div className="view-teams-box">
                    <div className="">
                        <FormGroup>
                            <select value={this.state.value} onChange={this.changeFilter} name="filter" className="ms-1 float-start drop-filter">
                                <option value="all">All Users</option>
                                <option value="admins">Admins Only</option>
                                <option value="team_leads">Team Leads Only</option>
                                <option value="team_members">Team Members Only</option>
                                <option value="stakeholders">Stakeholders Only</option>
                            </select>
                        </FormGroup>
                    </div>

                    <div>
                        <input id="search-input" type="text" className="search-box" onChange={this.updateSearchTerm} placeholder="user search..." />
                        <button className="search-btn">
                            🔍
                        </button>
                    </div>

                    {this.displayUsers()}
                </div>
            </div>
        );
    }
}

export default ViewUsers;
