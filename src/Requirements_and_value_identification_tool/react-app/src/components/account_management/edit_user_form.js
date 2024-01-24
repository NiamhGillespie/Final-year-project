import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_ORGANISATIONS, API_URL_TAG_DETAILS, API_URL_TEAMS, API_URL_USERS, API_URL_USER_DETAILS } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { displayTeams, preselectedTeams, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class EditUserForm extends Component {
    state = {
        username: this.props.user.username,
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
    };

    async getTeams() {
        var teams = await axios.get(API_URL_TEAMS + this.props.user.belongs_to + '/admin/teams');
        this.setState({ list_of_teams: teams.data });
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

    updateTag = (e) => {
        e.preventDefault();

        // axios.put(API_URL_TAG_DETAILS + this.state.tag_id, this.state).then(() => {
        //     this.props.resetState();
        //     this.props.toggle();
        // });
    };

    addUser = (e) => {
        e.preventDefault();

        
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

    render() {
        return (
            <div>
                <Form onSubmit={this.addUser}>
                <div className="edit-user-box">
                    <div className="left-add-team-box">
                        <FormGroup>
                            <Label for="profile_photo">Profile Photo:</Label>
                            <input type="file" name="profile_photo" onChange={this.handleFileChange} />
                        </FormGroup>

                        <div className="w-100 photo-section">
                            <p className="float-start edit-title team-profile-photo-title">Profile Photo Preview:</p>
                            <div className="edit-photo float-start">
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
                            <select value={this.state.role} onChange={this.onChange} name="role" className="ms-2 role-dropdown-disabled" disabled>
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
                            <Label for="password">Password:</Label>
                            <Input type="text" name="password" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.password)} />
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
                                    selectedValues={preselectedTeams(this.state.teams, this.state.list_of_teams)}
                                />
                            </FormGroup>
                        ) : (
                            <div></div>
                        )}
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
