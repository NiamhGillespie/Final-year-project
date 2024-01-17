import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { API_URL_USERS } from '../../constants';
import axios from 'axios';
import UserDetails from './user_details';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

export class ViewUsers extends Component {
    state = {
        organisation_id: 2,
        users: []
    };

    //get users from API function
    async getUsers() {
        await axios
            .get(API_URL_USERS + this.state.organisation_id + '/admin/users', this.state)
            .then((response) => this.setState({ users: response.data }));
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState() {
        this.getUsers();
    }

    displayUsers() {
        var users = this.state.users;
        console.log(users);
        var returnList = [];

        for (var i = 0; i < users.length; i++) {
            returnList.push(
                <div className="team-card d-flex flex-nowrap">
                    <img src={users[i].profile_photo} alt="user profile" className="team-card-photo" />
                    <p className="team-card-info"> {users[i].username} - {users[i].role} </p>
                    <p className="pt-5"> {users[i].first_name} {users[i].surname} - #{users[i].id} </p>
                    

                    <Link to="/username/details" state={{ user: users[i] }}>
                        User Profile
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
                <h3 className="add-team-title"> View Users </h3>
                <div className="view-teams-box">
                    <div className="ms-1 mt-2 float-start drop-filter">
                        <p> dropdown filter :) </p>
                    </div>

                    <p className="me-1 mt-2 search-bar">Search bar?</p>

                    {this.displayUsers()}
                </div>
            </div>
        );
    }
}

export default ViewUsers;
