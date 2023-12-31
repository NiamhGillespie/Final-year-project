import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import TrackingSettingsForm from './tracking_settings_form';

class TrackingSettingsModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var settingsIcon = (
            <Button className="me-4 mt-0 mb-0 btn-primary add-col-btn-modal" onClick={this.toggleModal}>
                Create Sprint
            </Button>
        );

        return (
            <div>
                {settingsIcon}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} style={{ minWidth: '33vw', minHeight: '50vh' }}>
                    <ModalHeader toggle={this.toggleModal}> Create Sprint </ModalHeader>

                    <ModalBody>
                        <TrackingSettingsForm toggle={this.toggleModal} resetState={this.props.resetState} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default TrackingSettingsModal;
