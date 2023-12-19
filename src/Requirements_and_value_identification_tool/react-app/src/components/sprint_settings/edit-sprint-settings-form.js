import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../../css/calender.css';
import { API_URL_SPRINT_DETAILS } from '../../constants';

//need to add error handeling to this :)
class EditSprintForm extends Component {
    state = {
        sprint_id: this.props.sprint.sprint_id,
        dashboard_id: this.props.sprint.dashboard_id,
        start_date: this.props.sprint.start_date,
        end_date: this.props.sprint.end_date,
        stories: this.props.sprint.stories,
        story_list: this.props.sprint.story_list
    };

    onChange = (e) => {
        console.log(e);
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeStartDate = (e) => {
        console.log(e);
        this.setState({ start_date: e });
    };

    onChangeEndDate = (e) => {
        console.log(e);
        this.setState({ end_date: e });
    };

    returnDefaultIfFieldEmpty = (value) => {
        return value === '' ? '' : value;
    };

    updateSettings = (e) => {
        e.preventDefault();
        axios.put(API_URL_SPRINT_DETAILS + this.state.sprint_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    render() {
        return (
            <Form onSubmit={this.updateSettings}>
                <div className="d-flex">
                    <FormGroup style={{ paddingRight: '1vw' }}>
                        <Label for="start_date">Start Date:</Label>
                        <Calendar name="start_date" onChange={this.onChangeStartDate} value={this.returnDefaultIfFieldEmpty(this.state.start_date)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="end_date">End Date:</Label>
                        <Calendar name="end_date" onChange={this.onChangeEndDate} value={this.returnDefaultIfFieldEmpty(this.state.end_date)} />
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label for="2">Setting Two:</Label>
                    <Input type="text" name="2" onChange={this.onChange} value={this.returnDefaultIfFieldEmpty(this.state)} />
                </FormGroup>

                <Button className="btn-primary">Update Sprint</Button>
            </Form>
        );
    }
}

export default EditSprintForm;
