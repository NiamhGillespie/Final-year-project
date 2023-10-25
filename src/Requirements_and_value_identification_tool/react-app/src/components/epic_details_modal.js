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

                    <ModalBody >
                        <div className="row">
                            <div className="col-sm"> 
                                <p> Value statement </p>
                                <p> {this.props.epic.epic_colour} - replace this with values when added </p>
                            </div>

                            <div className="col-sm"> 
                                <p> Relevant Stories </p>
                                <p> list of stories :) - function </p>
                            </div>
                        </div>
                        <div> 
                            <p> Last edited: </p>
                            <p> {this.props.epic.last_edited_by} - {this.props.epic.last_edited} </p>
                        </div>

                        <div> 
                            <p> Created by: </p>
                            <p> {this.props.epic.created_by} - {this.props.epic.time_created} </p>
                        </div>

                        <ColorPicker className="colour-picker d-inline h-100 w-100" value={this.props.epic.epic_colour} inline disabled ></ColorPicker>
                    </ModalBody>
                </div>
            </Modal>
        </div>
        );
    }
}

export default EpicDetailsModal;