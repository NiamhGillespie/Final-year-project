import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import 'react-circular-progressbar/dist/styles.css';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

export class UserDetails extends Component {
    state = {
        //get this info from user
        username: 'nimhgia',
        password: 'password',
        email: 'fakeemail@gmail.com',
    };

    //get user from API function

    resetState() {
        //call getUser funct
    }

    displayTeams() {
        const teams = [1, 2]; //this.state.teams;
        var returnList = [];

        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    <p className="small-team-member-photo" />
                    <p className="small-team-member-info"> Team name {teams[i]}</p>
                </div>
            );
        }
        return returnList;
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> User Profile </h3>

                <div className="teams-details-box">
                    <div className="user-details-section-one">
                        <div className="large-circular-photo"> </div>
                        <p className="team-name-title"> Niamh Gillespie - ID </p>
                        <p className="team-subtitle"> Team Member</p>

                        <div className="user-details-form-block">
                            <p>
                                <u> User Details </u>
                            </p>
                            <FormGroup>
                                <Label for="username">Email:</Label>
                                <Input type="text" name="username" value={returnDefaultIfFieldEmpty(this.state.email)} disabled />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password:</Label>
                                <Input type="password" name="password" value={returnDefaultIfFieldEmpty(this.state.password)} disabled />
                            </FormGroup>

                            <Button className='btn-primary float-end'> Update Details </Button>
                        </div>
                    </div>

                    <div className="user-details-section-two">
                        <p className="team-members-heading"> Teams </p>
                        {this.displayTeams()}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;
