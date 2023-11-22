import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL, API_URL_TRACKING_COLUMN_DETAILS, API_URL_STORY_DETAILS } from "../constants";
import { ColorPicker } from 'primereact/colorpicker';
import Multiselect from 'multiselect-react-dropdown';

//need to add error handeling to this :)
class EditColumnForm extends Component {

    state = {
        column_id: this.props.column.column_id,
        dashboard_id: this.props.column.dashboard_id,
        team_id: this.props.column.team_id,
        title: this.props.column.title,
        mark_as_complete: this.props.column.mark_as_complete,
        stories: this.props.column.stories,
        non_completed_stories: this.props.non_completed_stories,
        epics: this.props.epics
    };


    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeCheckbox = e => {
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

    onStoryAddition = e => {

        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id)
            this.updateStoryState(this.state.title, e[i].story);
        }
        this.setState({stories: story_ids});
    
    }

    onStoryDeletion= e => {

        var currently_defined = this.state.stories;
        var still_defined = []
        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id)
            still_defined.push(e[i].story)
        }
        this.setState({stories: story_ids});

        var move_to_undefined = [];
        for (var i = 0; i < currently_defined.length; i++) {
            var defined = false;
            for (var j = 0; j < still_defined.length; j++) {
                if (still_defined[j].story_id == currently_defined[i]) {
                    defined = true
                }
            }
            if (defined === false) {
                move_to_undefined.push(currently_defined[i])
            }
        }
        console.log(move_to_undefined)

        for (var i = 0; i < move_to_undefined.length; i++) {
            var current_story = this.state.non_completed_stories.filter(story => story.story_id == move_to_undefined[i])
            console.log(current_story)
            this.updateStoryState("undefined", current_story[0]);
        }
        
    }

    async updateStoryState(new_state, story) {
        story.state = new_state;
        console.log("story update...", story)
        await axios.put(API_URL_STORY_DETAILS + story.story_id + '/details', story).then(() => {
             this.props.resetState(this.state);
        });
    };


    displayStories() {
        var non_completed_stories = this.state.non_completed_stories;
        var returnList = [];

        var available_stories = non_completed_stories.filter(story => (story.state == this.state.title || story.state == 'undefined'))
        for (var i = 0; i < available_stories.length; i++) {
            returnList.push(
                {title: available_stories[i].title, id: available_stories[i].id, story: available_stories[i]}
            )
        }

        return returnList;
    }

    preselectedStories() {
        var stories = this.state.stories;
        var non_completed_stories = this.state.non_completed_stories
        var returnList = [];
        
        var available_stories = non_completed_stories.filter(story => (story.state == this.state.title || story.state == 'undefined'))

        for (var i = 0; i < available_stories.length; i++) {
            for (var j = 0; j < stories.length; j++) {
                //console.log("value title = ", teamValues[0].title )
                if (available_stories[i].id == stories[j]) {
                    returnList.push(
                        {title: available_stories[i].title, id: available_stories[i].id, story: available_stories[i]}
                    )
                }
            }
        }

        return returnList;
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

            <div>
           <FormGroup>
                <Multiselect options = { this.displayStories() } 
                    onSelect={this.onStoryAddition} 
                    onRemove={this.onStoryDeletion}
                    name="stories" 
                    className='column-story-selection' 
                    style={{chips: { background:  "#58c1d6" },  searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" } }}
                    placeholder="Choose Stories" 
                    displayValue="title" 
                    selectedValues={this.preselectedStories()}
                    showCheckbox
                />
            </FormGroup>
            </div>

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