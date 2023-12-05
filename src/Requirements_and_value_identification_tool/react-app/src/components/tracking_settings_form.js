import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class TrackingSettingsForm extends Component {

    state = {
    
    };
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    

    updateSettings = e => {
        e.preventDefault();
        //axios.put(, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        //});
    };

    render() {
        return (
        <Form onSubmit={ this.updateSettings }>
            <FormGroup>
                <Label for="1">Setting One:</Label>
                <Input
                    type="text"
                    name="1"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state)}
                />
            </FormGroup>
            
            <FormGroup>
                <Label for="2">Setting Two:</Label>
                <Input
                    type="text"
                    name="2"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state)}
                />
            </FormGroup>

          
            <Button className="btn-primary">Update Settings</Button>
        </Form>
        );
    }
}

export default TrackingSettingsForm;