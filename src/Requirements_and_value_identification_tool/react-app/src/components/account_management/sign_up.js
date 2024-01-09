/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import axios from 'axios';
import { API_URL, API_URL_ORGANISATIONS, API_URL_USERS } from '../../constants';

export class SignUp extends Component {
    state = {
        organisation: {
            name: '',
            logo: ''
        },

        admin: {
            username: '',
            first_name: '',
            surname: '',
            email_address: '',
            password: ''
        }
    };

    onChange = (e) => {
        if (e.target.name === 'name' || e.target.name === 'logo') {
            this.state.organisation[e.target.name] = e.target.value;
        } else {
            this.state.admin[e.target.name] = e.target.value;
        }
    };

    onChangeLogo(e) {
        console.log(e.target.value);
        this.setState({ [e.target.name]: URL.createObjectURL(e.target.value) });
    }

    async get_organisation() {
        var organisation = await axios
            .get(API_URL_ORGANISATIONS)
            .then((response) => response.data);

        console.log(organisation[organisation.length -1].name)
        if (organisation[organisation.length -1].name === this.state.organisation.name) {
            axios.post(API_URL_USERS + organisation[organisation.length -1].id + '/admin/users', this.state.admin).then(() => {
            alert('user created');
        });
        } else {
            alert("error try again")
        }
        console.log("organisation", organisation[organisation.length -1].name, this.state.organisation.name,
        organisation[organisation.length -1].name === this.state.organisation.name ); //
        return organisation;
    }

    async create_org() {
        await axios.post(API_URL_ORGANISATIONS, this.state.organisation).then(() => {
            alert('organisation created');
        });
    }

    async create_org_and_users() {
        await this.create_org()

        await this.get_organisation()
    }
    signIn = (e) => {
        console.log('signing in ...');
        console.log(this.state);
        e.preventDefault();

        console.log(this.state.organisation);
        
        this.create_org_and_users();

    };

    render() {
        return (
            <Form onSubmit={this.signIn}>
                <div className="sign-up-box">
                    <h3 className="text-center mb-3 text"> Organisation sign up </h3>

                    <div className="w-50 h-75 pe-3 float-start mb-4 display-border">
                        Organisation Details
                        <hr className="mt-0"></hr>
                        <FormGroup>
                            <Label for="name">Organisation Name:</Label>
                            <Input type="text" name="name" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.name)} />
                        </FormGroup>
                        <FormGroup controlId="formFile">
                            <Label for="logo">Logo:</Label>
                            <Input type="file" name="logo" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.logo)} />
                        </FormGroup>
                        {this.state.logo !== '' ? <img src={this.state.logo} alt="logo" /> : <p> no logo yet </p>}
                    </div>

                    <div className="w-50 h-75 ps-3 float-end border-right border-light mb-4">
                        Admin Account Details
                        <hr className="mt-0"></hr>
                        <FormGroup>
                            <Label for="username">Username:</Label>
                            <Input type="text" name="username" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.username)} />
                        </FormGroup>
                        <FormGroup className=" w-45 float-start me-1">
                            <Label for="first_name">First Name:</Label>
                            <Input type="text" name="first_name" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.first_name)} />
                        </FormGroup>
                        <FormGroup className=" w-45 float-end ms-1">
                            <Label for="surname">Surname:</Label>
                            <Input type="text" name="surname" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.surname)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email_address">Email Address:</Label>
                            <Input
                                type="text"
                                name="email_address"
                                onChange={this.onChange}
                                value={returnDefaultIfFieldEmpty(this.state.email_address)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input type="text" name="password" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.password)} />
                        </FormGroup>
                    </div>

                    <div>
                        <p className="text-center mb-2 mt-5"> Is your organisation already signed up? Log in here!</p>
                        <Button className="btn-primary login-button mt-0"> Sign Up </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default SignUp;
