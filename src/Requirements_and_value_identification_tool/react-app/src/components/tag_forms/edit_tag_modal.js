import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditTagForm from './edit_tag_form';

class EditTagModal extends Component {
    state = {
        modal: false
    }; 

    toggleModal = () => {
        this.setState((previous) => ({
            modal: !previous.modal
        }));
    };

    render() {
        var tagTitle = (
            <p className="tag-title" style={{ textDecoration: 'underline #' + this.props.tag.colour }} onClick={this.toggleModal}>
                {this.props.tag.title}
            </p>
        );

        return (
            <div style={{ display: 'inline' }}>
                {tagTitle}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Edit Tag</ModalHeader>

                    <ModalBody>
                        <EditTagForm toggle={this.toggleModal} resetState={this.props.resetState} tag={this.props.tag} belongs_to={this.props.belongs_to}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default EditTagModal;
