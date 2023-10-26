import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import '../css/basic.css';

class StoryDetailsModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    displayPriority(priority) {
        var priorityText = '';
        var priorityIcon;
        var priorityColour;
        
        if (priority==='LOW') {
            priorityText = 'low';
            priorityIcon='!';
            priorityColour='green'
        } else if (priority==='MEDIUM') {
            priorityText = 'medium';
            priorityIcon='!!';
            priorityColour='orange'
        } else {
            priorityText = 'high';
            priorityIcon='!!!';
            priorityColour='red'
        }

        return(
            <div>
                <p style={{color: priorityColour}}> { priorityText }    { priorityIcon } </p>
            </div>
        )
    }

    render() {
        var story_box = (
            <div style={{border: '2px solid ' + '#' + this.props.epic_colour}} className="story-box" onClick={this.toggleModal}>
                <p className='story-title'> {this.props.story.title} </p>
                <p style={{background: '#' + this.props.epic_colour}} className='story-profile-photo'> icon </p>
                <p className='story-priority'> {this.displayPriority(this.props.story.priority)} </p>
            </div>
        );

        return (
        <div>
            {story_box}
            <Modal className= 'right-modal float-right' isOpen={this.state.modal} toggle={this.toggleModal}
            style={{minWidth: '60vw', minHeight: '100vh', margin: '0px', boxShadow: 'inset 0 0 2em 0.5em #' + this.props.epic_colour + ', 0 0 2em 0.5em #' + this.props.epic_colour}}>
                <div className="details-modal">
                    <ModalHeader toggle={this.toggleModal} className='coloured-header' style={{ background: '#' + this.props.epic_colour }}>
                        <p className="details-title"> {this.props.story.title} </p>
                        <p className="details-id float-end"> #{this.props.story.id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-0 mb-0">
                        <div className="mt-0 mb-0">
                            <p className="details-tag" style={{ border: '2px solid #' + this.props.epic_colour}}> tag 1 </p>
                            <p className="details-tag" style={{ border: '2px solid #' + this.props.epic_colour}}> tag 2 </p>
                            <p className="details-tag" style={{ border: '2px solid #' + this.props.epic_colour}}> tag 3 </p>
                        </div>
                       
                        <p className="mt-0 mb-0 details-state"> State - come back to once I have kanban boards setup</p>
                        <p className="mt-0 mb-0 details-priority"> {this.displayPriority(this.props.story.priority)} </p>

                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.props.epic_colour + '60'}}>
                            <div className="story-details-user-story-box h-100"> 
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour}}> User story </p>
                                <p className="details-box-large" style={{ backgroundColor: '#' + this.props.epic_colour + '40',  scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'}}>
                                    {this.props.story.user_story}
                                </p>
                            </div>

                            <div className="story-details-dod-box h-100 mt-0 mb-0"> 
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour}}> Definition of done </p>
                                <p className="details-box-small" style={{ backgroundColor: '#' + this.props.epic_colour + '40',  scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'}}> 
                                    {this.props.story.definition_of_done} 
                                </p>
                            </div>

                            <div className="story-details-values-box h-100 mt-0 mb-0"> 
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic_colour}}> Value statement </p>
                                <p className="details-box-small" style={{ backgroundColor: '#' + this.props.epic_colour + '40',  scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'}}> 
                                    {this.props.story.value_statement} 
                                </p>
                            </div>

                        </div>
                        
                        <div className="details-right-col float-right">
                            <div> 
                                <p style={{ color: '#' + this.props.epic_colour}} className="details-heading mb-2"> Epic: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.story.epic_id} </p>
                            </div>

                            <div className="mt-3"> 
                                <p style={{ color: '#' + this.props.epic_colour}} className="details-heading mb-2">Assigned to: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.story.assigned_to} </p>
                            </div>

                            <div className="mt-3"> 
                                <p style={{ color: '#' + this.props.epic_colour}} className="details-heading mb-2"> Last edited: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.story.last_edited_by} </p>
                                <p className="p-0 mt-1"> {this.props.story.last_edited} </p>
                            </div>

                            <div className="mt-3 mb-0"> 
                                <p style={{ color: '#' + this.props.epic_colour}} className="details-heading mb-2"> Created by: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.story.created_by} </p>
                                <p className="p-0 mt-1">{this.props.story.time_created} </p>
                            </div>

                            <div className="mt-3 mb-0">
                                <p className="details-story-points" style={{ background: '#' + this.props.epic_colour}}> 8 </p>
                            </div>
                    
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </div>
        );
    }
}

export default StoryDetailsModal;