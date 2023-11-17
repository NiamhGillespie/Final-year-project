import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS, API_URL_TRACKING_COLUMN_DETAILS } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class EditColumnForm extends Component {

    state = {
        column_id: this.props.column.column_id,
        dashboard_id: this.props.column.dashboard_id,
        team_id: this.props.column.team_id,
        title: this.props.column.title,
        mark_as_complete: this.props.column.mark_as_complete
    };

    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox= e => {
        if (this.state.mark_as_complete === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    updateColumn = e => {
        e.preventDefault();
        axios.put(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    deleteColumn = () => {
        axios.delete(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id).then(() => {
                this.props.resetState();
                this.props.toggle();
        });
    } 


    render() {
        return (
        <Form onSubmit={ this.updateColumn }>
            <FormGroup>
                <Label for="title">Column title:</Label>
                <Input
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            <FormGroup className='checkbox-styling'>
                <Label for="mark_as_complete">Mark stories that are in this column as complete: </Label>
                <Input
                    type="checkbox"
                    name="mark_as_complete"
                    onChange={this.onChangeCheckbox}
                    value={this.returnDefaultIfFieldEmpty(this.state.mark_as_complete)}
                    defaultChecked={this.state.mark_as_complete}
                />
            </FormGroup>

            <Button className="btn-primary">Update Column</Button>

            <Button className="btn-danger float-end" onClick={this.deleteColumn}>Delete Column</Button>
        </Form>
        );
    }
}

export default EditColumnForm;