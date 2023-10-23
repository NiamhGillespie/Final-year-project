import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import '../css/basic.css';

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
            <Modal className= 'modal-lg right-modal float-right w-100 h-100' isOpen={this.state.modal} toggle={this.toggleModal}>
                <div>
                <ModalHeader toggle={this.toggleModal} className='coloured-header h-10' style={{ background: '#' + this.props.epic.epic_colour }}>
                    {this.props.epic.title} 
                </ModalHeader>

                <ModalBody className="h-90">
                    <p> Epic details go here </p>
                </ModalBody>
                </div>
            </Modal>
        </div>
        );
    }
}

export default EpicDetailsModal;