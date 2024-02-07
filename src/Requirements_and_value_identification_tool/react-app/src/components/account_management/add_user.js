import React, { Component, useState } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { displayTeams, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { API_URL_SHORT, API_URL_TEAMS, API_URL_USERS } from '../../constants';

export class AddUser extends Component {
    state = {
        username: '',
        first_name: '',
        surname: '',
        role: 'admin',
        teams: [],
        profile_photo: '',
        password: '',
        email: '',
        belongs_to: '',
        list_of_teams: this.getTeams(),

        validate: {
            username: 'too_short',
            first_name: 'too_short',
            surname: 'too_short',
            email: 'invalid',
            password: 'invalid'
        },
        
        usernames: []
    };

    async getTeams() {
        var teams = await axios.get(API_URL_TEAMS + this.props.user.belongs_to + '/admin/teams');
        this.setState({ list_of_teams: teams.data });
    }

    async existingUsernames() {
        await axios.get(API_URL_SHORT + 'getUsernames').then((response) => this.setState({ usernames: response.data }));
    }

    componentDidMount() {
        this.existingUsernames()
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
            preview_photo: URL.createObjectURL(e.target.files[0])
        });
    };

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

        if (
            this.state.validate.username === 'valid' &&
            this.state.validate.first_name === 'valid' &&
            this.state.validate.surname === 'valid' &&
            this.state.validate.email === 'valid' &&
            this.state.validate.password === 'valid'
        ) {
            let form_data = new FormData();
            if (this.state.profile_photo !== '') {
                form_data.append('profile_photo', this.state.profile_photo, this.state.profile_photo.name);
            }

            form_data.append('username', this.state.username);
            form_data.append('password', this.state.password);
            form_data.append('email', this.state.email);
            form_data.append('first_name', this.state.first_name);
            form_data.append('surname', this.state.surname);
            form_data.append('role', this.state.role);
            form_data.append('belongs_to', this.props.user.belongs_to);
            if (this.state.teams.length !== 0) {
                this.state.teams.forEach((team) => {
                    form_data.append('teams', team);
                });
            }

            axios.post(API_URL_USERS + this.props.user.belongs_to + '/admin/users', form_data).then(() => {
                alert('user created');
                window.location.reload(); 
            });
        } else {
            alert('Form is invalid');
        }
    };

    onTeamAddition = (e) => {
        var team_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_ids.push(e[i].id);
        }
        this.setState({ teams: team_ids });
    };

    onTeamDeletion = (e) => {
        var team_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_ids.push(e[i].id);
        }
        this.setState({ teams: team_ids });
    };

    validateUsername(e) {
        const validate = this.state.validate;

        if (e.target.value.length < 6) {
            validate.username = 'too_short';
        } else if (e.target.value.length > 25) {
            validate.username = 'too_long';
        } else if (/^([a-zA-Z])$/.test(e.target.value[0]) === false) {
            validate.username = 'letter_first';
        } else if (/^([a-zA-Z0-9_]*)$/.test(e.target.value) === false) {
            validate.username = 'match_regex';
        } else if (this.state.usernames.includes(e.target.value)) {
            validate.username = 'taken';
        } else {
            validate.username = 'valid';
        }

        this.setState({ validate });
    }

    validateFirstName(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.first_name = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.first_name = 'too_long';
        } else if (/^([a-zA-Z]*)$/.test(e.target.value) === false) {
            validate.first_name = 'letters_only';
        } else {
            validate.first_name = 'valid';
        }

        this.setState({ validate });
    }

    validateSurname(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.surname = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.surname = 'too_long';
        } else if (/^([a-zA-Z]*)$/.test(e.target.value) === false) {
            validate.surname = 'letters_only';
        } else {
            validate.surname = 'valid';
        }

        this.setState({ validate });
    }

    validateEmail(e) {
        const validate = this.state.validate;

        if (/(^..*@..*)$/.test(e.target.value) === false) {
            validate.email = 'invalid';
        } else {
            validate.email = 'valid';
        }

        this.setState({ validate });
    }

    validatePassword(e) {
        const validate = this.state.validate;

        if (/(^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*)$/.test(e.target.value) === false) {
            validate.password = 'invalid';
        } else if (e.target.value.length < 8) {
            validate.password = 'too_short';
        } else {
            validate.password = 'valid';
        }

        this.setState({ validate });
    }

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

                        <div className="w-100 d-block">
                            <p className="w-20  h-30 float-start team-profile-photo-title">Profile Photo Preview:</p>
                            <div className="w-75 float-start">
                                <img src={this.state.preview_photo} alt="profile profile" className="team-profile-photo" />
                            </div>
                        </div>

                        <FormGroup>
                            <Label for="first_name" className="spacing">
                                First Name:
                            </Label>
                            <Input
                                type="text"
                                name="first_name"
                                value={returnDefaultIfFieldEmpty(this.state.first_name)}
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateFirstName(e);
                                }}
                                onTouched={this.validateFirstName}
                                invalid={this.state.validate.first_name !== 'valid'}
                            />
                            <FormFeedback invalid>
                                {this.state.validate.first_name === 'too_short' && <p> Please enter a first name </p>}
                                {this.state.validate.first_name === 'too_long' && <p> First name cannot be longer than 30 characters </p>}
                                {this.state.validate.first_name === 'letters_only' && <p> First name can contain letters only </p>}
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="surname">Last Name:</Label>
                            <Input
                                type="text"
                                name="surname"
                                value={returnDefaultIfFieldEmpty(this.state.surname)}
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateSurname(e);
                                }}
                                onTouched={this.validateSurname}
                                invalid={this.state.validate.surname !== 'valid'}
                            />
                            <FormFeedback invalid>
                                {this.state.validate.surname === 'too_short' && <p> Please enter a last name </p>}
                                {this.state.validate.surname === 'too_long' && <p> Last name cannot be longer than 30 characters </p>}
                                {this.state.validate.surname === 'letters_only' && <p> Last name can contain letters only </p>}
                            </FormFeedback>
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
                            <Input
                                type="text"
                                name="username"
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateUsername(e);
                                }}
                                value={returnDefaultIfFieldEmpty(this.state.username)}
                                onTouched={this.validateOrganisationName}
                                invalid={this.state.validate.username !== 'valid'}
                            />
                            <FormFeedback invalid>
                                {this.state.validate.username === 'too_short' && <p> A username must be at least 6 characters long</p>}
                                {this.state.validate.username === 'too_long' && <p> An username can't be longer than 25 characters </p>}
                                {this.state.validate.username === 'letter_first' && <p> Username must begin with a letter </p>}
                                {this.state.validate.username === 'match_regex' && <p> Username can only contain letters, numbers and _ </p>}
                                {this.state.validate.username === 'taken' && <p> Username is taken </p>}
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input
                                type="text"
                                name="email"
                                value={returnDefaultIfFieldEmpty(this.state.email)}
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateEmail(e);
                                }}
                                onTouched={this.validateEmail}
                                invalid={this.state.validate.email !== 'valid'}
                            />
                            <FormFeedback invalid>{this.state.validate.email === 'invalid' && <p> Please enter a valid email </p>}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Initial password:</Label>
                            <Input
                                type="text"
                                name="password"
                                value={returnDefaultIfFieldEmpty(this.state.password)}
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validatePassword(e);
                                }}
                                onTouched={this.validatePassword}
                                invalid={this.state.validate.password !== 'valid'}
                            />
                            <FormFeedback invalid>
                                {this.state.validate.password === 'invalid' && (
                                    <p> A valid password needs 1 uppercase and 1 lowercase character, a number and a special character </p>
                                )}
                                {this.state.validate.password === 'too_short' && <p> A password has to be at least 8 characters long </p>}
                            </FormFeedback>
                        </FormGroup>

                        {this.state.role !== 'admin' ? (
                            <FormGroup>
                                <Label for="teams">Team(s):</Label>
                                <Multiselect
                                    options={displayTeams(this.state.list_of_teams)}
                                    onSelect={this.onTeamAddition}
                                    onRemove={this.onTeamDeletion}
                                    name="teams"
                                    style={{
                                        chips: { background: 'light blue' },
                                        searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                    }}
                                    placeholder="Add Teams"
                                    displayValue="title"
                                />
                            </FormGroup>
                        ) : (
                            <div></div>
                        )}
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
