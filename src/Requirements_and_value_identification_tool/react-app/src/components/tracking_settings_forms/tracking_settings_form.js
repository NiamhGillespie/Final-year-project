import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../../css/calender.css';
import { API_URL_SPRINTS } from '../../constants';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class TrackingSettingsForm extends Component {
    state = {
        sprint_id: '01',
        dashboard_id: '0000',
        start_date: '',
        end_date: '',
        stories: [],
        story_list: ''
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

    updateSettings = (e) => {
        e.preventDefault();
        axios.post(API_URL_SPRINTS, this.state).then(() => {
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
                        <Calendar name="start_date" onChange={this.onChangeStartDate} value={returnDefaultIfFieldEmpty()} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="end_date">End Date:</Label>
                        <Calendar name="end_date" onChange={this.onChangeEndDate} value={returnDefaultIfFieldEmpty()} />
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label for="2">Setting Two:</Label>
                    <Input type="text" name="2" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state)} />
                </FormGroup>

                <Button className="btn-primary">Create Sprint</Button>
            </Form>
        );
    }
}

export default TrackingSettingsForm;
