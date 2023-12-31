import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_TRACKING_COLUMN_DETAILS, API_URL_STORY_DETAILS } from '../../constants';
import Multiselect from 'multiselect-react-dropdown';
import { returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class EditColumnForm extends Component {
    state = {
        column_id: this.props.column.column_id,
        dashboard_id: this.props.column.dashboard_id,
        team_id: this.props.column.team_id,
        title: this.props.column.title,
        mark_as_complete: this.props.column.mark_as_complete,
        stories: this.props.column.stories,
        story_list: this.props.column.story_list,
        WIP: this.props.column.WIP,

        non_completed_stories: this.props.non_completed_stories,
        epics: this.props.epics,
        original_stories: this.props.column.stories,
        original_title: this.props.column.title,

        validate: {
            WIP: 'valid',
            title: this.props.column.title === 'Done' ? 'protected_keyword' : 'valid'
        },

        checked: this.props.column.title === 'Done' ? true : this.props.mark_as_complete
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === 'title') {
            this.setState({ story_list: this.state.story_list });
            this.setState({ stories: this.state.stories });
        }
    };

    onChangeCheckbox = (e) => {
        if (this.state.mark_as_complete === false) {
            this.setState({ [e.target.name]: true });
            this.setState({ checked: true });
            this.props.resetState();
        } else {
            this.setState({ [e.target.name]: false });
            this.setState({ checked: false });
            this.props.resetState();
        }

        if (this.state.title === 'Done') {
            this.setState({ [e.target.name]: true });
            this.setState({ checked: true });
            this.props.resetState();
        }
    };

    redefine(stories, state) {
        for (var i = 0; i < stories.length; i++) {
            this.updateStoryState(stories[i], state);
        }
    }

    async updateStoryState(story_id, new_state) {
        var full_story = await axios.get(API_URL_STORY_DETAILS + story_id + '/details');
        full_story.data.state = new_state;

        await axios.put(API_URL_STORY_DETAILS + full_story.data.story_id + '/details', full_story.data).then(() => {
            this.props.resetState();
        });
    }

    updateColumn = (e) => {
        e.preventDefault();
        this.redefine(this.state.original_stories, 'undefined');
        this.redefine(this.state.stories, this.state.title);
        this.setState({ story_list: this.state.stories.toString() });
        this.setState({ stories: this.state.stories });

        console.log("UPDATING")
        if (this.state.mark_as_complete === true) {
            this.markStoriesAsComplete(this.state.stories);
        }

        if (this.state.validate.WIP !== 'valid' || (this.state.validate.title !== 'valid' && this.state.validate.title !== 'protected_keyword')) {
            alert('The form is invalid, please try again');
        } else {
            axios.put(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id, this.state).then(() => {
                this.props.resetState();
                this.props.toggle();
            });
        }
    };

    async markStoriesAsComplete(stories) {
        for (var i = 0; i < stories.length; i++) {
            var full_story = await axios.get(API_URL_STORY_DETAILS + stories[i] + '/details');
            full_story.data.completed = true;

            await axios.put(API_URL_STORY_DETAILS + full_story.data.story_id + '/details', full_story.data).then(() => {
                this.props.resetState();
            });
        }
    }

    async markStoriesAsUncomplete(stories) {
        for (var i = 0; i < stories.length; i++) {
            var full_story = await axios.get(API_URL_STORY_DETAILS + stories[i] + '/details');
            full_story.data.completed = false;

            await axios.put(API_URL_STORY_DETAILS + full_story.data.story_id + '/details', full_story.data).then(() => {
                this.props.resetState();
            });
        }
    }

    deleteColumn = () => {
        //move stories to undefined
        this.redefine(this.state.stories, 'undefined');
        axios.delete(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    onStoryAddition = (e) => {
        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id);
        }
        this.setState({ story_list: story_ids.toString() });
        this.setState({ stories: story_ids });

        if (this.state.mark_as_complete === true) {
            this.markStoriesAsComplete(this.state.stories);
        }
    };

    onStoryDeletion = (e) => {
        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id);
        }
        this.setState({ story_list: story_ids.toString() });
        this.setState({ stories: story_ids });

        if (this.state.mark_as_complete === true) {
            this.markStoriesAsUncomplete(this.state.stories);
        }
    };

    displayStories() {
        var non_completed_stories = this.state.non_completed_stories;
        var returnList = [];

        var available_stories = non_completed_stories.filter((story) => story.state === this.state.title || story.state === 'undefined');
        for (var i = 0; i < available_stories.length; i++) {
            returnList.push({
                title: available_stories[i].title + ' - #' + available_stories[i].id,
                id: available_stories[i].id,
                story: available_stories[i]
            });
        }

        return returnList;
    }

    preselectedStories() {
        var stories = this.state.stories;
        var non_completed_stories = this.state.non_completed_stories;
        var returnList = [];

        var available_stories = non_completed_stories.filter((story) => story.state === 'undefined' || this.state.title);

        for (var i = 0; i < available_stories.length; i++) {
            for (var j = 0; j < stories.length; j++) {
                if (available_stories[i].id === stories[j]) {
                    returnList.push({
                        title: available_stories[i].title + ' - #' + available_stories[i].id,
                        id: available_stories[i].id,
                        story: available_stories[i]
                    });
                }
            }
        }
        return returnList;
    }

    validateTitle(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.title = 'too_short';
        } else if (e.target.value.length > 30) {
            validate.title = 'too_long';
        } else if (e.target.value === 'Done') {
            validate.title = 'protected_keyword';
            this.setState({ checked: true });
            this.setState({ mark_as_complete: true });
        } else {
            validate.title = 'valid';
        }

        this.setState({ validate });
    }

    validateWIP(e) {
        const validate = this.state.validate;

        if (/^[0-9]+$/.test(e.target.value) && e.target.value.length !== 0) {
            validate.WIP = 'valid';
        } else {
            validate.WIP = 'invalid';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Form onSubmit={this.updateColumn}>
                <FormGroup>
                    <Label for="title">Column title:</Label>
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
                        valid={this.state.validate.title === 'protected_keyword'}
                    />
                    <FormFeedback invalid>
                        {this.state.validate.title === 'too_short' && <p> Please enter a title </p>}
                        {this.state.validate.title === 'too_long' && <p> A title can't be longer than 30 characters </p>}
                    </FormFeedback>
                    <FormFeedback valid> Done is a protected keyword - stories in this column will automatically be marked as completed</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="WIP">WIP limit:</Label>
                    <Input
                        type="text"
                        name="WIP"
                        onChange={(e) => {
                            this.onChange(e);
                            this.validateWIP(e);
                        }}
                        value={returnDefaultIfFieldEmpty(this.state.WIP)}
                        pattern="[0-9]"
                        invalid={this.state.validate.WIP === 'invalid'}
                    />
                    <FormFeedback invalid>Please enter a positive integer, 0 means that no WIP limit will be applied</FormFeedback>
                </FormGroup>

                <div>
                    <FormGroup>
                        <Multiselect
                            options={this.displayStories()}
                            onSelect={this.onStoryAddition}
                            onRemove={this.onStoryDeletion}
                            name="stories"
                            className="column-story-selection"
                            style={{
                                chips: { background: '#58c1d6' },
                                searchBox: { border: 'none', borderBottom: '1px solid blue', borderRadius: '0px' }
                            }}
                            placeholder="Choose Stories"
                            displayValue="title"
                            selectedValues={this.preselectedStories()}
                            showCheckbox
                        />
                    </FormGroup>
                </div>

                <FormGroup className="checkbox-styling">
                    <Label for="mark_as_complete">Mark stories that are in this column as complete: </Label>
                    <Input
                        type="checkbox"
                        name="mark_as_complete"
                        onChange={this.onChangeCheckbox}
                        value={returnDefaultIfFieldEmpty(this.state.mark_as_complete)}
                        defaultChecked={this.state.mark_as_complete || this.state.title === 'Done'}
                        disabled={this.state.title === 'Done'}
                        checked={this.state.checked}
                    />
                </FormGroup>

                <Button className="btn-primary">Update Column</Button>

                <Button className="btn-danger float-end" onClick={this.deleteColumn}>
                    Delete Column
                </Button>
            </Form>
        );
    }
}

export default EditColumnForm;
