import React, { Component, useState } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { API_URL_ORGANISATIONS, API_URL_TEAMS } from '../../constants';

export class AddTeam extends Component {
    state = {
        team_name: '',
        team_photo: '',
        team_leads: [],
        team_members: [],
        organisation_id: 2,
        belongs_to: 2,
        organisation: this.get_organisation()


    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
        this.setState({
            [e.target.name]: URL.createObjectURL( e.target.files[0]),
        });
    }

    async get_organisation() {
        var organisations = await axios
            .get(API_URL_ORGANISATIONS)
            .then((response) => response.data);

        const organisation = organisations.filter((org) => org.id === this.state.organisation_id)

        this.state.organisation = organisation[0];
        return organisation[0];
    }

    addTeam = (e) => {
        e.preventDefault();
        console.log('adding team...');
        console.log(this.state.team_photo)
        console.log(this.state.organisation, this.state)
        axios.post(API_URL_TEAMS + this.state.organisation.id + '/admin/teams', this.state).then(() => {
            alert('team created');
            console.log("team added")
        });

    }
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
                            <input type="file" name="team_photo" onChange={this.handleFileChange}/>
                        </FormGroup>

                        <div className='w-100'>
                            <p className='w-20 float-start team-profile-photo-title'>Team Photo Preview:</p>
                            <div className='w-75 float-start'>
                                <img src={this.state.team_photo} alt="team profile" className='team-profile-photo'/>
                            </div>
                        </div>

                        <FormGroup>
                            <Label for="team_leads">Team Leads:</Label>
                            <Multiselect
                                name="team_leads"
                                onChange={this.onChange}
                                value={returnDefaultIfFieldEmpty(this.state.team_photo)}
                                // options={displayValues(this.state.team_values)}
                                // onSelect={this.onLeadAddition}
                                //onRemove={this.onLeadDeletion}
                                style={{
                                    chips: { background: 'green' },
                                    searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                }}
                                placeholder="Add Team Leads"
                            />
                        </FormGroup>
                    </div>

                    <div className="right-add-team-box">
                        <FormGroup>
                            <Label for="team_members">Team Members:</Label>
                            <Multiselect
                                name="team_members"
                                onChange={this.onChange}
                                value={returnDefaultIfFieldEmpty(this.state.team_members)}
                                // options={displayValues(this.state.team_values)}
                                // onSelect={this.onUserAddition}
                                //onRemove={this.onUserDeletion}
                                style={{
                                    chips: { background: 'green' },
                                    searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                                }}
                                placeholder="Add Team Leads"
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
