import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
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
        colour: this.props.tag.colour,

        validate: {
            title: 'valid',
            description: 'valid'
        }
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

        if (this.state.validate.title !== 'valid' || this.state.validate.description !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            axios.put(API_URL_TAG_DETAILS + this.state.tag_id, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

    setColour(colour) {
        this.setState({ colour: colour });
    }

    validateTitle(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.title = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.title = 'too_long';
        } else {
            validate.title = 'valid';
        }

        this.setState({ validate });
    }

    validateDescription(e) {
        const validate = this.state.validate;

        if (e.target.value.length > 200) {
            validate.description = 'too_long';
        } else {
            validate.description = 'valid';
        }

        this.setState({ validate });
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
                            onChange={(e) => {
                                this.onTitleChange(e);
                                this.validateTitle(e);
                            }}
                            onTouched={this.validateTitle}
                            value={returnDefaultIfFieldEmpty(this.state.title)}
                            invalid={this.state.validate.title === 'too_short' || this.state.validate.title === 'too_long'}
                        />
                        <FormFeedback invalid>
                            {this.state.validate.title === 'too_short' && <p> Please enter a title </p>}
                            {this.state.validate.title === 'too_long' && <p> The title can't be longer than 30 characters </p>}
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Tag description:</Label>
                        <Input
                            type="text"
                            onChange={(e) => {
                                this.onDescriptionChange(e);
                                this.validateDescription(e);
                            }}
                            onTouched={this.validateDescription}
                            value={returnDefaultIfFieldEmpty(this.state.description)}
                            invalid={this.state.validate.description === 'too_long'}
                        />
                        <FormFeedback invalid>The description can't be longer than 200 characters</FormFeedback>
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
