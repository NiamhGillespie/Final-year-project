import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_VALUE_DETAILS } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';

//need to add error handeling to this :)
class EditValueForm extends Component {

    state = {
        tag_id: this.props.value.tag_id,
        team_id: this.props.value.team_id, //need to update this in future
        title: this.props.value.title,
        description: this.props.value.description,
        colour: this.props.value.colour,
        sub_values: this.props.value.sub_values
    };

    onTitleChange = e => {
        this.setState({ [e.target.title]: e.target.value });
    };

    onDescriptionChange = e => {
        this.state.description =  e.target.value;
        this.setState(this.state);
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createTag = e => {
        e.preventDefault();
        axios.put(API_URL_VALUE_DETAILS + this.state.tag_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.state.colour = colour;
        this.setState(this.state);
    }

    render() {
        return (
        <Form onSubmit={ this.createTag }>
            <FormGroup>
                <Label for="title">Value title:</Label>
                <Input
                    type="text"
                    title="title"
                    onChange={this.onTitleChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="description">Value description:</Label>
                <Input
                    type="text"
                    onChange={this.onDescriptionChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.description)}
                />
            </FormGroup>

            <ColorPicker className="colour-picker d-inline h-100 w-100" value={this.state.colour} onChange={(e) => this.setColour(e.value)} inline />
            <br/>
            <p style={{background: '#' + this.state.colour, color: 'white'}} className="d-inline-block float-right colour-example w-1 h-1" > Colour example </p>
            <br/>

            <Button className="btn-primary d-block">Update Value</Button>
        </Form>
        );
    }
}

export default EditValueForm;