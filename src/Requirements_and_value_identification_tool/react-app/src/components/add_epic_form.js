import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';

//need to add error handeling to this :)
class AddEpicForm extends Component {
    ID = 0;

    state = {
        epic_id: '0',
        epic_colour: "ff0000",
        dashboard_id: "0001",
        title: "",

        tags: [],
        order: -1,

        last_edited_by: "Niamh Gillespie",
        last_edited: this.getDate(),
        created_by: "Niamh Gillespie",
        time_created: this.getDate()
    };

    getDate() {
        const date = new Date();
        return date.toDateString()
    }
    
    getID() {
        console.log(this.ID)
        var epic_id = this.ID;
        this.ID = this.ID + 1;
        return String(epic_id);
    }

    onTitleChange = e => {
        this.setState({ [e.target.title]: e.target.value });
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createEpic = e => {
        console.log('epic being created ...');
        console.log(this.state);
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.state.epic_colour = colour;
        this.setState(this.state);
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

            <ColorPicker className="colour-picker d-inline h-100 w-100" value={this.epic_colour} onChange={(e) => this.setColour(e.value)} inline />
            <br/>
            <p style={{background: '#' + this.state.epic_colour, color: 'white'}} className="d-inline-block float-right colour-example w-1 h-1" > Colour example </p>
            <br/>

            <Button className="btn-primary d-block">Create Epic</Button>
        </Form>
        );
    }
}

export default AddEpicForm;