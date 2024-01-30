import React, { Component, useEffect, useState } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import 'react-circular-progressbar/dist/styles.css';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import axios from 'axios';
import DisplayUserTeams from '../helper_components/displayUserTeams';
import { API_URL_SHORT, API_URL_USERS, API_URL_USER_DETAILS } from '../../constants';

export class UserDashboard extends Component {
    state = {
        user: this.props.user,
        not_updating: true,

        email: this.props.user.email,
        password: this.props.user.password
    };

    updateForm = (e) => {
        if (this.state.not_updating === false) {
            this.setState({ not_updating: true });
        } else {
            this.setState({ not_updating: false });
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    updateUser= (e) => {
        e.preventDefault();
        
        console.log('updating...');


        
        console.log(this.props.user)
        let form_data = new FormData();
        form_data.append('email', this.state.email);
        form_data.append('password', this.state.password);
        if (this.props.user.teams.length !== 0) {
            this.state.teams.forEach((team) => {
                form_data.append('teams', team);
            });
        }
        

        axios.put(API_URL_USER_DETAILS + this.props.user.id, form_data).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.updateForm()
            this.setState({user: response.data});

        });
    }

    render() {
        const user = this.props.user;
        return (
            <div>
                <h3 className="add-team-title"> User Profile </h3>

                <div className="teams-details-box">
                    <div className="user-details-section-one">
                        {user.profile_photo === 'http://localhost:8000/null' || user.profile_photo === null ? (
                            <img src="http://localhost:8000/media/profile_images/default.jpg" alt="user profile" className="large-circular-photo" />
                        ) : (
                            <img src={user.profile_photo} alt="user profile" className="large-circular-photo" />
                        )}

                        <p className="team-name-title">
                            {user.first_name} {user.surname} - #{user.id}
                        </p>
                        <p className="team-subtitle"> {user.role}</p>

                        
                            <div className="user-details-form-block">
                                <p>
                                    <u> User Details </u>
                                </p>
                                <Form onSubmit={this.updateUser}>
                                <FormGroup>
                                    <Label for="email">Email:</Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        value={returnDefaultIfFieldEmpty(this.state.email)}
                                        disabled={this.state.not_updating}
                                        onChange={(e) => {
                                            this.onChange(e);
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">Password:</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={returnDefaultIfFieldEmpty(this.state.password)}
                                        disabled={this.state.not_updating}
                                        onChange={(e) => {
                                            this.onChange(e);
                                        }}
                                    />
                                </FormGroup>

                                <Button className="btn-primary float-end" disabled={this.state.not_updating}>Update</Button>
                                </Form>
                            </div>
                        

                        <Button className="btn-primary float-end me-5 mt-0" onClick={this.updateForm}>
                            Update Details
                        </Button>
                    </div>

                    {user.role !== 'admin' ? (
                        <div className="user-details-section-two">
                            <p className="team-members-heading"> Teams </p>
                            <DisplayUserTeams teams={user.teams} belongs_to={user.belongs_to} links={true} />
                        </div>
                    ) : (
                        <div className=""></div>
                    )}
                </div>
            </div>
        );
    }
}

export default UserDashboard;