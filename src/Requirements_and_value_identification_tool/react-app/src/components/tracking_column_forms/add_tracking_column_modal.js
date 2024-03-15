import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddColumnForm from './add_tracking_column_form';

class AddColumnModal extends Component {
    state = {
        modal: false
    }; 

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var button = (
            <div className='add-column-button'>
            <Button className="me-4 mt-0 mb-0 btn-primary " onClick={this.toggleModal}>
                Add Column
            </Button>
            </div>
        );

        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Add Tracking Column </ModalHeader>

                    <ModalBody>
                        <AddColumnForm toggle={this.toggleModal} resetState={this.props.resetState} team={this.props.team} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AddColumnModal;
