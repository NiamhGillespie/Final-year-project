import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddStoryForm from './add_story_form';
import '../../css/basic.css';

class AddStoryModal extends Component {
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
            <p style={{ color: '#' + this.props.epic_colour }} className="inner-add-story-box" onClick={this.toggleModal}>
                +
            </p>
        );

        return (
            <Fragment>
                {button}
                <Modal className="modal-lg" isOpen={this.state.modal} toggle={this.toggleModal} style={{ minWidth: '64vw', minHeight: '80vh' }}>
                    <ModalHeader toggle={this.toggleModal}>Add Story</ModalHeader>

                    <ModalBody>
                        <AddStoryForm toggle={this.toggleModal} epic_id={this.props.epic_id} resetState={this.props.resetState} />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default AddStoryModal;
