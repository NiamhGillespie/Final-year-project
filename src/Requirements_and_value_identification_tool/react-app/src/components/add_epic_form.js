import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';

//need to add error handeling to this :)
class AddEpicForm extends Component {

    state = {
        epic_id: "0001",
        epic_colour: "#3fd9cc",
        dashboard_id: "0001",
        title: "",

        last_edited_by: "Niamh Gillespie",
        last_edited: this.getDate(),
        created_by: "Niamh Gillespie",
        time_created: this.getDate()
    };

    getDate() {
        const date = new Date();
        return date.toDateString()
    }
    

    onTitleChange = e => {
        this.setState({ [e.target.title]: e.target.value });
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createEpic = e => {
        console.log('epic being created ...');
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.state.epic_colour = colour;
    }

    render() {
        return (
        <Form onSubmit={ this.createEpic }>
            <FormGroup>
                <Label for="title">Epic title:</Label>
                <Input
                    type="text"
                    title="title"
                    onChange={this.onTitleChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            <ColorPicker value={this.epic_colour} onChange={(e) => this.setColour(e.value)} inline />
            
            <Button className="btn-primary justify-content-start">Create Epic</Button>
        </Form>
        );
    }
}

export default AddEpicForm;