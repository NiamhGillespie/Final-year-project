import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditValueForm from "./edit_value_form";

class EditValueModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    render() {
        var editButton = (
            <p className='tag-title' style={{textDecoration: 'underline #' + this.props.value.colour }} onClick={this.toggleModal}> { this.props.value.title } </p>
        );

        return (
        <div style={{display: 'inline'}}>
            {editButton}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Edit Value</ModalHeader>

                <ModalBody>
                    <EditValueForm
                        toggle={this.toggleModal}
                        resetState={this.props.resetState}
                        value={this.props.value}
                    />
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default EditValueModal;