import React, { Component, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";
import Multiselect from 'multiselect-react-dropdown';
import '../../css/basic.css';

//need to add error handeling to this :)
class AddStoryForm extends Component {

    state = {
        story_id: "0",
        epic_id: this.props.epic_id,
        title: "",

        order: 0,

        user_story: "As a \nI would like to \nSo that I can ",
        definition_of_done: "",
        team_values: this.getTeamValues(),
        values: [],
        team_tags: this.getTeamTags(),
        tags: [],
        priority: "LOW",

        pairable: false,
        assigned_to: "",


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

    async getTeamTags() {
        await axios.get('http://localhost:8000/api/teamName/tags').then(response => this.setState({ team_tags: response.data }))
    }


    onChange = e => {
        //console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox= e => {
        if (this.state.pairable === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    returnDefaultIfFieldEmpty = value => {
        return value === "" ? "" : value;
    };

    createStory = e => {
        //console.log('story being created ...');
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

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
        //console.log("the tags: ", value_ids)
        this.setState({values: value_ids});
        
        //console.log("adding - current tags", this.state.values)
    
    }

    onValueDeletion= e => {

        var value_ids = [];
        for (var i = 0; i < e.length; i++) {
            value_ids.push(e[i].id)
        }
        this.setState({values: value_ids});
        //console.log("the new tags: ", value_ids)

        //console.log("deleting - current tags", this.state.values)
    }

    displayTeamTags() {
        var teamTags = this.state.team_tags;
        var returnList = [];

        for (var i = 0; i < teamTags.length; i++) {
            returnList.push(
                {title: teamTags[i].title + " - " + teamTags[i].description, id: teamTags[i].id}
            )
        }

        return returnList;
    }

    onTagAddition = e => {

        var tag_ids = [];
        for (var i = 0; i < e.length; i++) {
            tag_ids.push(e[i].id)
        }
        //console.log("the tags: ", tag_ids)
        this.setState({tags: tag_ids});
        
        //console.log("adding - current tags", this.state.tags)
    
    }

    onTagDeletion= e => {

        var tag_ids = [];
        for (var i = 0; i < e.length; i++) {
            tag_ids.push(e[i].id)
        }
        this.setState({tags: tag_ids});
        //console.log("the new tags: ", tag_ids)

        //console.log("deleting - current tags", this.state.tags)
    }

    render() {
        return (
        <Form onSubmit={ this.createStory }>

                <div className='add-story-left-col'>
                    <FormGroup>
                        <Label for="title">Story title:</Label>
                        <Input
                            type="text-long"
                            name="title"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.title)}
                            className='w-40'
                        />
                    </FormGroup>


                    <FormGroup>
                        <Label for="user_story"> User Story:</Label>
                        <Input
                            type="textarea"
                            rows={5}
                            name="user_story"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.user_story)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="definition_of_done">Definition of Done:</Label>
                        <Input
                            type="textarea"
                            rows={4}
                            name="definition_of_done"
                            onChange={this.onChange}
                            value={this.returnDefaultIfFieldEmpty(this.state.definition_of_done)}
                        />
                    </FormGroup>
                </div>

                <div className='add-story-right-col'>
                    <FormGroup>
                        <Label for="values">Value statement:</Label>
                        
                        <Multiselect options = { this.displayValues() } onSelect={this.onValueAddition} 
                        onRemove={this.onValueDeletion}
                        name="tags" 
                        className='ms-2' style={{ chips: { background: "green" }, searchBox: 
                        { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }} }
                        placeholder="Choose Tags" displayValue="title"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="tags">Tags: </Label>
                        <Multiselect  options = { this.displayTeamTags() } onSelect={this.onTagAddition} 
                        onRemove={this.onTagDeletion}
                        name="tags" 
                        className='ms-2' style={{ chips: { background: "red" }, searchBox: 
                        { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }} }
                        placeholder="Choose Tags" displayValue="title"/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="priority">Priority: </Label>
                        <select value={this.state.value} onChange={this.onChange} name="priority" className='ms-2'>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </FormGroup>

                    <FormGroup className='checkbox-styling'>
                        <Label for="pairable">Pairable: </Label>
                        <Input
                            type="checkbox"
                            name="pairable"
                            onChange={this.onChangeCheckbox}
                            value={this.returnDefaultIfFieldEmpty(this.state.pairable)}
                        />
                    </FormGroup>

                <FormGroup>
                    <Label for="assigned_to">Assigned to:</Label>
                    <Input
                        type="text"
                        name="assigned_to"
                        onChange={this.onChange}
                        value={this.returnDefaultIfFieldEmpty(this.state.assigned_to)}
                    />
                </FormGroup>

            </div>

            <div className='w-100'>
                <Button className="btn-primary w-100 float-right mt-5"> Create Story </Button>
            </div>
            
        </Form>
        );
    }
}

export default AddStoryForm;