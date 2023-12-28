import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL_TAG_DETAILS } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class EditTagForm extends Component {
    state = {
        tag_id: this.props.tag.tag_id,
        team_id: this.props.tag.team_id,
        title: this.props.tag.title,
        description: this.props.tag.description,
        colour: this.props.tag.colour
    };

    onTitleChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    };

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
        console.log(this.state.description);
    };

    updateTag = (e) => {
        e.preventDefault();
        axios.put(API_URL_TAG_DETAILS + this.state.tag_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.setState({ colour: colour });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.updateTag}>
                    <FormGroup>
                        <Label for="title">Tag title:</Label>
                        <Input
                            type="text"
                            title="title"
                            onChange={this.onTitleChange}
                            value={returnDefaultIfFieldEmpty(this.state.title)}
                            required
                            maxlength="30"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Tag description:</Label>
                        <Input
                            type="text"
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

                    <Button className="btn-primary d-block">Update Tag</Button>
                </Form>
            </div>
        );
    }
}

export default EditTagForm;
