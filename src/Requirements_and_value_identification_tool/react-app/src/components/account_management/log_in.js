import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

export class LogIn extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Form onSubmit={this.createStory}>
                <div className="login-box">
                    Login to -brand name-!
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input type="text" name="username" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.username)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="text" name="password" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.password)} />
                    </FormGroup>

                    <p>Don’t have an account? Add your organistation or contact your system administrator!</p>

                    <Button className='btn-primary login-button'> Log in </Button>
                </div>
            </Form>
        );
    }
}

export default LogIn;
