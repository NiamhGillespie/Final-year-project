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

        user_story: "As a \nI would like to \nSo that I can ",
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

    onChangeCheckbox= e => {
        if (this.state.pairable === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createStory = e => {
        console.log('story being created ...');
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    render() {
        return (
        <Form onSubmit={ this.createStory }>
            <div className='row  mb-4'>
                <div className='col'>
                    <FormGroup>
                        <Label for="title">Story title:</Label>
                        <Input
                            type="text-long"
                            name="title"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.title)}
                            className='w-40'
                        />
                    </FormGroup>
                </div>

                <div className='row'>
                    <FormGroup>
                        <Label for="user_story">User Story:</Label>
                        <Input
                            type="textarea"
                            rows={5}
                            name="user_story"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.user_story)}
                        />
                    </FormGroup>
                </div>
                
            </div>

            <div className='row'>
                <div className='col'>
                    <FormGroup>
                        <Label for="definition_of_done">Definition of Done:</Label>
                        <Input
                            type="textarea"
                            rows={4}
                            name="definition_of_done"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.definition_of_done)}
                        />
                    </FormGroup>
                </div>

                <div className='col'>
                    <FormGroup>
                        <Label for="value_statement">Value statement:</Label>
                        <Input
                            type="textarea"
                            rows={4}
                            name="value_statement"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.value_statement)}
                        />
                        <span class="bigcheck-target"></span>
                    </FormGroup>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <FormGroup>
                        <Label for="priority">Priority:</Label>
                        <select value={this.state.value} onChange={this.onChange} name="priority">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </FormGroup>
                </div>
            
                <div className='col'>
                    <FormGroup className='checkbox-styling'>
                        <Label for="pairable">Pairable: </Label>
                        <Input
                            type="checkbox"
                            name="pairable"
                            onChange={this.onChangeCheckbox}
                            value={this.returnDefaultIfFieldEmpty(this.state.pairable)}
                        />
                    </FormGroup>
                </div>
            </div>

            <div className='col'>
                <FormGroup>
                    <Label for="assigned_to">Assigned to:</Label>
                    <Input
                        type="text"
                        name="assigned_to"
                        onChange={this.onChange}
                        value={this.returnDefaultIfFieldEmpty(this.state.assigned_to)}
                    />
                </FormGroup>
            </div>
                
            <div className='col'>
                <Button className="btn-primary justify-content-start">Create Story</Button>
            </div>
        </Form>
        );
    }
}

export default AddStoryForm;