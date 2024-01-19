import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import '../../css/basic.css';

class DeleteTeamModal extends Component {
    state = {
        deleteModal: false
    };

    toggleDeleteModal = () => {
        this.setState((previous) => ({
            deleteModal: !previous.deleteModal
        }));
    };

    render() {
        var delete_button = (
            <Button className="btn-delete login-button mt-3 float-end"> Delete Team </Button>
        );

        return (
            <Fragment>
                {delete_button}
                <Modal className="modal-sm" isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Delete {this.props.team.team_name}</ModalHeader>

                    
                    <Modal isOpen={this.state.modal} toggle={this.toggleDeleteModal} className="center">
                    <ModalHeader toggle={this.toggleDeleteModal}>Delete Tag</ModalHeader>

                    <ModalBody>Are you sure you want to permenantly delete this tag?</ModalBody>

                    <ModalFooter>
                        <Button type="button" className="btn-danger" onClick={this.deleteTag}>
                            Delete Tag
                        </Button>
                    </ModalFooter>
                </Modal>
                </Modal>
            </Fragment>
        );
    }
}

export default DeleteTeamModal;
