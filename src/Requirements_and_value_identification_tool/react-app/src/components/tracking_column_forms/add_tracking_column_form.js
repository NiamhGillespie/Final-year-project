import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_DASHBOARD_TRACKING_COLUMNS } from '../../constants';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class AddColumnForm extends Component {
    ID = 0;

    state = {
        column_id: '0',
        dashboard_id: '0000',
        team_id: '0000',
        title: '',
        mark_as_complete: false,
        stories: [],
        WIP: 0, //same as default in models
        validate: {
            WIP: '',
            title: 'too_short'
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox = (e) => {
        if (this.state.mark_as_complete === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    createColumn = (e) => {
        e.preventDefault();

        if (this.state.validate.WIP !== 'valid' || this.state.validate.title !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            axios.post(API_URL_DASHBOARD_TRACKING_COLUMNS, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

    automaticValidation = (e) => {
        this.validateTitle(e)   
    };

    validateTitle(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.title = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.title = 'too_long';
        } else {
            validate.title = 'valid';
        }

        this.setState({ validate });
    }

    validateWIP(e) {
        const validate = this.state.validate;

        if (/^[0-9]+$/.test(e.target.value) && e.target.value.length !== 0) {
            validate.WIP = 'valid';
        } else {
            validate.WIP = 'invalid';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Form onSubmit={this.createColumn}>
                <FormGroup>
                    <Label for="title">Column title:</Label>
                    <Input
                        type="text"
                        name="title"
                        onChange={(e) => {
                            this.onChange(e);
                            this.validateTitle(e);
                        }}
                        onTouched={this.validateTitle}
                        value={returnDefaultIfFieldEmpty(this.state.title)}
                        invalid={this.state.validate.title === 'too_short' || this.state.validate.title === 'too_long'}
                    />
                    <FormFeedback invalid>
                        {this.state.validate.title === 'too_short' && <p> Please enter a title </p>}
                        {this.state.validate.title === 'too_long' && <p> A title can't be longer than 30 characters </p>}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="WIP">WIP limit:</Label>
                    <Input
                        type="text"
                        name="WIP"
                        onChange={(e) => {
                            this.onChange(e);
                            this.validateWIP(e);
                        }}
                        value={returnDefaultIfFieldEmpty(this.state.WIP)}
                        invalid={this.state.validate.WIP === 'invalid'}
                    />
                    <FormFeedback invalid>Please enter a positive integer, 0 means that no WIP limit will be applied</FormFeedback>
                </FormGroup>

                <FormGroup className="checkbox-styling">
                    <Label for="mark_as_complete">Mark stories that are in this column as complete: </Label>
                    <Input
                        type="checkbox"
                        name="mark_as_complete"
                        onChange={this.onChangeCheckbox}
                        value={returnDefaultIfFieldEmpty(this.state.mark_as_complete)}
                        disabled={this.state.title === 'Done'}
                        checked={this.state.title === 'Done'}
                    />
                </FormGroup>

                <Button className="btn-primary">Create Column</Button>
            </Form>
        );
    }
}

export default AddColumnForm;
