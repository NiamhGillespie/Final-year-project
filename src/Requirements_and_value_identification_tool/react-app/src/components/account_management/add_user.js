import React, { Component, useState } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { API_URL_ORGANISATIONS, API_URL_TEAMS, API_URL_USERS } from '../../constants';

export class AddUser extends Component {
    state = {
        username: '',
        first_name: '',
        surname: '',
        role: 'Admin',
        teams: [],
        profile_photo: '',
        password: '',
        email: '',
        belongs_to: 2,
        organisation: this.get_organisation(),
        list_of_teams: this.getTeams()
    };

    async getTeams() {
        var teams = await axios.get(API_URL_TEAMS + 2 + '/admin/teams');
        this.setState({ list_of_teams: teams.data });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeTeams = (e) => {
        this.setState({ [e.target.name]: [e.target.value] });
    };

    handleFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });

        this.setState({
            'preview_photo': URL.createObjectURL( e.target.files[0])
        });
    };

    async get_organisation() {
        var organisations = await axios.get(API_URL_ORGANISATIONS).then((response) => response.data);

        const organisation = organisations.filter((org) => org.id === this.state.organisation_id);

        this.state.organisation = organisation[0];
        return organisation[0];
    }

    dropDownTeams() {
        var teams = this.state.list_of_teams;
        var returnList = [];

        for (var i = 0; i < teams.length; i++) {
            returnList.push(<option value={teams[i].id}> {teams[i].team_name} </option>);
        }
        return returnList;
    }

    addUser = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('profile_photo', this.state.profile_photo, this.state.profile_photo.name);
        form_data.append('username', this.state.username);
        form_data.append('password', this.state.password);
        form_data.append('email', this.state.email);
        form_data.append('first_name', this.state.first_name);
        form_data.append('surname', this.state.surname);
        form_data.append('role', this.state.role);
        if (this.state.teams.length !== 0) {
            form_data.append('teams', this.state.teams);
        }
        

        console.log('adding user...');
        axios.post(API_URL_USERS + this.state.belongs_to + '/admin/users', form_data).then(() => {
            alert('user created');
        });
    };
    render() {
        return (
            <Form onSubmit={this.addUser}>
                <h3 className="add-team-title"> Add User </h3>
                <div className="add-team-box">
                    <div className="left-add-team-box">
                        <FormGroup>
                            <Label for="profile_photo">Profile Photo:</Label>
                            <input type="file" name="profile_photo" onChange={this.handleFileChange} />
                        </FormGroup>

                        <div className="w-100">
                            <p className="w-20 float-start team-profile-photo-title">Profile Photo Preview:</p>
                            <div className="w-75 float-start">
                                <img src={this.state.preview_photo} alt="profile profile" className="team-profile-photo" />
                            </div>
                        </div>

                        <FormGroup>
                            <Label for="first_name">First Name:</Label>
                            <Input type="text" name="first_name" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.first_name)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="surname">Last Name:</Label>
                            <Input type="text" name="surname" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.surname)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="role">Role:</Label>
                            <select value={this.state.role} onChange={this.onChange} name="role" className="ms-2 role-dropdown">
                                <option value="admin">Admin</option>
                                <option value="team_lead">Team Lead</option>
                                <option value="team_member">Team Member</option>
                                <option value="stakeholder">Stakeholder?</option>
                            </select>
                        </FormGroup>
                    </div>

                    <div className="right-add-team-box">
                        <FormGroup>
                            <Label for="username">Username:</Label>
                            <Input type="text" name="username" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.username)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="text" name="email" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.email)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Initial password:</Label>
                            <Input type="text" name="password" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.password)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="teams"> Team:</Label>
                            <select value={this.state.teams} onChange={this.onChangeTeams} name="teams" className="ms-2 role-dropdown">
                                {this.dropDownTeams()}
                            </select>
                        </FormGroup>
                    </div>

                    <div>
                        <Button className="btn-primary login-button mt-3 float-end"> Create User </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default AddUser;
