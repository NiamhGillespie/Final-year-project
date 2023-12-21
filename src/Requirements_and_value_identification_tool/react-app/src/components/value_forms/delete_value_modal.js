import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { API_URL_VALUE_DETAILS } from '../../constants';
import axios from 'axios';

class DeleteValueModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    deleteValue = () => {
        if (this.state.modal) {
            axios.delete(API_URL_VALUE_DETAILS + this.props.value.tag_id).then(() => {
                this.props.resetState();
                this.toggleModal();
            });
        }
    };

    render() {
        var deleteButton = (
            <p
                className="tag-edit-button"
                style={{ border: '2px solid #' + this.props.value.colour, color: '#' + this.props.value.colour }}
                onClick={this.toggleModal}>
                Delete
            </p>
        );

        return (
            <div style={{ display: 'inline' }}>
                {deleteButton}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="center">
                    <ModalHeader toggle={this.toggleModal}>Delete Value</ModalHeader>

                    <ModalBody>Are you sure you want to permenantly delete this value?</ModalBody>

                    <ModalFooter>
                        <Button type="button" className="btn-danger" onClick={this.deleteValue}>
                            Delete Value
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DeleteValueModal;
