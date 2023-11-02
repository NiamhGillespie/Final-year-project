import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import '../css/basic.css';
import { ColorPicker } from 'primereact/colorpicker';
import axios from "axios";

class EpicDetailsModal extends Component {
    state = {
        modal: false,
        teamValues: this.getTeamValues()
    };

    async getTeamValues() {
        var values = await axios.get('http://localhost:8000/api/teamName/values/')
        this.setState({teamValues: values.data})

    }

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

    displayValues() {
        var returnList = [];
        //console.log('tags bb', this.props.story.tags)
        console.log(this.props.epic.values)
        for (var i = 0; i < this.props.epic.values.length; i++ ) {
            var value = this.getValueFromId(this.props.epic.values[i]);
            
            if ( value !== undefined ) {
                returnList.push(
                    <div className="details-value" style={{ border: '2px solid #' + value.colour}}>
                        <p className="details-value-title" > { value.title } </p>
                        <p className="details-value-description"> { value.description } </p>
                    </div>
                    
                )
            }
            
        }
        return returnList
    }


    getValueFromId(id) {
        console.log(this.state.teamValues)
        for (var i = 0; i < this.state.teamValues.length; i++) {
            console.log('boop', this.state.teamValues[i].title)
            if (this.state.teamValues[i].id == id) {
                return this.state.teamValues[i]
            }
        }
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
                            <div className="story-details-values-box h-100 mt-0 mb-0"> 
                                <p className="details-stories-header" style={{ color: '#' + this.props.epic_colour}}> Values </p>
                                <p className="overflow-auto values-scrollable-epic" style={{ scrollbarColor: '#' + this.props.epic_colour + '90  #' + this.props.epic_colour + '30'}}> 
                                    { this.displayValues() }
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