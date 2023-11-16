import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditColumnForm from "./edit_tracking-column-form";

class EditColumnModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    render() {
        var columnTitle = (
            <p onClick={this.toggleModal}> { this.props.column.title } </p>
       );

        return (
        <Fragment>
            {columnTitle}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}> Edit Tracking Column </ModalHeader>

                <ModalBody>
                    <EditColumnForm
                        toggle={this.toggleModal}
                        resetState={this.props.resetState}
                        column={this.props.column}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default EditColumnModal;