import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/account_management.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import Multiselect from 'multiselect-react-dropdown';

export class AddTeam extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeLogo(e) {
        console.log(e.target.value);
        this.setState({ [e.target.name]: URL.createObjectURL(e.target.value) });
    }

    addTeam() {
        console.log('adding team...');
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
                            <Input type="file" name="team_photo" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.team_photo)} />
                        </FormGroup>

                        <div className='w-100'>
                            <p className='w-20 float-start team-profile-photo-title'>Team Photo Preview:</p>
                            <div className='w-75 float-start'>
                            <p className="team-profile-photo"/>
                            </div>
                        </div>

                        <FormGroup>
                            <Label for="team_leads">Team Leads:</Label>
                            <Multiselect
                                name="team_leads"
                                onChange={this.onChange}
                                value={returnDefaultIfFieldEmpty(this.state.team_photo)}
                                // options={displayValues(this.state.team_values)}
                                // onSelect={this.onValueAddition}
                                //onRemove={this.onValueDeletion}
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
                                // onSelect={this.onValueAddition}
                                //onRemove={this.onValueDeletion}
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
