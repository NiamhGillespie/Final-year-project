import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_SHORT, API_URL_TEAMS, API_URL_TEAM_DETAILS, API_URL_USERS, SHORT_URL } from '../../constants';
import {
    displayTeamLeads,
    displayTeamMembers,
    displayTeams,
    preselectedTeamLeads,
    preselectedTeamMembers,
    preselectedTeams,
    returnDefaultIfFieldEmpty
} from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';

class EditTeamForm extends Component {
    state = {
        team_name: this.props.team.team_name,
        team_photo: this.props.team.team_photo,
        team_leads: this.props.team.team_leads,
        team_members: this.props.team.team_members,
        belongs_to: this.props.team.belongs_to,
        team_leads_list: this.getPotentialLeads(),
        team_members_list: this.getPotentialMembers(),
        preview_photo: this.props.team.team_photo,

        validate: {
            team_name: 'valid'
        }
    };

    async getPotentialLeads() {
        await axios
            .get(API_URL_USERS + this.props.team.belongs_to + '/admin/users')
            .then((response) => this.setState({ team_leads_list: response.data.filter((user) => user.role === 'team_lead') }));
    }

    async getPotentialMembers() {
        await axios
            .get(API_URL_USERS + this.props.team.belongs_to + '/admin/users')
            .then((response) => this.setState({ team_members_list: response.data.filter((user) => user.role === 'team_member') }));
    }

    async getTeams() {
        var teams = await axios.get(API_URL_TEAMS + this.props.team.belongs_to + '/admin/teams');
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

    updateTeam = (e) => {
        e.preventDefault();

        if (this.state.validate.team_name === 'valid') {
            let form_data = new FormData();
            if (this.state.photo_edited) {
                form_data.append('team_photo', this.state.team_photo, this.state.team_photo.name);
            }
            form_data.append('team_name', this.state.team_name);
            this.state.team_leads.forEach((lead) => {
                form_data.append('team_leads', lead);
            });
            this.state.team_members.forEach((member) => {
                form_data.append('team_members', member);
            });

            axios.put(API_URL_TEAM_DETAILS + this.props.team.id, form_data).then(() => {
                this.props.toggle();
                this.props.resetState();
            });
        } else {
            alert('Form is invalid');
        }
    };

    onLeadAddition = (e) => {
        var team_lead_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_lead_ids.push(e[i].id);
        }
        this.setState({ team_leads: team_lead_ids });
    };

    onLeadDeletion = (e) => {
        var team_lead_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_lead_ids.push(e[i].id);
        }
        this.setState({ team_leads: team_lead_ids });
    };

    onMemberAddition = (e) => {
        var team_member_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_member_ids.push(e[i].id);
        }
        this.setState({ team_members: team_member_ids });
    };

    onMemberDeletion = (e) => {
        var team_member_ids = [];
        for (var i = 0; i < e.length; i++) {
            team_member_ids.push(e[i].id);
        }
        this.setState({ team_members: team_member_ids });
    };

    validateTeamName(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.team_name = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.team_name = 'too_long';
        } else {
            validate.team_name = 'valid';
        }

        this.setState({ validate });
    }

    deleteTeam() {
        if (window.confirm("Delete team '" + this.props.team.team_name + "'? All dashboards will be lost.")) {
            axios.delete(API_URL_TEAM_DETAILS + this.props.team.id).then(() => {
                this.props.resetState(this.state);
                this.props.toggle();
                alert('Team deleted');
            });
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <div className="edit-user-box">
                        <div className="left-add-team-box">
                            <FormGroup>
                                <Label for="team_name">Team Name:</Label>
                                <Input
                                    type="text"
                                    name="team_name"
                                    title="team_name"
                                    value={returnDefaultIfFieldEmpty(this.state.team_name)}
                                    onChange={(e) => {
                                        this.onChange(e);
                                        this.validateTeamName(e);
                                    }}
                                    onTouched={this.validateTeamName}
                                    invalid={this.state.validate.team_name !== 'valid'}
                                />
                                <FormFeedback invalid>
                                    {this.state.validate.team_name === 'too_short' && <p> Please enter a team name </p>}
                                    {this.state.validate.team_name === 'too_long' && <p> A team name cannot be longer than 30 characters </p>}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="team_photo">Team Photo:</Label>
                                <input type="file" name="team_photo" title="team_photo" onChange={this.handleFileChange} />
                            </FormGroup>

                            <div className="w-100 photo-section">
                                <p className="float-start edit-title team-profile-photo-title" title="team_pp_photo">Team Photo Preview:</p>
                                <div className="edit-photo float-start">
                                    {this.state.preview_photo === SHORT_URL + 'null' || this.state.preview_photo === null ? (
                                        <img
                                            src= {SHORT_URL + "media/profile_images/default.jpg"}
                                            alt="team profile"
                                            className="team-profile-photo"
                                        />
                                    ) : (
                                        <img src={this.state.preview_photo} alt="team profile" className="team-profile-photo" />
                                    )}
                                </div>
                            </div>

                            <FormGroup>
                                <Label for="team_leads">Team Leads:</Label>
                                <Multiselect
                                    options={displayTeamLeads(this.state.team_leads_list)}
                                    onSelect={this.onLeadAddition}
                                    onRemove={this.onLeadDeletion}
                                    name="team_leads"
                                    title="team_leads"
                                    style={{
                                        chips: { background: 'green' },
                                        searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                    }}
                                    placeholder="Add Team Leads"
                                    displayValue="title"
                                    selectedValues={preselectedTeamLeads(this.state.team_leads, this.state.team_leads_list)}
                                />
                            </FormGroup>
                        </div>

                        <div className="right-add-team-box">
                            <FormGroup>
                                <Label for="team_members">Team Members:</Label>
                                <Multiselect
                                    options={displayTeamMembers(this.state.team_members_list)}
                                    onSelect={this.onMemberAddition}
                                    onRemove={this.onMemberDeletion}
                                    name="team_members"
                                    title="team_members"
                                    style={{
                                        chips: { background: 'green' },
                                        searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                    }}
                                    placeholder="Add Team Members"
                                    displayValue="title"
                                    selectedValues={preselectedTeamMembers(this.state.team_members, this.state.team_members_list)}
                                />
                            </FormGroup>
                        </div>

                        <div className="float-start">
                            <Button className="btn-delete login-button mt-3 float-start" title="delete_button" onClick={() => this.deleteTeam()}>
                                Delete Team
                            </Button>
                        </div>

                        <div>
                            <Button className="btn-primary login-button mt-3 float-end" onClick={this.updateTeam}>
                                Update Team
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default EditTeamForm;
