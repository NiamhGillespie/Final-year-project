import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL_TEAMVALUES } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';

//need to add error handeling to this :)
class AddValueForm extends Component {
    ID = 0;

    state = {
        tag_id: '0',
        team_id: '0000', //need to update this in future
        title: '',
        description: '',
        colour: 'ff0000',
        sub_values: []
    };

    onTitleChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    };

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    returnDefaultIfFieldEmpty = (value) => {
        return value === '' ? '' : value;
    };

    createTag = (e) => {
        e.preventDefault();
        axios.post(API_URL_TEAMVALUES, this.state).then(() => {
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
                    <Input type="text" title="title" onChange={this.onTitleChange} value={this.returnDefaultIfFieldEmpty(this.state.title)} />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Value description:</Label>
                    <Input type="text" onChange={this.onDescriptionChange} value={this.returnDefaultIfFieldEmpty(this.state.description)} />
                </FormGroup>

                <ColorPicker className="colour-picker d-inline h-100 w-100" value={this.colour} onChange={(e) => this.setColour(e.value)} inline />
                <br />
                <p style={{ background: '#' + this.state.colour, color: 'white' }} className="d-inline-block float-right colour-example w-1 h-1">
                    Colour example
                </p>
                <br />

                <Button className="btn-primary d-block">Create Value</Button>
            </Form>
        );
    }
}

export default AddValueForm;
