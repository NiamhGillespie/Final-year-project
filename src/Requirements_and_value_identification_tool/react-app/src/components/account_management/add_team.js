import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { displayTeamLeads, displayTeamMembers, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { API_URL_TEAMS, API_URL_USERS } from '../../constants';

export class AddTeam extends Component {
    state = {
        team_name: '',
        team_photo: '',
        team_leads: [],
        team_members: [],
        belongs_to: this.props.user.belongs_to,
        team_leads_list: this.getPotentialLeads(),
        team_members_list: this.getPotentialMembers(),

        validate: {
            team_name: 'too_short'
        }
    };

    async getPotentialLeads() {
        await axios
            .get(API_URL_USERS + this.props.user.belongs_to + '/admin/users')
            .then((response) => this.setState({ team_leads_list: response.data.filter((user) => user.role === 'team_lead') }));
    }

    async getPotentialMembers() {
        await axios
            .get(API_URL_USERS + this.props.user.belongs_to + '/admin/users')
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

        if (this.state.validate.team_name === 'valid') {
            let form_data = new FormData();
            if (this.state.team_photo !== '') {
                form_data.append('team_photo', this.state.team_photo, this.state.team_photo.name);
            }

            form_data.append('team_name', this.state.team_name);
            this.state.team_leads.forEach((lead) => {
                form_data.append('team_leads', lead);
            });
            this.state.team_members.forEach((member) => {
                form_data.append('team_members', member);
            });
            form_data.append('belongs_to', this.state.belongs_to);

            axios.post(API_URL_TEAMS + this.state.belongs_to + '/admin/teams', form_data).then(() => {
                alert('team created');
                window.location.reload(); 
            });
        } else {
            alert('Add team is invalid')
        }
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

    render() {
        return (
            <Form onSubmit={this.addTeam}>
                <h3 className="add-team-title"> Add Team </h3>
                <div className="add-team-box">
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
                            <input type="file" name="team_photo"  title="team_photo" onChange={this.handleFileChange} />
                        </FormGroup>

                        <div className="w-100">
                            <p className="w-20 float-start team-profile-photo-title">Team Photo Preview:</p>
                            <div className="w-75 float-start">
                                <img src={this.state.preview_photo} alt="team profile" className="team-profile-photo" />
                            </div>
                        </div>

                    </div>

                    <div className="right-add-team-box">

                    <FormGroup className='mb-5'>
                            <Label for="team_leads">Team Leads:</Label>
                            <Multiselect
                                options={displayTeamLeads(this.state.team_leads_list)}
                                onSelect={this.onLeadAddition}
                                onRemove={this.onLeadDeletion}
                                title="team_leads"
                                name="team_leads"
                                style={{
                                    chips: { background: 'green' },
                                    searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                }}
                                placeholder="Add Team Leads"
                                displayValue="title"
                            />
                        </FormGroup>


                        <FormGroup className='mt-5'>
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
                                title="team_members"
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
