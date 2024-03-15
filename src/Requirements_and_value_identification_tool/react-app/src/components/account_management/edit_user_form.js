import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_ORGANISATIONS, API_URL_SHORT, API_URL_TAG_DETAILS, API_URL_TEAMS, API_URL_USERS, API_URL_USER_DETAILS, SHORT_URL } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { displayTeams, preselectedTeams, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class EditUserForm extends Component {
    state = {
        username: this.props.user.username,
        original_username: this.props.user.username,
        first_name: this.props.user.first_name,
        surname: this.props.user.surname,
        role: this.props.user.role,
        teams: this.props.user.teams,
        profile_photo: this.props.user.profile_photo,
        password: this.props.user.password,
        email: this.props.user.email,
        belongs_to: this.props.user.belongs_to,
        organisation: this.get_organisation(),
        list_of_teams: this.getTeams(),
        preview_photo: this.props.user.profile_photo,
        photo_edited: false,

        validate: {
            username: 'valid',
            first_name: 'valid',
            surname: 'valid',
            email: 'valid',
            password: 'valid'
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
        this.existingUsernames();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeTeams = (e) => {
        this.setState({ [e.target.name]: [e.target.value] });
    };

    handleFileChange = (e) => {
        this.state.photo_edited = true;
        this.setState({
            [e.target.name]: e.target.files[0]
        });

        this.setState({
            preview_photo: URL.createObjectURL(e.target.files[0])
        });
    };

    async get_organisation() {
        var organisations = await axios.get(API_URL_ORGANISATIONS).then((response) => response.data);

        const organisation = organisations.filter((org) => org.id === this.state.organisation_id);

        this.state.organisation = organisation[0];
        return organisation[0];
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
            if (this.state.photo_edited) {
                form_data.append('profile_photo', this.state.profile_photo, this.state.profile_photo.name);
            }

            form_data.append('username', this.state.username);
            form_data.append('password', this.state.password);
            form_data.append('email', this.state.email);
            form_data.append('first_name', this.state.first_name);
            form_data.append('surname', this.state.surname);
            form_data.append('role', this.state.role);
            if (this.state.teams.length !== 0) {
                this.state.teams.forEach((team) => {
                    form_data.append('teams', team);
                });
            }

            axios.put(API_URL_USER_DETAILS + this.props.user.id, form_data).then(() => {
                this.props.toggle();
                this.props.resetState();

                
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
        } else if (this.state.usernames.includes(e.target.value) && this.state.original_username !== e.target.value) {
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

    deleteUser() {
        if (window.confirm("Delete user '" + this.props.user.username + "'? All information will be lost.")) {
            axios.delete(API_URL_USER_DETAILS + this.props.user.id).then(() => {
                this.props.resetState(this.state);
                this.props.toggle();
                alert('User deleted');
            });
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addUser}>
                    <div className="edit-user-box">
                        <div className="left-add-team-box">
                            <FormGroup>
                                <Label for="profile_photo">Profile Photo:</Label>
                                <input type="file" name="profile_photo " title="profile_photo" onChange={this.handleFileChange} />
                            </FormGroup>

                            <div className="w-100 photo-section">
                                <p className="float-start edit-title team-profile-photo-title">Profile Photo Preview:</p>
                                <div className="edit-photo float-start">
                                    {this.state.preview_photo === SHORT_URL + 'null' || this.state.preview_photo === null ? (
                                        <img
                                            src={SHORT_URL + "media/profile_images/default.jpg"}
                                            alt="user profile"
                                            className="team-profile-photo"
                                        />
                                    ) : (
                                        <img src={this.state.preview_photo} alt="user profile" className="team-profile-photo" />
                                    )}
                                </div>
                            </div>

                            <FormGroup>
                                <Label for="first_name">First Name:</Label>
                                <Input
                                    type="text"
                                    name="first_name"
                                    title="first_name"
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
                                    title="surname"
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
                                <select value={this.state.role} onChange={this.onChange} name="role" title="role" className="ms-2 role-dropdown-disabled" disabled>
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
                                    title="username"
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
                                    title="email"
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
                                <Label for="password">Password:</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    title="password"
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
                                        title="teams"
                                        name="teams"
                                        style={{
                                            chips: { background: 'light blue' },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                        }}
                                        placeholder="Add Teams"
                                        displayValue="title"
                                        selectedValues={preselectedTeams(this.state.teams, this.state.list_of_teams)}
                                    />
                                </FormGroup>
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div className="float-start">
                            <Button className="btn-delete login-button mt-3 float-start" title="delete_button" onClick={() => this.deleteUser()}>
                                Delete User
                            </Button>
                        </div>
                        <div>
                            <Button className="btn-primary login-button mt-3 float-end"> Update User </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default EditUserForm;
