import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL, API_URL_SHORT } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import Multiselect from 'multiselect-react-dropdown';
import { displayValues, getDate, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class AddEpicForm extends Component {
    ID = 0;

    state = {
        epic_id: '0',
        epic_colour: 'ff0000',
        team_id: this.props.team.id,
        title: '',

        team_values: this.getTeamValues(),
        values: [],
        tags: [],
        order: -1,

        last_edited_by: this.props.user.id,
        last_edited: getDate(),
        created_by: this.props.user.id,
        time_created: getDate(),

        validate: {
            title: 'too_short'
        }
    };

    async getTeamValues() {
        await axios.get(API_URL_SHORT + this.props.team.id + '/values').then((response) => this.setState({ team_values: response.data }));
    }

    onTitleChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    };

    createEpic = (e) => {
        e.preventDefault();

        if (this.state.validate.title !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            axios.post(API_URL_SHORT + this.props.team.id + '/epicsDashboard', this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

    setColour(colour) {
        this.setState({ epic_colour: colour });
    }

    onValueAddition = (e) => {
        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id);
        }
        this.setState({ values: value_ids });
    };

    onValueDeletion = (e) => {
        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id);
        }
        this.setState({ values: value_ids });
    };

    validateTitle(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.title = 'too_short';
        } else if (e.target.value.length > 128) {
            validate.title = 'too_long';
        } else {
            validate.title = 'valid';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Form onSubmit={this.createEpic}>
                <FormGroup>
                    <Label for="title">Epic title:</Label>
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
                        {this.state.validate.title === 'too_long' && <p> A title can't be longer than 128 characters </p>}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="values">Values:</Label>

                    <Multiselect
                        options={displayValues(this.state.team_values)}
                        onSelect={this.onValueAddition}
                        onRemove={this.onValueDeletion}
                        name="tags"
                        className="ms-2"
                        style={{
                            chips: { background: 'green' },
                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', borderRadius: '0px' }
                        }}
                        placeholder="Choose Values"
                        displayValue="title"
                    />
                </FormGroup>

                <ColorPicker
                    className="colour-picker d-inline h-100 w-100"
                    value={this.epic_colour}
                    onChange={(e) => this.setColour(e.value)}
                    inline
                />
                <br />
                <p style={{ background: '#' + this.state.epic_colour, color: 'white' }} className="d-inline-block float-right colour-example w-1 h-1">
                    Colour example
                </p>
                <br />

                <Button className="btn-primary d-block">Create Epic</Button>
            </Form>
        );
    }
}

export default AddEpicForm;
