/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import axios from 'axios';
import { API_URL, API_URL_ORGANISATIONS, API_URL_SHORT, API_URL_USERS } from '../../constants';
import { Link, redirect } from 'react-router-dom';

export class SignUp extends Component {
    state = {
        organisation: {
            name: '',
        },

        admin: {
            username: '',
            first_name: '',
            surname: '',
            email: '',
            password: '',
            role: 'admin',
            belongs_to: ''
        },

        validate: {
            organisation_name: 'too_short',
            username: 'too_short',
            first_name: 'too_short',
            surname: 'too_short',
            email: 'invalid',
            password: 'invalid'
        },

        usernames: []
    };

    async existingUsernames() {
        await axios.get(API_URL_SHORT + 'getUsernames').then((response) => this.setState({ usernames: response.data }));
    }

    componentDidMount() {
        this.existingUsernames()
    }

    onChange = (e) => {
        if (e.target.name === 'name' || e.target.name === 'logo') {
            this.state.organisation[e.target.name] = e.target.value;
        } else {
            this.state.admin[e.target.name] = e.target.value;
        }
    };


    async get_organisation() {
        var organisation = await axios.get(API_URL_ORGANISATIONS).then((response) => response.data);

        if (organisation[organisation.length - 1].name === this.state.organisation.name) {
            this.state.admin.belongs_to = organisation[organisation.length - 1].id;
            await axios.post(API_URL_USERS + organisation[organisation.length - 1].id + '/admin/users', this.state.admin).then(() => {});
        } else {
            alert('error try again');
        }
        
        alert("organisation created")
        window.location.reload(); 
        return organisation;
    }

    async create_org() {
        await axios.post(API_URL_ORGANISATIONS, this.state.organisation).then(() => {});
    }

    async create_org_and_users() {
        await this.create_org();

        await this.get_organisation();
    }

    signIn = (e) => {
        e.preventDefault();


        if (
            this.state.validate.organisation_name === 'valid' &&
            this.state.validate.username === 'valid' &&
            this.state.validate.first_name === 'valid' &&
            this.state.validate.surname === 'valid' &&
            this.state.validate.email === 'valid' &&
            this.state.validate.password === 'valid'
        ) {
            this.create_org_and_users();
        } else {
            alert("Sign up form is invalid")
        }
            
    };

    validateOrganisationName(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.organisation_name = 'too_short';
        } else if (e.target.value.length > 50) {
            validate.organisation_name = 'too_long';
        } else {
            validate.organisation_name = 'valid';
        }

        this.setState({ validate });
    }

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
        var user = JSON.parse(localStorage.getItem('user'));

        if (user !== null) {
            return <div className="lone-error-text"> You are currently logged in - please log out to sign up with a new account</div>;
        }
        return (
            <Form onSubmit={this.signIn}>
                <div className="sign-up-box">
                    <h3 className="text-center mb-2 mt-0 text"> Organisation sign up </h3>

                    <div className="w-50 h-75 pe-3 float-start mb-4 display-border">
                        Organisation Details
                        <hr className="mt-0"></hr>
                        <FormGroup>
                            <Label for="name">Organisation Name:</Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateOrganisationName(e);
                                }}
                                value={returnDefaultIfFieldEmpty(this.state.name)}
                                onTouched={this.validateOrganisationName}
                                invalid={
                                    this.state.validate.organisation_name === 'too_short' || this.state.validate.organisation_name === 'too_long'
                                }
                            />
                            <FormFeedback invalid>
                                {this.state.validate.organisation_name === 'too_short' && <p> Please enter an organisation name </p>}
                                {this.state.validate.organisation_name === 'too_long' && (
                                    <p> An organisation name can't be longer than 50 characters </p>
                                )}
                            </FormFeedback>
                        </FormGroup>
                        
                    </div>

                    <div className="w-50 h-75 ps-3 float-end border-right border-light mb-4">
                        Admin Account Details
                        <hr className="mt-0"></hr>
                        <FormGroup className="form-height">
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
                        <FormGroup className=" name-section float-start form-height">
                            <Label for="first_name">First Name:</Label>
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
                        <FormGroup className="name-section float-end form-height d-block">
                            <Label for="surname">Surname:</Label>
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
                                {this.state.validate.surname === 'too_short' && <p> Please enter a surname </p>}
                                {this.state.validate.surname === 'too_long' && <p> Surname cannot be longer than 30 characters </p>}
                                {this.state.validate.surname === 'letters_only' && <p> Surname can contain letters only </p>}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup className="email-section form-height">
                            <Label for="email">Email Address:</Label>
                            <Input
                                type="text"
                                name="email"
                                value={returnDefaultIfFieldEmpty(this.state.email_address)}
                                onChange={(e) => {
                                    this.onChange(e);
                                    this.validateEmail(e);
                                }}
                                onTouched={this.validateEmail}
                                invalid={this.state.validate.email !== 'valid'}
                            />
                            <FormFeedback invalid>{this.state.validate.email === 'invalid' && <p> Please enter a valid email </p>}</FormFeedback>
                        </FormGroup>
                        <FormGroup className="form-height mb-1">
                            <Label for="password">Password:</Label>
                            <Input
                                type="password"
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
                    </div>

                    <div className="d-block">
                        <p className="sign-up-section  text-center mb-1 mt-5">
                            Is your organisation already signed up? <Link to="/login"> Log in here! </Link>
                        </p>
                        <Button className="btn-primary login-button mt-0"> Sign Up </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default SignUp;
