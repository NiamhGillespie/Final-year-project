import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../../css/calender.css';
import { API_URL_SPRINT_DETAILS } from '../../constants';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class EditSprintForm extends Component {
    state = {
        sprint_id: this.props.sprint.sprint_id,
        dashboard_id: this.props.sprint.dashboard_id,
        start_date: this.props.sprint.start_date,
        end_date: this.props.sprint.end_date,
        stories: this.props.sprint.stories,
        story_list: this.props.sprint.story_list,

        validate: {
            start_date: 'valid',
            end_date: 'valid'
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeStartDate = (e) => {
        this.setState({ start_date: e });
    };

    onChangeEndDate = (e) => {
        this.setState({ end_date: e });
    };

    updateSettings = (e) => {
        e.preventDefault();

        if (this.state.validate.start_date !== 'valid' || this.state.validate.end_date !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            axios.put(API_URL_SPRINT_DETAILS + this.state.sprint_id, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

    validateStartDate(e) {
        const validate = this.state.validate;

        if (e.length === 0) {
            validate.start_date = 'not_entered';
        } else {
            validate.start_date = 'valid';
        }

        this.setState({ validate });
    }

    validateEndDate(e) {
        const validate = this.state.validate;

        if (e.length === 0) {
            validate.end_date = 'not_entered';
        } else {
            validate.end_date = 'valid';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Form onSubmit={this.updateSettings}>
                <div className="d-flex">
                    <FormGroup style={{ paddingRight: '1vw' }}>
                        <Label for="start_date">Start Date:</Label>
                        <Calendar
                            name="start_date"
                            onChange={(e) => {
                                this.onChangeStartDate(e);
                                this.validateStartDate(e);
                            }}
                            onTouched={this.validateStartDate}
                            value={returnDefaultIfFieldEmpty(this.state.start_date)}
                        />
                        <div className="custom-form-error-message">
                            {this.state.validate.start_date === 'not_entered' && <p> ⓘ Please choose a start date </p>}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for="end_date">End Date:</Label>
                        <Calendar
                            name="end_date"
                            onChange={(e) => {
                                this.onChangeEndDate(e);
                                this.validateEndDate(e);
                            }}
                            onTouched={this.validateEndDate}
                            value={returnDefaultIfFieldEmpty(this.state.end_date)}
                        />
                        <div className="custom-form-error-message">
                            {this.state.validate.end_date === 'not_entered' && <p> ⓘ Please choose an end date </p>}
                        </div>
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label for="2">Setting Two:</Label>
                    <Input type="text" name="2" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state)} />
                </FormGroup>

                <Button className="btn-primary">Update Sprint</Button>
            </Form>
        );
    }
}

export default EditSprintForm;
