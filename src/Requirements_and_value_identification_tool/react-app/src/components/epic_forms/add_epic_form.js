import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";
import { ColorPicker } from 'primereact/colorpicker';
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class AddEpicForm extends Component {
    ID = 0;

    state = {
        epic_id: '0',
        epic_colour: "ff0000",
        dashboard_id: "0001",
        title: "",

        team_values: this.getTeamValues(),
        values: [],
        tags: [],
        order: -1,

        last_edited_by: "Niamh Gillespie",
        last_edited: this.getDate(),
        created_by: "Niamh Gillespie",
        time_created: this.getDate()
    };

    getDate() {
        const date = new Date();
        return date.toDateString()
    }

    async getTeamValues() {
        await axios.get('http://localhost:8000/api/teamName/values').then(response => this.setState({ team_values: response.data }))
    }
    

    onTitleChange = e => {
        this.setState({ [e.target.title]: e.target.value });
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createEpic = e => {
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    setColour(colour) {
        this.state.epic_colour = colour;
        this.setState(this.state);
    }

    displayValues() {
        var teamValues = this.state.team_values;
        var returnList = [];

        for (var i = 0; i < teamValues.length; i++) {
            returnList.push(
                {title: teamValues[i].title + " - " + teamValues[i].description, id: teamValues[i].id}
            )
        }

        return returnList;
    }

    onValueAddition = e => {

        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id)
        }
        this.setState({values: value_ids});
    
    }

    onValueDeletion= e => {

        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id)
        }
        this.setState({values: value_ids});
    }


    render() {
        return (
        <Form onSubmit={ this.createEpic }>
            <FormGroup>
                <Label for="title">Epic title:</Label>
                <Input
                    type="text"
                    title="title"
                    onChange={this.onTitleChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.title)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="values">Values:</Label>
                        
                <Multiselect options = { this.displayValues() } onSelect={this.onValueAddition} 
                    onRemove={this.onValueDeletion}
                    name="tags" 
                    className='ms-2' style={{ chips: { background: "green" }, searchBox: 
                    { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }} }
                    placeholder="Choose Tags" displayValue="title"
                />
            </FormGroup>

            <ColorPicker className="colour-picker d-inline h-100 w-100" value={this.epic_colour} onChange={(e) => this.setColour(e.value)} inline />
            <br/>
            <p style={{background: '#' + this.state.epic_colour, color: 'white'}} className="d-inline-block float-right colour-example w-1 h-1" > Colour example </p>
            <br/>

            <Button className="btn-primary d-block">Create Epic</Button>
        </Form>
        );
    }
}

export default AddEpicForm;