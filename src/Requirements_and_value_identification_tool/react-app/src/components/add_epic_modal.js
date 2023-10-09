import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEpicForm from "./add_epic_form";

class AddEpicModal extends Component {
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
                Add Epic
            </Button>
        );

        return (
        <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Epic</ModalHeader>

                <ModalBody>
                    <AddEpicForm
                        toggle={this.toggleModal}
                        epic={this.props.epics}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default AddEpicModal;