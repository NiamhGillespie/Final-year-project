import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddValueForm from './add_value_form';

class AddValueModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var button = (
            <Button className="btn-primary right-button" onClick={this.toggleModal}>
                Add Value
            </Button>
        );

        return (
            <div style={{ display: 'inline' }}>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Value</ModalHeader>

                    <ModalBody>
                        <AddValueForm toggle={this.toggleModal} resetState={this.props.resetState} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AddValueModal;
