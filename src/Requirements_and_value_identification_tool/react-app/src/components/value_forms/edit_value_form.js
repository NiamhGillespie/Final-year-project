import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL_VALUE_DETAILS } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

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

    onTitleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    createTag = (e) => {
        e.preventDefault();
        axios.put(API_URL_VALUE_DETAILS + this.state.tag_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.setState({ colour: colour });
    }

    render() {
        return (
            <Form onSubmit={this.createTag}>
                <FormGroup>
                    <Label for="title">Value title:</Label>
                    <Input
                        type="text"
                        name="title"
                        onChange={this.onTitleChange}
                        value={returnDefaultIfFieldEmpty(this.state.title)}
                        required
                        maxlength="30"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Value description:</Label>
                    <Input
                        type="text"
                        name="description"
                        onChange={this.onDescriptionChange}
                        value={returnDefaultIfFieldEmpty(this.state.description)}
                        maxlength="200"
                    />
                </FormGroup>

                <ColorPicker
                    className="colour-picker d-inline h-100 w-100"
                    value={this.state.colour}
                    onChange={(e) => this.setColour(e.value)}
                    inline
                />
                <br />
                <p style={{ background: '#' + this.state.colour, color: 'white' }} className="d-inline-block float-right colour-example w-1 h-1">
                    Colour example
                </p>
                <br />

                <Button className="btn-primary d-block">Update Value</Button>
            </Form>
        );
    }
}

export default EditValueForm;
