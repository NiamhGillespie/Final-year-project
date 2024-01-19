import React, { Component, useState } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { displayTeamLeads, displayTeamMembers, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { API_URL_ORGANISATIONS, API_URL_TEAMS, API_URL_USERS, API_URL_USER_DETAILS } from '../../constants';

export class AddTeam extends Component {
    state = {
        team_name: '',
        team_photo: '',
        team_leads: [],
        team_members: [],
        organisation_id: 2,
        belongs_to: 2,
        organisation: this.get_organisation(),
        team_leads_list: this.getPotentialLeads(),
        team_members_list: this.getPotentialMembers()
    };

    async getPotentialLeads() {
        await axios
            .get(API_URL_USERS + '2/admin/users')
            .then((response) => this.setState({ team_leads_list: response.data.filter((user) => user.role === 'team_lead') }));
    }

    async getPotentialMembers() {
        await axios
            .get(API_URL_USERS + '2/admin/users')
            .then((response) => this.setState({ team_members_list: response.data.filter((user) => user.role === 'team_member') }));
    }

    async componentDidMount() {
        this.resetState();
    }

    resetState() {
        this.getPotentialLeads();
        this.getPotentialMembers();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
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

    addTeam = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('team_photo', this.state.team_photo, this.state.team_photo.name);
        form_data.append('team_name', this.state.team_name);
        this.state.team_leads.forEach((lead) => {
            form_data.append('team_leads', lead);
        });
        this.state.team_members.forEach((member) => {
            form_data.append('team_members', member);
        });
        form_data.append('belongs_to', this.state.belongs_to);

        axios.post(API_URL_TEAMS + this.state.organisation.id + '/admin/teams', form_data).then(() => {
            alert('team created');
            console.log('team added');
        });
    };

    render() {
        return (
            <Form onSubmit={this.addTeam}>
                <h3 className="add-team-title"> Add Team </h3>
                <div className="add-team-box">
                    <div className="left-add-team-box">
                        <FormGroup>
                            <Label for="team_name">Team Name:</Label>
                            <Input type="text" name="team_name" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.team_name)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="team_photo">Team Photo:</Label>
                            <input type="file" name="team_photo" onChange={this.handleFileChange} />
                        </FormGroup>

                        <div className="w-100">
                            <p className="w-20 float-start team-profile-photo-title">Team Photo Preview:</p>
                            <div className="w-75 float-start">
                                <img src={this.state.preview_photo} alt="team profile" className="team-profile-photo" />
                            </div>
                        </div>

                        <FormGroup>
                            <Label for="team_leads">Team Leads:</Label>
                            <Multiselect
                                options={displayTeamLeads(this.state.team_leads_list)}
                                onSelect={this.onLeadAddition}
                                onRemove={this.onLeadDeletion}
                                name="team_leads"
                                style={{
                                    chips: { background: 'green' },
                                    searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                }}
                                placeholder="Add Team Leads"
                                displayValue="title"
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
                                style={{
                                    chips: { background: 'green' },
                                    searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                }}
                                placeholder="Add Team Members"
                                displayValue="title"
                            />
                        </FormGroup>
                    </div>

                    <div>
                        <Button className="btn-primary login-button mt-3 float-end"> Create Team </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default AddTeam;
