import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { API_URL_TAG_DETAILS } from "../../constants";
import axios from "axios";

class DeleteTagModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState(previous => ({
        modal: !previous.modal
        }));
    };

    deleteTag = () => {
        if (this.state.modal) {
            axios.delete('API_URL_TAG_DETAILS' + this.props.tag.tag_id).then(() => {
                this.props.resetState();
                this.toggleModal();
            });
        }
       
    }

    render() {
        var deleteButton = (
             <p className="tag-edit-button" style={{border: '2px solid #' + this.props.tag.colour, color: '#' + this.props.tag.colour}}  onClick={this.toggleModal}> Delete </p>
        );

        return (
        <div style={{display: 'inline'}}>
            {deleteButton}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="center">
                <ModalHeader toggle={this.toggleModal}>Delete Tag</ModalHeader>

                <ModalBody>
                    Are you sure you want to permenantly delete this tag?
                </ModalBody>


                <ModalFooter>
                    <Button type="button" className="btn-danger" onClick={this.deleteTag}>Delete Tag</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default DeleteTagModal;