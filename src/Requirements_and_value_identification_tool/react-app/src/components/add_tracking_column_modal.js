import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddColumnForm from "./add_tracking_column_form";

class AddColumnModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    render() {
        var button = (
            <Button className="stat-bar-btn btn-primary" onClick={this.toggleModal}>
                +
            </Button>
        );

        return (
        <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}> Add Tracking Column </ModalHeader>

                <ModalBody>
                    <AddColumnForm
                        toggle={this.toggleModal}
                        resetState={this.props.resetState}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default AddColumnModal;