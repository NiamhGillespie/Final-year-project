import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import '../css/basic.css';

//need to add error handeling to this :)
class AddStoryForm extends Component {

    state = {
        story_id: "0",
        epic_id: this.props.epic_id,
        title: "",

        user_story: "",
        definition_of_done: "",
        value_statement: "",
        priority: "LOW",

        pairable: false,
        assigned_to: "",


        last_edited_by: "Niamh Gillespie",
        last_edited: this.getDate(),
        created_by: "Niamh Gillespie",
        time_created: this.getDate()
    };

    getDate() {
        const date = new Date();
        return date.toDateString()
    }
    

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createStory = e => {
        console.log('story being created ...');
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.toggle();
        });
    };

    render() {
        return (
        <Form onSubmit={ this.createStory }>
            <FormGroup>
                <Label for="title">Story title:</Label>
                <Input
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="user_story">User Story:</Label>
                <Input
                    type="text"
                    name="user_story"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.user_story)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="definition_of_done">Definition of Done:</Label>
                <Input
                    type="text"
                    name="definition_of_done"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.definition_of_done)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="value_statement">Value statement:</Label>
                <Input
                    type="text"
                    name="value_statement"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.value_statement)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="priority">Priority:</Label>
                <Input
                    type="text"
                    name="priority"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.priority)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="pairable">Pairable:</Label>
                <Input
                    type="boolean"
                    name="pairable"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.pairable)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="assigned_to">Assigned to:</Label>
                <Input
                    type="text"
                    name="assigned_to"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.assigned_to)}
                />
            </FormGroup>
            
            <Button className="btn-primary justify-content-start">Create Story</Button>
        </Form>
        );
    }
}

export default AddStoryForm;