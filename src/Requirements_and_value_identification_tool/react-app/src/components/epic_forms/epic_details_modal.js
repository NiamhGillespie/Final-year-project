import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import '../../css/basic.css';
import { ColorPicker } from 'primereact/colorpicker';
import axios from 'axios';
import UpdateEpicForm from './edit_epic_form';
import { API_URL, API_URL_SHORT, SHORT_URL } from '../../constants';
import { displaySmallValues } from '../helper-methods/epic_display_methods';
import { displaySmallTags } from '../helper-methods/story_display_methods';
import { Tooltip } from 'react-tooltip';

class EpicDetailsModal extends Component {
    state = {
        modal: false,
        editing: false,
        teamValues: this.getTeamValues(),
        teamTags: this.getTeamTags(),
        epic: this.props.epic,
        team: this.props.team
    };

    async getTeamValues() {
        var values = await axios.get(API_URL_SHORT + this.props.team.id + '/values');
        this.setState({ teamValues: values.data });
    }

    async getTeamTags() {
        var tags = await axios.get(API_URL_SHORT + this.props.team.id + '/tags');
        this.setState({ teamTags: tags.data });
    }

    async updateEpic() {
        var epic = await axios.get(API_URL_SHORT + this.props.team.id + '/epics' + this.state.epic.epic_id + '/details');
        if (epic !== undefined) {
            this.setState({ epic: epic.data });
        }
    }

    resetState = (updatedEpic) => {
        this.setState({ epic: updatedEpic });
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

    getUsername(user_id) {
        const users = this.props.user_list;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id === parseInt(user_id)) {
                return users[i].first_name + ' ' + users[i].surname;
            }
        }
    }

    displaySmallTags(tags, teamTags) {
        var returnList = [];
        for (var i = 0; i < tags.length; i++) {
            var tag = this.getTagTitleFromId(tags[i], teamTags);
            if (tag !== undefined) {
                returnList.push(
                    <p className="details-tag-small story-details-tag mb-0" style={{ backgroundColor: '#' + tag.colour }}>
                        {tag.title}
                    </p>
                );
            }
        }
        return returnList;
    }

    getTagTitleFromId(id, teamTags) {
        for (var i = 0; i < teamTags.length; i++) {
            if (teamTags[i].id === id) {
                return teamTags[i];
            }
        }
    }

    displayUserImages(story) {
        var userImages = [];
        var users = this.props.user_list;
        var assigned_to = story.assigned_to;
        var marginLeft = 10;

        if (users.length !== undefined && users !== undefined) {
            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < assigned_to.length; j++) {
                    if (users[i].id === assigned_to[j]) {
                        userImages.push(
                            <div className=" bg-primary">
                                <a id={users[i].username} className="story-details-profile-photo-tooltip" style={{ marginLeft: marginLeft + 'px' }}>
                                    {users[i].profile_photo === null ? (
                                        <img
                                            src={SHORT_URL + 'media/profile_images/default.jpg'}
                                            alt="user profile"
                                            className="story-details-profile-photo"
                                        />
                                    ) : (
                                        <img src={users[i].profile_photo} alt="profile" className="story-details-profile-photo" />
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
                        marginLeft = marginLeft - 5;
                    }
                }
            }
        }
        return userImages;
    }

    getStories() {
        var background_colour = this.state.epic.completed ? 'c7c7c7' : this.state.epic.epic_colour;
        var stories = this.props.stories;
        var epic_id = this.state.epic.epic_id;

        var return_list = [];

        if (stories.length >= 1) {
            for (var i = 0; i < stories.length; i++) {
                if (stories[i].epic_id === String(epic_id)) {
                    return_list.push(
                        <div className="d-block">
                            <div className="details-stories" style={{ border: '2px solid #' + background_colour }}>
                                <div className="story-details-photo-section"> {this.displayUserImages(stories[i])} </div>
                                <p className="mb-1"> {stories[i].title} </p>
                                {this.displaySmallTags(stories[i].tags, this.state.teamTags)}
                            </div>
                        </div>
                    );
                }
            }
        }

        if (return_list.length === 0) {
            return_list.push(
                <div className="d-block">
                    <p className="details-stories" style={{ border: '2px solid #' + background_colour }}>
                        No stories added yet!
                    </p>
                </div>
            );
        }
        return return_list;
    }

    displayValues() {
        var returnList = [];
        for (var i = 0; i < this.state.epic.values.length; i++) {
            var value = this.getValueFromId(this.state.epic.values[i]);

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
                <div className="details-value" style={{ border: '2px solid #' + this.state.epic.epic_colour }}>
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

    notEditing() {
        var background_colour = this.state.epic.completed ? 'c7c7c7' : this.state.epic.epic_colour;
        return (
            <div className="details-modal">
                <ModalHeader toggle={this.toggleModal} className="coloured-header" style={{ background: '#' + background_colour }}>
                    <p className="details-title"> {this.state.epic.title} </p>
                    <p className="details-id float-end"> #{this.state.epic.id} </p>
                </ModalHeader>

                <ModalBody className="mt-3">
                    <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + background_colour + '60' }}>
                        <div className="story-details-values-box h-100 mt-0 mb-0">
                            <p className="details-stories-header" style={{ color: '#' + background_colour }}>
                                Values:
                            </p>
                            <p
                                className="overflow-auto values-scrollable-epic"
                                style={{ scrollbarColor: '#' + this.state.epic_colour + '90  #' + this.state.epic_colour + '30' }}>
                                {this.displayValues()}
                            </p>
                        </div>

                        <div>
                            <p className="details-stories-header" style={{ color: '#' + background_colour }}>
                                Stories:
                            </p>
                            <div class="overflow-auto epic-stories-scrollable">{this.getStories()}</div>
                        </div>
                    </div>

                    <div className="details-right-col float-right">
                        <Button
                            className="details-edit-button"
                            style={{
                                border: '2px solid #' + background_colour,
                                color: '#' + background_colour,
                                marginRight: '5vw'
                            }}
                            onClick={this.toggleEditing}>
                            Edit
                        </Button>

                        <div>
                            <p style={{ color: '#' + background_colour }} className="details-heading mb-2">
                                Last edited:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.epic.last_edited_by)} </p>
                            <p className="p-0 mt-1"> {this.state.epic.last_edited} </p>
                        </div>

                        <div className="mt-5">
                            <p style={{ color: '#' + background_colour }} className="details-heading mb-2">
                                Created by:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.epic.created_by)} </p>
                            <p className="p-0 mt-1">{this.state.epic.time_created} </p>
                        </div>

                        <div className="mt-5">
                            <p style={{ color: '#' + background_colour }} className="details-heading">
                                Epic colour:
                            </p>
                            <ColorPicker className="colour-picker d-inline  w-120 h-120" value={background_colour} inline disabled></ColorPicker>
                        </div>
                    </div>
                </ModalBody>
            </div>
        );
    }

    isEditing() {
        if (this.state.editing) {
            return (
                <UpdateEpicForm
                    epic={this.state.epic}
                    toggle={this.toggleEditing}
                    resetState={this.resetState}
                    getStories={this.getStories()}
                    getValues={this.displayValues()}
                    team={this.props.team}
                    user={this.props.user}
                    user_list={this.props.user_list}
                />
            );
        } else {
            return this.notEditing();
        }
    }
    render() {
        var background_colour = this.state.epic.completed ? 'c7c7c7' : this.state.epic.epic_colour;
        var epic_box = (
            <div style={{ background: '#' + background_colour }} className="epic-box" onClick={this.toggleModal}>
                <div className="epic-title-dashboard"> {this.state.epic.title} </div>

                {this.state.epic.completed ? (
                    <div className="completed-banner-epic">completed</div>
                ) : (
                    <div> {displaySmallValues(this.state.epic.values, this.state.teamValues)}</div>
                )}
            </div>
        );

        return (
            <div>
                {epic_box}

                <Modal
                    className="right-modal float-right"
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    style={{
                        minWidth: '60vw',
                        minHeight: '100vh',
                        margin: '0px',
                        boxShadow: 'inset 0 0 2em 0.5em #' + background_colour + ', 0 0 2em 0.5em #' + background_colour
                    }}>
                    {this.isEditing()}
                </Modal>
            </div>
        );
    }
}

export default EpicDetailsModal;
