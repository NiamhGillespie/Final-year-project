/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, FormGroup } from 'reactstrap';
import '../../css/basic.css';
import axios from 'axios';
import UpdateStoryForm from './edit_story_form';
import { displayPriority, displaySmallTags, displayTags } from '../helper-methods/story_display_methods';
import { displayTeamTags } from '../helper-methods/form_helper_methods';
import { API_URL, API_URL_SHORT, API_URL_USER_DETAILS, SHORT_URL } from '../../constants';
import { Tooltip } from 'react-tooltip';

class StoryDetailsModal extends Component {
    state = {
        modal: false,
        editing: false,
        teamTags: this.getTeamTags(),
        teamValues: this.getTeamValues(),
        story: this.props.story,
        epics: this.getEpics()
    };

    async getEpics() {
        await axios.get(API_URL_SHORT + this.props.team.id + '/epicsDashboard').then((response) => this.setState({ epics: response.data[0] }));
    }

    async getTeamTags() {
        var tags = await axios.get(API_URL_SHORT + this.props.team.id + '/tags');
        this.setState({ teamTags: tags.data });
    }

    async getTeamValues() {
        var values = await axios.get(API_URL_SHORT + this.props.team.id + '/values');
        this.setState({ teamValues: values.data });
    }

    resetState = (updatedStory) => {
        this.setState({ story: updatedStory });
        this.props.resetState();
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    toggleEditing = () => {
        this.setState((previous) => ({
            editing: !previous.editing
        }));
    };

    getEpicTitle() {
        var epic_id = this.state.story.epic_id;

        for (var i = 0; i < this.state.epics.length; i++) {
            if (this.state.epics[i].id === parseInt(epic_id)) {
                return this.state.epics[i].title;
            }
        }
    }
    displayValues() {
        var returnList = [];
        for (var i = 0; i < this.state.story.values.length; i++) {
            var value = this.getValueFromId(this.state.story.values[i]);

            if (value !== undefined) {
                returnList.push(
                    <div className="details-value" style={{ border: '2px solid #' + value.colour }}>
                        <p className="details-value-title"> {value.title} </p>
                        <p className="details-value-description"> {value.description} </p>
                    </div>
                );
            }
        }

        if (returnList.length === 0) {
            returnList.push(
                <div className="details-value" style={{ border: '2px solid #' + this.props.epic_colour }}>
                    <p className="details-value-title"> No values added yet </p>
                    <p className="details-value-description"> Create values in the Tag Dashboard </p>
                </div>
            );
        }
        return returnList;
    }

    getValueFromId(id) {
        for (var i = 0; i < this.state.teamValues.length; i++) {
            if (this.state.teamValues[i].id === id) {
                return this.state.teamValues[i];
            }
        }
    }

    getAssignedToUsers() {
        var users = this.props.user_list;
        var assigned_to = this.state.story.assigned_to;
        var returnList = [];

        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < assigned_to.length; j++) {
                if (users[i].id === parseInt(assigned_to[j])) {
                    returnList.push(
                        <p className="assigned-to-section" style={{ border: '2px solid #' + this.props.epic_colour }}>
                            {users[i].profile_photo === null ? (
                                <img src={SHORT_URL + 'media/profile_images/default.jpg'} alt="user profile" className="assigned-to-photo" />
                            ) : (
                                <img src={users[i].profile_photo} alt="profile" className="assigned-to-photo" />
                            )}
                            {users[i].first_name + ' ' + users[i].surname}
                        </p>
                    );
                }
            }
        }

        if (returnList.length === 0) {
            return <p> No users assigned yet </p>;
        }
        return returnList;
    }

    notEditing() {
        return (
            <div className="details-modal">
                <ModalHeader toggle={this.toggleModal} className="coloured-header mb-0 pb-0" style={{ background: '#' + this.props.epic_colour }}>
                    <p className="details-title"> {this.state.story.title} </p>
                    <p className="details-id float-end"> #{this.state.story.story_id} </p>
                </ModalHeader>

                <ModalBody className="mt-0 pt-0 mb-0">
                    <div className="subtitle-section mt-0 mb-0 pb-0 ">
                        <div className="mt-0 mb-0">{displayTags(this.state.story.tags, this.state.teamTags)}</div>

                        <Button
                            className="details-edit-button mt-3"
                            style={{ border: '2px solid #' + this.props.epic_colour, color: '#' + this.props.epic_colour, marginRight: '42vw' }}
                            onClick={this.toggleEditing}>
                            Edit
                        </Button>

                        <p className="mt-0 mb-0 details-state"> {this.state.story.state}</p>
                        <p className="mt-0 mb-0 details-priority"> {displayPriority(this.state.story.priority)} </p>
                    </div>

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
                                    onTouched={this.validateTitle}
                                    value={this.state.story.user_story}
                                    disabled
                                    className="details-box-large"
                                    style={{
                                        backgroundColor: '#' + this.props.epic_colour + '40',
                                        scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'
                                    }}
                                />
                            </FormGroup>
                        </div>

                        <div className="story-details-dod-box h-100 mb-0">
                            <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                Definition of done
                            </p>

                            <FormGroup>
                                <Input
                                    type="textarea"
                                    rows={5}
                                    name="dod"
                                    value={this.state.story.definition_of_done}
                                    disabled
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
                                Values:
                            </p>
                            <p
                                className="overflow-auto values-scrollable"
                                style={{ scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30' }}>
                                {this.displayValues()}
                            </p>
                        </div>
                    </div>

                    <div className="details-right-col float-right">
                        <div>
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Epic:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getEpicTitle()} </p>
                        </div>

                        <div className="mt-3">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Assigned to:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getAssignedToUsers()} </p>
                        </div>

                        <div className="mt-3">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Last edited:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.story.last_edited_by)} </p>
                            <p className="p-0 mt-1"> {this.state.story.last_edited} </p>
                        </div>

                        <div className="mt-3 mb-0">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Created by:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.story.created_by)} </p>
                            <p className="p-0 mt-1">{this.state.story.time_created} </p>
                        </div>

                        <div className="mt-3 mb-0">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Story Points:
                            </p>
                            <p className="details-story-points" style={{ background: '#' + this.props.epic_colour }}>
                                {this.state.story.story_points}
                            </p>
                        </div>
                    </div>
                </ModalBody>
            </div>
        );
    }

    isEditing() {
        if (this.state.editing) {
            return (
                <UpdateStoryForm
                    story={this.state.story}
                    toggle={this.toggleEditing}
                    resetState={this.resetState}
                    epic_colour={this.props.epic_colour}
                    getTags={displayTeamTags(this.state.teamTags)}
                    getValues={this.displayValues()}
                    team={this.props.team}
                    user={this.props.user}
                />
            );
        } else {
            return this.notEditing();
        }
    }

    displayUserImages() {
        var userImages = [];
        var users = this.props.users;
        var assigned_to = this.props.story.assigned_to;
        var marginLeft = 20;

        if (users.length !== undefined && users !== undefined) {
            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < assigned_to.length; j++) {
                    if (users[i].id === assigned_to[j]) {
                        userImages.push(
                            <div>
                                <a id={users[i].username} className="story-profile-photo-tooltip" style={{ marginLeft: marginLeft + 'px' }}>
                                    {users[i].profile_photo === null ? (
                                        <img
                                            src={SHORT_URL + 'media/profile_images/default.jpg'}
                                            alt="user profile"
                                            className="small-photo"
                                        />
                                    ) : (
                                        <img src={users[i].profile_photo} alt="profile" className="small-photo" />
                                    )}
                                </a>
                                <Tooltip
                                    anchorSelect={'#' + users[i].username}
                                    content={users[i].first_name + ' ' + users[i].surname}
                                    className="delay-tooltip"
                                    data-tooltip-delay-show={1}
                                />
                            </div>
                        );
                        marginLeft = marginLeft - 20;
                    }
                }
            }
        }
        return userImages;
    }

    getUsername(user_id) {
        const users = this.props.user_list;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id === parseInt(user_id)) {
                return users[i].first_name + ' ' + users[i].surname;
            }
        }
    }

    render() {
        var story_box = (
            <div style={{ border: '2px solid #' + this.props.epic_colour }} className="story-box" onClick={this.toggleModal}>
                <p className="story-title"> {this.state.story.title} </p>

                <div className="story-photo-area">{this.displayUserImages()}</div>

                <p className="story-priority"> {displayPriority(this.state.story.priority)} </p>

                {this.state.story.completed || this.props.completed ? (
                    <div className="completed-banner">completed</div>
                ) : (
                    <div className="details-div">
                        <Tooltip id="photo-tooltip" anchorSelect="#profile" /> {displaySmallTags(this.state.story.tags, this.state.teamTags)}
                    </div>
                )}
            </div>
        );

        return (
            <div key={this.state.story.id}>
                {story_box}
                <Modal
                    className="right-modal float-right"
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    style={{
                        minWidth: '60vw',
                        minHeight: '100vh',
                        margin: '0px',
                        boxShadow: 'inset 0 0 2em 0.5em #' + this.props.epic_colour + ', 0 0 2em 0.5em #' + this.props.epic_colour
                    }}>
                    {this.isEditing()}
                </Modal>
            </div>
        );
    }
}

export default StoryDetailsModal;
