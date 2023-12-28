import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../css/basic.css';
import axios from 'axios';
import UpdateStoryForm from './edit_story_form';
import { displayPriority, displayTags } from '../helper-methods/story_display_methods';
import { displayTeamTags } from '../helper-methods/form_helper_methods';

class StoryDetailsModal extends Component {
    state = {
        modal: false,
        editing: false,
        teamTags: this.getTeamTags(),
        teamValues: this.getTeamValues(),
        story: this.props.story
    };

    async getTeamTags() {
        var tags = await axios.get('http://localhost:8000/api/teamName/tags/');
        this.setState({ teamTags: tags.data });
    }

    async getTeamValues() {
        var values = await axios.get('http://localhost:8000/api/teamName/values/');
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
        return (
            <div className="details-modal">
                <ModalHeader toggle={this.toggleModal} className="coloured-header" style={{ background: '#' + this.props.epic_colour }}>
                    <p className="details-title"> {this.state.story.title} </p>
                    <p className="details-id float-end"> #{this.state.story.story_id} </p>
                </ModalHeader>

                <ModalBody className="mt-0 mb-0">
                    <div className="mt-0 mb-0">{displayTags(this.state.story.tags, this.state.teamTags)}</div>

                    <Button
                        className="details-edit-button"
                        style={{ border: '2px solid #' + this.props.epic_colour, color: '#' + this.props.epic_colour, marginRight: '42vw' }}
                        onClick={this.toggleEditing}>
                        Edit
                    </Button>

                    <p className="mt-0 mb-0 details-state"> {this.state.story.state}</p>
                    <p className="mt-0 mb-0 details-priority"> {displayPriority(this.state.story.priority)} </p>

                    <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.props.epic_colour + '60' }}>
                        <div className="story-details-user-story-box h-100">
                            <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                User story
                            </p>
                            <p
                                className="details-box-large"
                                style={{
                                    backgroundColor: '#' + this.props.epic_colour + '40',
                                    scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'
                                }}>
                                {this.state.story.user_story}
                            </p>
                        </div>

                        <div className="story-details-dod-box h-100 mt-0 mb-0">
                            <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour }}>
                                Definition of done
                            </p>
                            <p
                                className="details-box-small"
                                style={{
                                    backgroundColor: '#' + this.props.epic_colour + '40',
                                    scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'
                                }}>
                                {this.state.story.definition_of_done}
                            </p>
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
                            <p className="p-0 mb-1 mt-1"> #{this.state.story.epic_id} </p>
                        </div>

                        <div className="mt-3">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Assigned to:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.state.story.assigned_to} </p>
                        </div>

                        <div className="mt-3">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Last edited:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.state.story.last_edited_by} </p>
                            <p className="p-0 mt-1"> {this.state.story.last_edited} </p>
                        </div>

                        <div className="mt-3 mb-0">
                            <p style={{ color: '#' + this.props.epic_colour }} className="details-heading mb-2">
                                Created by:
                            </p>
                            <p className="p-0 mb-1 mt-1"> {this.state.story.created_by} </p>
                            <p className="p-0 mt-1">{this.state.story.time_created} </p>
                        </div>

                        <div className="mt-3 mb-0">
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
                />
            );
        } else {
            return this.notEditing();
        }
    }

    render() {
        var story_box = (
            <div style={{ border: '2px solid #' + this.props.epic_colour }} className="story-box" onClick={this.toggleModal}>
                <p className="story-title"> {this.state.story.title} </p>
                <p style={{ background: '#' + this.props.epic_colour }} className="story-profile-photo">
                    icon
                </p>
                <p className="story-priority"> {displayPriority(this.state.story.priority)} </p>
            </div>
        );

        return (
            <div  key={this.state.story.id}>
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
