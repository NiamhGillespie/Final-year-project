import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditColumnForm from './edit_tracking_column_form';

class EditColumnModal extends Component {
    state = {
        modal: false
    };

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var columnTitle = (
            <p onClick={this.toggleModal} className="mb-1 column-title">
                {this.props.column.title}
            </p>
        );

        return (
            <div>
                {columnTitle}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Edit Tracking Column </ModalHeader>

                    <ModalBody>
                        <EditColumnForm
                            toggle={this.toggleModal}
                            resetState={this.props.resetState}
                            column={this.props.column}
                            non_completed_stories={this.props.non_completed_stories}
                            epics={this.props.epics}
                            team={this.props.team}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default EditColumnModal;
