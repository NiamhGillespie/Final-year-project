import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { API_URL_EPIC_DETAILS } from '../../constants';
import { ColorPicker } from 'primereact/colorpicker';
import { ModalHeader, ModalBody } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { displayValues, getDate, preselectedValues, returnDefaultIfFieldEmpty } from '../helper-methods/form_helper_methods';

//need to add error handeling to this :)
class UpdateEpicForm extends Component {
    state = {
        id: this.props.epic.id,
        epic_id: this.props.epic.epic_id,
        epic_colour: this.props.epic.epic_colour,
        dashboard_id: this.props.epic.dashboard_id,
        title: this.props.epic.title,

        team_values: this.getTeamValues(),
        values: this.props.epic.values,
        tags: this.props.epic.tags,
        order: this.props.epic.order,

        last_edited_by: 'Niamh Gillespie',
        last_edited: getDate(),
        created_by: this.props.epic.created_by,
        time_created: this.props.epic.time_created
    };

    async getTeamValues() {
        await axios.get('http://localhost:8000/api/teamName/values').then((response) => this.setState({ team_values: response.data }));
    }

    onTitleChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    };

    updateEpic = (e) => {
        e.preventDefault();
        axios.put(API_URL_EPIC_DETAILS + this.state.epic_id + '/details', this.state).then(() => {
            this.props.resetState(this.state);
            this.props.toggle();
        });
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

    render() {
        return (
            <Form onSubmit={this.updateEpic}>
                <div className="details-modal">
                    <ModalHeader className="coloured-header" style={{ background: '#' + this.state.epic_colour }}>
                        <FormGroup className="details-form-title">
                            <Input type="text" title="title" onChange={this.onTitleChange} value={returnDefaultIfFieldEmpty(this.state.title)} />
                        </FormGroup>

                        <p className="details-id float-end"> #{this.state.id} </p>
                    </ModalHeader>

                    <ModalBody className="mt-3">
                        <div className="details-left-col float-left" style={{ borderRight: '2px solid #' + this.state.epic_colour + '60' }}>
                            <div className="story-details-values-box h-100 mt-0 mb-0">
                                <p className="details-stories-header" style={{ color: '#' + this.state.epic_colour }}>
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
                                            chips: { background: '#' + this.state.epic_colour },
                                            searchBox: { border: 'none', 'border-bottom': '1px solid blue', 'border-radius': '0px', width: '30vw' }
                                        }}
                                        placeholder="Choose Values"
                                        displayValue="title"
                                        selectedValues={preselectedValues(this.state.values, this.state.team_values)}
                                    />
                                </FormGroup>
                            </div>

                            <div>
                                <p className="details-stories-header" style={{ color: '#' + this.state.epic_colour }}>
                                    Stories:
                                </p>
                                <div class="overflow-auto epic-stories-scrollable">{this.props.getStories}</div>
                            </div>
                        </div>

                        <div className="details-right-col float-right">
                            <Button
                                className="details-edit-button"
                                style={{ border: '2px solid #' + this.state.epic_colour, color: '#' + this.state.epic_colour }}>
                                update
                            </Button>
                            <div>
                                <p style={{ color: '#' + this.state.epic_colour }} className="details-heading mb-2">
                                    Last edited:
                                </p>
                                <p className="p-0 mb-1 mt-1"> {this.state.last_edited_by} </p>
                                <p className="p-0 mt-1"> {this.state.last_edited} </p>
                            </div>

                            <div className="mt-5">
                                <p style={{ color: '#' + this.state.epic_colour }} className="details-heading mb-2">
                                    Created by:
                                </p>
                                <p className="p-0 mb-1 mt-1"> {this.state.created_by} </p>
                                <p className="p-0 mt-1">{this.state.time_created} </p>
                            </div>

                            <div className="mt-5">
                                <p style={{ color: '#' + this.state.epic_colour }} className="details-heading">
                                    Epic colour:
                                </p>
                                <ColorPicker
                                    className="colour-picker d-inline h-100 w-100"
                                    value={this.state.epic_colour}
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
