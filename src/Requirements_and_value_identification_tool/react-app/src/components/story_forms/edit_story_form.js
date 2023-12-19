import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { API_URL, API_URL_STORY_DETAILS } from '../../constants';
import { ModalHeader, ModalBody } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import '../../css/basic.css';

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
        last_edited: this.getDate(),
        created_by: this.props.story.created_by,
        time_created: this.props.story.time_created,

        epics: this.getEpics()
    };

    getDate() {
        const date = new Date();
        return date.toDateString();
    }

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

    returnDefaultIfFieldEmpty = (value) => {
        return value === '' ? '' : value;
    };

    updateStory = (e) => {
        e.preventDefault();
        axios.put(API_URL_STORY_DETAILS + this.state.story_id + '/details', this.state).then(() => {
            this.props.resetState(this.state);
            this.props.toggle();
        });
    };

    displayValues() {
        var teamValues = this.state.team_values;
        var returnList = [];
        for (var i = 0; i < teamValues.length; i++) {
            returnList.push({ title: teamValues[i].title + ' - ' + teamValues[i].description, id: teamValues[i].id });
        }

        return returnList;
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

    preselectedValues() {
        var values = this.state.values;
        var teamValues = this.state.team_values;
        var returnList = [];

        for (var i = 0; i < teamValues.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (teamValues[i].id === values[j]) {
                    returnList.push({ title: teamValues[i].title + ' - ' + teamValues[i].description, id: teamValues[i].id });
                }
            }
        }

        return returnList;
    }

    displayTeamTags() {
        var teamTags = this.state.team_tags;
        var returnList = [];

        for (var i = 0; i < teamTags.length; i++) {
            returnList.push({ title: teamTags[i].title + ' - ' + teamTags[i].description, id: teamTags[i].id });
        }

        return returnList;
    }

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

    preselectedTags() {
        var tags = this.state.tags;
        var teamTags = this.state.team_tags;
        var returnList = [];

        for (var i = 0; i < teamTags.length; i++) {
            for (var j = 0; j < tags.length; j++) {
                if (teamTags[i].id === tags[j]) {
                    returnList.push({ title: teamTags[i].title + ' - ' + teamTags[i].description, id: teamTags[i].id });
                }
            }
        }

        return returnList;
    }

    displayEpics() {
        var epics = this.state.epics;
        var returnList = [];

        for (var i = 0; i < epics.length; i++) {
            returnList.push({ title: epics[i].title, id: epics[i].epic_id });
        }

        return returnList;
    }

    onEpicAdd = (e) => {
        console.log('changing epic', e);
        this.setState({ epic_id: e[0].id });
    };

    onEpicDeletion = (e) => {
        this.setState({ epic_id: e[0].epic_id });
    };

    currentEpic() {
        var epic = this.state.epic_id;
        var epics = this.state.epics;
        var returnList = [];

        for (var i = 0; i < epics.length; i++) {
            if (epics[i].epic_id === epic) {
                returnList.push({ title: epics[i].title, id: epics[i].id });
            }
        }

        return returnList;
    }

    render() {
        return (
            <Form onSubmit={this.updateStory}>
                <div className="details-modal">
                    <ModalHeader toggle={this.toggleModal} className="coloured-header" style={{ background: '#' + this.props.epic_colour }}>
                        <FormGroup className="details-form-title">
                            <Input type="text-long" name="title" onChange={this.onChange} value={this.returnDefaultIfFieldEmpty(this.state.title)} />
                        </FormGroup>
                        <p className="details-id float-end"> #{this.state.story_id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-0 mb-0">
                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.props.epic_colour + '60' }}>
                            <div className="story-details-user-story-box h-100">
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                    {' '}
                                    User story{' '}
                                </p>
                                <FormGroup>
                                    <Input
                                        type="textarea"
                                        rows={4}
                                        name="user_story"
                                        onChange={this.onChange}
                                        value={this.returnDefaultIfFieldEmpty(this.state.user_story)}
                                        className="details-box-large"
                                        style={{
                                            backgroundColor: '#' + this.props.epic_colour + '40',
                                            scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'
                                        }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="story-details-dod-box h-100 mt-0 mb-0">
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                    {' '}
                                    Definition of done{' '}
                                </p>

                                <FormGroup>
                                    <Input
                                        type="textarea"
                                        rows={4}
                                        name="definition_of_done"
                                        onChange={this.onChange}
                                        value={this.returnDefaultIfFieldEmpty(this.state.definition_of_done)}
                                        className="details-box-small"
                                        style={{
                                            backgroundColor: '#' + this.props.epic_colour + '40',
                                            scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'
                                        }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic_colour }}>
                                    {' '}
                                    Values:{' '}
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={this.displayValues()}
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
                                        selectedValues={this.preselectedValues()}
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="details-right-col float-right">
                            <Button
                                className="details-edit-button"
                                style={{ border: '2px solid #' + this.props.epic_colour, color: '#' + this.props.epic_colour }}>
                                {' '}
                                update{' '}
                            </Button>

                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic_colour }}>
                                    {' '}
                                    Tags:{' '}
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={this.displayTeamTags()}
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
                                        selectedValues={this.preselectedTags()}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    {' '}
                                    Epic:{' '}
                                </p>

                                <FormGroup>
                                    <Multiselect
                                        options={this.displayEpics()}
                                        onSelect={this.onEpicAdd}
                                        //onRemove={this.onEpicDeletion}
                                        singleSelect
                                        name="epic_id"
                                        className="ms-2 w-75"
                                        style={{
                                            chips: { background: '#' + this.props.epic_colour, color: 'white' },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px' }
                                        }}
                                        placeholder="Choose Epic"
                                        displayValue="title"
                                        selectedValues={this.currentEpic()}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1 d-inline">
                                    Pairable:{' '}
                                </p>
                                <FormGroup className="checkbox-styling d-inline">
                                    <Input
                                        type="checkbox"
                                        name="pairable"
                                        onChange={this.onChangeCheckbox}
                                        value={this.returnDefaultIfFieldEmpty(this.state.pairable)}
                                        className="mt-2"
                                        style={{ border: '2px solid #' + this.props.epic_colour }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    Assigned to:{' '}
                                </p>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="assigned_to"
                                        onChange={this.onChange}
                                        value={this.returnDefaultIfFieldEmpty(this.state.assigned_to)}
                                        className="w-75"
                                        style={{ border: '2px solid #' + this.props.epic_colour }}
                                    />
                                </FormGroup>
                            </div>

                            <div className="mt-3">
                                <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-1">
                                    Priority:{' '}
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
                                        value={this.returnDefaultIfFieldEmpty(this.state.story_points)}
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
