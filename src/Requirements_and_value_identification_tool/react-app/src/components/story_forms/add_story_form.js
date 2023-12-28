import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../../constants';
import Multiselect from 'multiselect-react-dropdown';
import '../../css/basic.css';
import { displayValues, getDate, returnDefaultIfFieldEmpty, displayTeamTags } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class AddStoryForm extends Component {
    state = {
        story_id: '0',
        epic_id: this.props.epic_id,
        title: '',

        order: 0,

        user_story: 'As a \nI would like to \nSo that I can ',
        definition_of_done: '',
        team_values: this.getTeamValues(),
        values: [],
        team_tags: this.getTeamTags(),
        tags: [],
        priority: 'LOW',

        pairable: false,
        assigned_to: '',

        last_edited_by: 'Niamh Gillespie',
        last_edited: getDate(),
        created_by: 'Niamh Gillespie',
        time_created: getDate(),

        validate: {
            title: 'too_short',
            user_story: 'valid',
            definition_of_done: 'valid'
        }
    };

    async getTeamValues() {
        await axios.get('http://localhost:8000/api/teamName/values').then((response) => this.setState({ team_values: response.data }));
    }

    async getTeamTags() {
        await axios.get('http://localhost:8000/api/teamName/tags').then((response) => this.setState({ team_tags: response.data }));
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox = (e) => {
        if (this.state.pairable === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    createStory = (e) => {
        e.preventDefault();

        if (this.state.validate.title !== 'valid' || this.state.validate.user_story !== 'valid' || this.state.validate.definition_of_done !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            axios.post(API_URL, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

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

    onTagAddition = (e) => {
        var tag_ids = [];
        for (var i = 0; i < e.length; i++) {
            tag_ids.push(e[i].id);
        }
        this.setState({ tags: tag_ids });
    };

    onTagDeletion = (e) => {
        var tag_ids = [];
        for (var i = 0; i < e.length; i++) {
            tag_ids.push(e[i].id);
        }
        this.setState({ tags: tag_ids });
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

    validateUserStory(e) {
        const validate = this.state.validate;

        if (e.target.value.length > 1028) {
            validate.user_story = 'too_long';
        } else {
            validate.user_story = 'valid';
        }

        this.setState({ validate });
    }

    validateDoD(e) {
        const validate = this.state.validate;

        if (e.target.value.length > 1028) {
            validate.definition_of_done = 'too_long';
        } else {
            validate.definition_of_done = 'valid';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Form onSubmit={this.createStory}>
                <div className="add-story-left-col">
                    <FormGroup>
                        <Label for="title">Story title:</Label>
                        <Input
                            type="text"
                            name="title"
                            onChange={(e) => {
                                this.onChange(e);
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
                        <Label for="user_story"> User Story:</Label>
                        <Input
                            type="textarea"
                            rows={5}
                            name="user_story"
                            onChange={(e) => {
                                this.onChange(e);
                                this.validateUserStory(e);
                            }}
                            onTouched={this.validateTitle}
                            value={returnDefaultIfFieldEmpty(this.state.user_story)}
                            invalid={this.state.validate.user_story === 'too_long'}
                        />
                        <FormFeedback invalid>The user story can't be longer than 1028 characters</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="definition_of_done">Definition of Done:</Label>
                        <Input
                            type="textarea"
                            rows={4}
                            name="definition_of_done"
                            onChange={(e) => {
                                this.onChange(e);
                                this.validateDoD(e);
                            }}
                            onTouched={this.validateDoD}
                            value={returnDefaultIfFieldEmpty(this.state.definition_of_done)}
                            invalid={this.state.validate.definition_of_done === 'too_long'}
                        />
                        <FormFeedback invalid>The definition of done can't be longer than 1028 characters</FormFeedback>
                    </FormGroup>
                </div>

                <div className="add-story-right-col">
                    <FormGroup>
                        <Label for="values">Value statement:</Label>

                        <Multiselect
                            options={displayValues(this.state.team_values)}
                            onSelect={this.onValueAddition}
                            onRemove={this.onValueDeletion}
                            name="tags"
                            className="ms-2"
                            style={{
                                chips: { background: 'green' },
                                searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                            }}
                            placeholder="Choose Tags"
                            displayValue="title"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="tags">Tags: </Label>
                        <Multiselect
                            options={displayTeamTags(this.state.team_tags)}
                            onSelect={this.onTagAddition}
                            onRemove={this.onTagDeletion}
                            name="tags"
                            className="ms-2"
                            style={{
                                chips: { background: 'red' },
                                searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                            }}
                            placeholder="Choose Tags"
                            displayValue="title"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="priority">Priority: </Label>
                        <select value={this.state.value} onChange={this.onChange} name="priority" className="ms-2">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </FormGroup>

                    <FormGroup className="checkbox-styling">
                        <Label for="pairable">Pairable: </Label>
                        <Input
                            type="checkbox"
                            name="pairable"
                            onChange={this.onChangeCheckbox}
                            value={returnDefaultIfFieldEmpty(this.state.pairable)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="assigned_to">Assigned to:</Label>
                        <Input type="text" name="assigned_to" onChange={this.onChange} value={returnDefaultIfFieldEmpty(this.state.assigned_to)} />
                    </FormGroup>
                </div>

                <div className="w-100">
                    <Button className="btn-primary w-100 float-right mt-5"> Create Story </Button>
                </div>
            </Form>
        );
    }
}

export default AddStoryForm;
