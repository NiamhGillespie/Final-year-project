import React, { Component, useEffect, useState } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import 'react-circular-progressbar/dist/styles.css';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import { useLocation } from 'react-router-dom';
import { API_URL_TEAMS } from '../../constants';
import axios from 'axios';
import DisplayUserTeams from '../helper_components/displayUserTeams';
import UnauthorisedPage from '../unauthorised_page';

export function UserDetails() {
    const location = useLocation();
    var user_details = location.state;

    if (location.state === null) {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            return <UnauthorisedPage />;
        } else {
            if (user.role === 'admin') {
                return <div className="lone-error-text">No user details provided </div>;
            } else {
                return <UnauthorisedPage />;
            }
        }
    } else {
        user_details = user_details.user;
    }

    return (
        <div>
            <h3 className="add-team-title"> User Profile </h3>

            <div className="teams-details-box">
                <div className="user-details-section-one">
                    {user_details.profile_photo === 'http://localhost:8000/null' || user_details.profile_photo === null ? (
                        <img src="http://localhost:8000/media/profile_images/default.jpg" alt="user profile" className="large-circular-photo" />
                    ) : (
                        <img src={user_details.profile_photo} alt="user profile" className="large-circular-photo" />
                    )}

                    <p className="team-name-title">
                        {user_details.first_name} {user_details.surname} - #{user_details.id}
                    </p>
                    <p className="team-subtitle"> {user_details.role}</p>

                    <div className="user-details-form-block">
                        <p>
                            <u> User Details </u>
                        </p>
                        <FormGroup>
                            <Label for="username">Email:</Label>
                            <Input type="text" name="username" value={returnDefaultIfFieldEmpty(user_details.email)} disabled />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input type="password" name="password" value={returnDefaultIfFieldEmpty(user_details.password)} disabled />
                        </FormGroup>
                    </div>
                </div>

                {user_details.role !== 'admin' ? (
                    <div className="user-details-section-two">
                        <p className="team-members-heading"> Teams </p>
                        <DisplayUserTeams teams={user_details.teams} belongs_to={user_details.belongs_to} links={true} />
                    </div>
                ) : (
                    <div className=""></div>
                )}
            </div>
        </div>
    );
}

export default UserDetails;
