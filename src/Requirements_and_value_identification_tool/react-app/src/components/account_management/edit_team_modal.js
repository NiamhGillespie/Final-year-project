import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../css/basic.css';
import EditUserForm from './edit_user_form';
import EditTeamForm from './edit_team_form';

class EditTeamModal extends Component {
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
                    <ModalHeader toggle={this.toggleModal}>Edit Team</ModalHeader>

                    <ModalBody>
                        <EditTeamForm
                            toggle={this.toggleModal}
                            team={this.props.team}
                            resetState={this.props.resetState}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default EditTeamModal;
