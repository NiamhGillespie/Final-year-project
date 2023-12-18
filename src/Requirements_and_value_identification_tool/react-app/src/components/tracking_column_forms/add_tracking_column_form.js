import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS } from "../../constants";
import { ColorPicker } from 'primereact/colorpicker';
import Multiselect from 'multiselect-react-dropdown';

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
        WIP: 0 //same as default in models
    };

    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox= e => {
        if (this.state.mark_as_complete === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createColumn = e => {
        e.preventDefault();
        axios.post(API_URL_DASHBOARD_TRACKING_COLUMNS, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };


    render() {
        return (
        <Form onSubmit={ this.createColumn }>
            <FormGroup>
                <Label for="title">Column title:</Label>
                <Input
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            
            <FormGroup>
                <Label for="WIP">WIP limit:</Label>
                <Input
                    type="text"
                    name="WIP"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.WIP)}
                />
            </FormGroup>

            <FormGroup className='checkbox-styling'>
                <Label for="mark_as_complete">Mark stories that are in this column as complete: </Label>
                <Input
                    type="checkbox"
                    name="mark_as_complete"
                    onChange={this.onChangeCheckbox}
                    value={this.returnDefaultIfFieldEmpty(this.state.mark_as_complete)}
                />
            </FormGroup>

            <Button className="btn-primary">Create Column</Button>
        </Form>
        );
    }
}

export default AddColumnForm;