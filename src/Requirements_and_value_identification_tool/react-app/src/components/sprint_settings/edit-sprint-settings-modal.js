import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditSprintForm from "./edit-sprint-settings-form";

class EditSprintModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    render() {
        var settingsIcon = (
            <Button className="me-4 mt-0 mb-0 btn-primary add-col-btn-modal" onClick={this.toggleModal}>
                Edit Sprint
            </Button>
       );

        return (
        <Fragment>
            {settingsIcon}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} style={{minWidth: '33vw', minHeight: '50vh'}}>
                <ModalHeader toggle={this.toggleModal}> Edit Sprint </ModalHeader>

                <ModalBody>
                    <EditSprintForm
                        toggle={this.toggleModal}
                        resetState={this.props.resetState}
                        sprint={this.props.sprint}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default EditSprintModal;