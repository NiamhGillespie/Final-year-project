import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../css/basic.css';
import EditUserForm from './edit_user_form';

class EditUserModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var edit_button = (
            <p className="edit-button align-self-stretch float-end" onClick={this.toggleModal}>
                edit
            </p>
        );

        return (
            <Fragment>
                {edit_button}
                <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggleModal} style={{ minWidth: '64vw', minHeight: '80vh' }}>
                    <ModalHeader toggle={this.toggleModal}>Edit User</ModalHeader>

                    <ModalBody>
                        <EditUserForm toggle={this.toggleModal} user={this.props.user} resetState={this.props.resetState} />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default EditUserModal;
