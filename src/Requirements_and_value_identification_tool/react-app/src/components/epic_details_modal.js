import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import '../css/basic.css';
import { ColorPicker } from 'primereact/colorpicker';

class EpicDetailsModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    getStories() {
        var stories = this.props.stories;
        var epic_id = this.props.epic.epic_id;

        var return_list = [];
    
        if (stories.length >= 1) {
            for (var i = 0; i < stories.length; i++) {
                if (stories[i].epic_id === String(epic_id)) {
                    return_list.push(
                        <div className="d-block">
                            <p className="details-stories" style={{ border: '2px solid #' + this.props.epic.epic_colour}}> {stories[i].title} </p> 
                        </div>
                    )
                }
            }
        }

        if (return_list.length === 0) {
            return_list.push(
                <div className="d-block">
                    <p className="details-stories" style={{ border: '2px solid #' + this.props.epic.epic_colour}}> No stories added yet! </p> 
                </div>
            )
        }
        return return_list;
    }

    render() {
        var epic_box = (
            <div style={{ background: '#' + this.props.epic.epic_colour }} className="epic-box" onClick={this.toggleModal}>
                {this.props.epic.title}
            </div>
        );

        return (
        <div>
            {epic_box}
            <Modal className= 'right-modal float-right' isOpen={this.state.modal} toggle={this.toggleModal}
            style={{minWidth: '60vw', minHeight: '100vh', margin: '0px', boxShadow: 'inset 0 0 2em 0.5em #' + this.props.epic.epic_colour + ', 0 0 2em 0.5em #' + this.props.epic.epic_colour}}>
                <div className="details-modal">
                    <ModalHeader toggle={this.toggleModal} className='coloured-header' style={{ background: '#' + this.props.epic.epic_colour }}>
                        <p className="details-title"> {this.props.epic.title} </p>
                        <p className="details-id float-end"> #{this.props.epic.id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-3">
                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.props.epic.epic_colour + '60'}}>
                            <div className="details-value-box h-100"> 
                                <p className="details-box-header" style={{ backgroundColor: '#' + this.props.epic.epic_colour}}> Value statement </p>
                                <p className="details-box-large" style={{ backgroundColor: '#' + this.props.epic.epic_colour + '40',  scrollbarColor: '#' + this.props.epic.epic_colour + '90  #' + this.props.epic.epic_colour + '30'}}>
                                    Need to add in a value section in epic model and form! 
                                </p>
                            </div>

                            <div>
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic.epic_colour}}> Stories: </p>
                                <div class="overflow-auto epic-stories-scrollable">
                                    { this.getStories() }
                                </div>
                            </div>

                        </div>
                        
                        <div className="details-right-col float-right">
                            <div> 
                                <p style={{ color: '#' + this.props.epic.epic_colour}} className="details-heading mb-2"> Last edited: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.epic.last_edited_by} </p>
                                <p className="p-0 mt-1"> {this.props.epic.last_edited} </p>
                            </div>

                            <div className="mt-5"> 
                                <p style={{ color: '#' + this.props.epic.epic_colour}} className="details-heading mb-2"> Created by: </p>
                                <p className="p-0 mb-1 mt-1"> {this.props.epic.created_by} </p>
                                <p className="p-0 mt-1">{this.props.epic.time_created} </p>
                            </div>
                        
                            <div className="mt-5">
                                <p style={{ color: '#' + this.props.epic.epic_colour}} className="details-heading"> Epic colour: </p>
                                <ColorPicker className="colour-picker d-inline  w-120 h-120" value={this.props.epic.epic_colour} inline disabled ></ColorPicker>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </div>
        );
    }
}

export default EpicDetailsModal;