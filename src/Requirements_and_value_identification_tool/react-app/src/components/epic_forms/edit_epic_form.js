import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { API_URL_EPIC_DETAILS, API_URL_SHORT } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { ModalHeader, ModalBody } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { displayValues, getDate, preselectedValues, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';
import DeleteTagModal from '../tag_forms/delete_tag_modal';

//need to add error handeling to this :)
class UpdateEpicForm extends Component {
    state = {
        id: this.props.epic.id,
        epic_id: this.props.epic.epic_id,
        epic_colour: this.props.epic.epic_colour,
        team_id: this.props.epic.team_id,
        title: this.props.epic.title,

        team_values: this.getTeamValues(),
        values: this.props.epic.values,
        tags: this.props.epic.tags,
        order: this.props.epic.order,

        last_edited_by: this.props.epic.last_edited_by,
        last_edited: getDate(),
        created_by: this.props.epic.created_by,
        time_created: this.props.epic.time_created,

        completed: this.props.epic.completed,

        validate: {
            title: 'valid'
        }
    };

    async getTeamValues() {
        await axios.get(API_URL_SHORT + this.props.team.id + '/values').then((response) => this.setState({ team_values: response.data }));
    }

    onTitleChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    };

    updateEpic = (e) => {
        e.preventDefault();

        if (this.state.validate.title !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            this.setState({ last_edited_by: this.props.user.id });
            axios.put(API_URL_EPIC_DETAILS + this.state.epic_id + '/details', this.state).then(() => {
                this.props.resetState(this.state);
                this.props.toggle();
            });
        }
    };

    setColour(colour) {
        this.setState({ epic_colour: colour });
        this.props.resetState(this.state);
    }

    onValueAddition = (e) => {
        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id);
        }
        this.setState({ values: value_ids });
    };

    onValueDeletion = (e) => {
        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id);
        }
        this.setState({ values: value_ids });
    };

    validateTitle(e) {
        const validate = this.state.validate;

        if (e.target.value.length === 0) {
            validate.title = 'too_short';
        } else if (e.target.value.length > 128) {
            validate.title = 'too_long';
        } else {
            validate.title = 'valid';
        }

        this.setState({ validate });
    }

    complete_epic() {
        if (this.state.completed) {
            this.setState({ completed: false });
            this.state.completed = false;
        } else {
            this.setState({ completed: true });
            this.state.completed = true;
        }
        
        if (this.state.validate.title !== 'valid') {
            alert('The form is invalid, please try again');
        } else {
            this.setState({ last_edited_by: this.props.user.id });
            axios.put(API_URL_EPIC_DETAILS + this.state.epic_id + '/details', this.state).then(() => {
                this.props.resetState(this.state);
                this.props.toggle();
            });
        }
    }

    delete_epic() {
        if (window.confirm("Delete epic '" + this.state.title + "'? All relevent stories will also be deleted.")) {
            axios.delete(API_URL_EPIC_DETAILS + this.state.epic_id + '/details').then(() => {
                this.props.resetState(this.state);
                this.props.toggle();
                alert('Epic deleted');
            });
        }
    }

    getUsername(user_id) {
        const users = this.props.user_list;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id === parseInt(user_id)) {
                return users[i].first_name + ' ' + users[i].surname;
            }
        }
    }

    render() {
        var background_colour = this.state.completed ? 'c7c7c7' : this.state.epic_colour;
        return (
            <Form onSubmit={this.updateEpic}>
                <div className="details-modal">
                    <ModalHeader className="coloured-header mb-0 pb-0" style={{ background: '#' + background_colour }}>
                        <FormGroup>
                            <Input
                                className="details-form-title"
                                type="text"
                                title="title"
                                onChange={(e) => {
                                    this.onTitleChange(e);
                                    this.validateTitle(e);
                                }}
                                onTouched={this.validateTitle}
                                value={returnDefaultIfFieldEmpty(this.state.title)}
                                invalid={this.state.validate.title === 'too_short' || this.state.validate.title === 'too_long'}
                            />
                            <FormFeedback invalid className="text-white">
                                {this.state.validate.title === 'too_short' && <p> Please enter a title </p>}
                                {this.state.validate.title === 'too_long' && <p> A title can't be longer than 128 characters </p>}
                            </FormFeedback>
                        </FormGroup>

                        <p className="details-id float-end"> #{this.state.id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-0 pt-0">
                        <div className="subtitle-section edit-subtitle mt-0 mb-0 pb-0 ">
                            <Button
                                className="details-edit-button "
                                style={{ border: '2px solid #' + background_colour, color: '#' + background_colour }}>
                                Update
                            </Button>

                            <Button
                                className="details-edit-button"
                                style={{ border: '2px solid #' + background_colour, color: '#' + background_colour }}
                                onClick={() => this.complete_epic()}>
                                {this.state.completed ? <> Mark epic as incomplete </> : <> Mark epic as complete </>}
                            </Button>

                            <Button
                                className="details-edit-button"
                                style={{ border: '2px solid #' + background_colour, color: '#' + background_colour }}
                                onClick={() => this.delete_epic()}>
                                Delete epic
                            </Button>
                        </div>
                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + background_colour + '60' }}>
                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + background_colour }}>
                                    Values:
                                </p>
                                <FormGroup>
                                    <Multiselect
                                        options={displayValues(this.state.team_values)}
                                        onSelect={this.onValueAddition}
                                        onRemove={this.onValueDeletion}
                                        name="tags"
                                        className="ms-2"
                                        style={{
                                            chips: { background: '#' + background_colour },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px', width: '30vw' }
                                        }}
                                        placeholder="Choose Values"
                                        displayValue="title"
                                        selectedValues={preselectedValues(this.state.values, this.state.team_values)}
                                    />
                                </FormGroup>
                            </div>

                            <div>
                                <p className="details-stories-header" style={{ color: '#' + background_colour }}>
                                    Stories:
                                </p>
                                <div class="overflow-auto epic-stories-scrollable">{this.props.getStories}</div>
                            </div>
                        </div>

                        <div className="details-right-col float-right">
                            <div>
                                <p style={{ color: '#' + background_colour }} className="details-heading mb-2">
                                    Last edited:
                                </p>
                                <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.last_edited_by)} </p>
                                <p className="p-0 mt-1"> {this.state.last_edited} </p>
                            </div>

                            <div className="mt-5">
                                <p style={{ color: '#' + background_colour }} className="details-heading mb-2">
                                    Created by:
                                </p>
                                <p className="p-0 mb-1 mt-1"> {this.getUsername(this.state.created_by)} </p>
                                <p className="p-0 mt-1">{this.state.time_created} </p>
                            </div>

                            <div className="mt-5">
                                <p style={{ color: '#' + background_colour }} className="details-heading">
                                    Epic colour:
                                </p>
                                <ColorPicker
                                    title="colour_picker"
                                    className="colour-picker d-inline h-100 w-100"
                                    value={background_colour}
                                    onChange={(e) => this.setColour(e.value)}
                                    inline
                                />
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Form>
        );
    }
}

export default UpdateEpicForm;
