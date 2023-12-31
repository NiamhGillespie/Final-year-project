import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL, API_URL_STORY_DETAILS } from '../../constants';
import { ModalHeader, ModalBody } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import '../../css/basic.css';
import {
    currentEpic,
    displayEpics,
    displayTeamTags,
    displayValues,
    getDate,
    preselectedTags,
    preselectedValues,
    returnDefaultIfFieldEmpty
} from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class UpdateStoryForm extends Component {
    state = {
        story_id: this.props.story.story_id,
        epic_id: this.props.story.epic_id,
        title: this.props.story.title,

        order: this.props.story.order,

        user_story: this.props.story.user_story,
        definition_of_done: this.props.story.definition_of_done,
        team_values: this.getTeamValues(),
        values: this.props.story.values,
        story_points: this.props.story.story_points,

        team_tags: this.getTeamTags(),
        tags: this.props.story.tags,
        priority: this.props.story.priority,

        pairable: this.props.story.pairable,
        assigned_to: this.props.story.assigned_to,

        last_edited_by: 'Niamh Gillespie',
        last_edited: getDate(),
        created_by: this.props.story.created_by,
        time_created: this.props.story.time_created,

        epics: this.getEpics(),

        validate: {
            title: 'valid',
            user_story: 'valid',
            definition_of_done: 'valid'
        }
    };

    async getTeamTags() {
        var tags = await axios.get('http://localhost:8000/api/teamName/tags/');
        this.setState({ team_tags: tags.data });
    }

    async getTeamValues() {
        var values = await axios.get('http://localhost:8000/api/teamName/values/');
        this.setState({ team_values: values.data });
    }

    async getEpics() {
        await axios.get(API_URL).then((response) => this.setState({ epics: response.data[0] }));
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

    updateStory = (e) => {
        e.preventDefault();

        if (
            this.state.validate.title !== 'valid' ||
            this.state.validate.user_story !== 'valid' ||
            this.state.validate.definition_of_done !== 'valid'
        ) {
            alert('The form is invalid, please try again');
        } else {
            axios.put(API_URL_STORY_DETAILS + this.state.story_id + '/details', this.state).then(() => {
                this.props.resetState(this.state);
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

    onEpicAdd = (e) => {
        this.setState({ epic_id: e[0].id });
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
            <Form onSubmit={this.updateStory}>
                <div className="details-modal">
                    <ModalHeader toggle={this.toggleModal} className="coloured-header" style={{ background: '#' + this.props.epic_colour }}>
                        <FormGroup className="details-form-title">
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
                            <FormFeedback invalid className='text-white'>
                                {this.state.validate.title === 'too_short' && <p> Please enter a title </p>}
                                {this.state.validate.title === 'too_long' && <p> A title can't be longer than 128 characters </p>}
                            </FormFeedback>
                        </FormGroup>
                        <p className="details-id float-end"> #{this.state.story_id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-0 mb-0">
                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.props.epic_colour + '60' }}>
                            <div className="story-details-user-story-box h-100">
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                    User story
                                </p>
                                <FormGroup>
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
                            </div>

                            <div className="story-details-dod-box h-100 mt-0 mb-0">
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                    Definition of done
                                </p>

                                <FormGroup>
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

                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic_colour }}>
                                    Values:
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={displayValues(this.state.team_values)}
                                        onSelect={this.onValueAddition}
                                        onRemove={this.onValueDeletion}
                                        name="values"
                                        className="ms-2 w-75"
                                        style={{
                                            chips: { background: '#' + this.props.epic_colour },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                                        }}
                                        placeholder="Choose Values"
                                        displayValue="title"
                                        selectedValues={preselectedValues(this.state.values, this.state.team_values)}
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="details-right-col float-right">
                            <Button
                                className="details-edit-button"
                                style={{ border: '2px solid #' + this.props.epic_colour, color: '#' + this.props.epic_colour }}>
                                Update
                            </Button>

                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic_colour }}>
                                    Tags:
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={displayTeamTags(this.state.team_tags)}
                                        onSelect={this.onTagAddition}
                                        onRemove={this.onTagDeletion}
                                        name="tags"
                                        className="ms-2 w-75"
                                        style={{
                                            chips: { background: '#' + this.props.epic_colour },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                                        }}
                                        placeholder="Choose Tags"
                                        displayValue="title"
                                        selectedValues={preselectedTags(this.state.tags, this.state.team_tags)}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    Epic:
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={displayEpics(this.state.epics)}
                                        onSelect={this.onEpicAdd}
                                        singleSelect
                                        name="epic_id"
                                        className="ms-2 w-75"
                                        style={{
                                            chips: { background: '#' + this.props.epic_colour, color: 'white' },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                                        }}
                                        placeholder="Choose Epic"
                                        displayValue="title"
                                        selectedValues={currentEpic(this.state.epic_id, this.state.epics)}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1 d-inline">
                                    Pairable:
                                </p>
                                <FormGroup className="checkbox-styling d-inline">
                                    <Input
                                        type="checkbox"
                                        name="pairable"
                                        onChange={this.onChangeCheckbox}
                                        value={returnDefaultIfFieldEmpty(this.state.pairable)}
                                        className="mt-2"
                                        style={{ border: '2px solid #' + this.props.epic_colour }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    Assigned to:
                                </p>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="assigned_to"
                                        onChange={this.onChange}
                                        value={returnDefaultIfFieldEmpty(this.state.assigned_to)}
                                        className="w-75"
                                        style={{ border: '2px solid #' + this.props.epic_colour }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    Priority:
                                </p>
                                <FormGroup>
                                    <select
                                        value={this.state.value}
                                        onChange={this.onChange}
                                        name="priority"
                                        className="ms-2"
                                        style={{ border: '2px solid #' + this.props.epic_colour }}>
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </FormGroup>
                            </div>

                            <div className="mt-3 mb-0">
                                <FormGroup>
                                    <Input
                                        type="text"
                                        rows={4}
                                        name="story_points"
                                        onChange={this.onChange}
                                        value={returnDefaultIfFieldEmpty(this.state.story_points)}
                                        className="details-story-points"
                                        style={{ background: '#' + this.props.epic_colour }}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Form>
        );
    }
}

export default UpdateStoryForm;
