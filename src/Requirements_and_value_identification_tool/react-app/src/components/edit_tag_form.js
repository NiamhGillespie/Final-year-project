import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_TAG_DETAILS } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';

//need to add error handeling to this :)
class EditTagForm extends Component {
    state = {
        tag_id: this.props.tag.tag_id,
        team_id: this.props.tag.team_id,
        title: this.props.tag.title,
        description: this.props.tag.description,
        colour: this.props.tag.colour,
    };

    onTitleChange = e => {
        this.setState({ [e.target.title]: e.target.value });
    };

    onDescriptionChange = e => {
        this.state.description =  e.target.value;
        this.setState(this.state);
        console.log(this.state.description)
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    updateTag = e => {
        e.preventDefault();
        axios.put(API_URL_TAG_DETAILS + this.state.tag_id, this.state).then(() => {
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
            <div>
                <Form onSubmit={ this.updateTag }>
                    <FormGroup>
                        <Label for="title">Tag title:</Label>
                        <Input
                            type="text"
                            title="title"
                            onChange={this.onTitleChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.title)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Tag description:</Label>
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

                    <Button className="btn-primary d-block">Update Tag</Button>
                </Form>
            </div>
        );
        
    }
}

export default EditTagForm;