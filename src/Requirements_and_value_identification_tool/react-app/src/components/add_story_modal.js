import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddStoryForm from "./add_story_form";
import '../css/basic.css';

class AddStoryModal extends Component {
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
            <Button className="add-story-box" onClick={this.toggleModal}>
                +
            </Button>
        );

        return (
        <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Story</ModalHeader>

                <ModalBody>
                    <AddStoryForm
                        toggle={this.toggleModal}
                        epic_id={this.props.epic_id}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
        );
    }
}

export default AddStoryModal;