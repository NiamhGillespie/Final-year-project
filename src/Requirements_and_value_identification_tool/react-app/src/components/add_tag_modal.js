import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddTagForm from "./add_tag_form";

class AddTagModal extends Component {
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
            <Button className="btn-primary right-button" onClick={this.toggleModal}>
                Add Tag
            </Button>
        );

        return (
        <div style={{display: 'inline'}}>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Tag</ModalHeader>

                <ModalBody>
                    <AddTagForm
                        toggle={this.toggleModal}
                        resetState={this.props.resetState}
                    />
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default AddTagModal;