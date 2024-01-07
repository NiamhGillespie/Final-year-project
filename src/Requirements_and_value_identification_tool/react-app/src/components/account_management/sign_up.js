import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

export class SignUp extends Component {
    state = {
        organisation_name: '',
        logo: '',

        username: '',
        first_name: '',
        surname: '',
        email_address: '',
        password: ''
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeLogo(e) {
        console.log(e.target.value);
        this.setState({ [e.target.name]: URL.createObjectURL(e.target.value)});
    }

    signIn(){
        console.log("signing in ...")
    }

    render() {
        return (
            <Form onSubmit={this.signIn}>
                <div className="sign-up-box">
                    <h3 className="text-center mb-3 text"> Organisation sign up </h3>

                    <div className="w-50 h-75 pe-3 float-start mb-4 display-border">
                        Organisation Details
                        <hr className='mt-0'></hr>

                        <FormGroup>
                            <Label for="organisation_name">Organisation Name:</Label>
                            <Input
                                type="text"
                                name="organisation_name"
                                onChange={this.onChange}
                                value={returnDefaultIfFieldEmpty(this.state.organisation_name)}
                            />
                        </FormGroup>

                        <FormGroup controlId="formFile">
                            <Label for="logo">Logo:</Label>
                            <Input type="file" name="logo" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.logo)} />
                        </FormGroup>

                        {this.state.logo !== '' ? (
                            <img src={this.state.logo} alt="logo"/>
                        ) : (
                            <p> no logo yet </p>
                        )}
                    </div>

                    <div className="w-50 h-75 ps-3 float-end border-right border-light mb-4">
                        Admin Account Details
                        <hr className='mt-0'></hr>
                        <FormGroup>
                            <Label for="username">Username:</Label>
                            <Input type="text" name="username" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.username)} />
                        </FormGroup>

                        <FormGroup className=' w-45 float-start me-1'>
                            <Label for="first_name">First Name:</Label>
                            <Input type="text" name="first_name" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.first_name)} />
                        </FormGroup>

                        <FormGroup className=' w-45 float-end ms-1'>
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
