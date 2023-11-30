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
        stories: this.props.column.stories,story_list: '',
        WIP: this.props.column.WIP,
        
        non_completed_stories: this.props.non_completed_stories,
        epics: this.props.epics,
        original_stories: this.props.column.stories,
        original_title: this.props.column.title
    };


    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.name === "title") {
            console.log(this.state.stories, "changing title")
            this.redefine(this.state.stories,  e.target.value)
        }
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

    redefine(stories, state) {
        console.log("stories are", stories)
        for (var i = 0; i < stories.length; i++) {
            this.updateStoryState(stories[i], state)
        }
    }
    
    async updateStoryState(story_id, new_state) {
        console.log("ID", story_id, "STATE", new_state)
        var full_story = await axios.get(API_URL_STORY_DETAILS + story_id + '/details')
        full_story.data.state = new_state;

        await axios.put(API_URL_STORY_DETAILS + full_story.data.story_id + '/details', full_story.data).then(() => {
             this.props.resetState();
        });
    };

    updateColumn = e => {
        e.preventDefault();
        this.redefine(this.state.original_stories, 'undefined')
        this.redefine(this.state.stories, this.state.title)
        this.state.story_list = this.state.stories.toString();
        axios.put(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    deleteColumn = () => {
        //move stories to undefined
        this.redefine(this.state.stories, 'undefined')
        axios.delete(API_URL_TRACKING_COLUMN_DETAILS + this.state.column_id).then(() => {
                this.props.resetState();
                this.props.toggle();
        });
    } 

    onStoryAddition = e => {

        console.log(e)
        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id)
        }
        this.setState({stories: story_ids});
        this.state.stories = story_ids;
        this.setState({story_list: story_ids.toString()});
    }

    onStoryDeletion= e => {
        var story_ids = [];
        for (var i = 0; i < e.length; i++) {
            story_ids.push(e[i].id)
        }
        this.setState({stories: story_ids});
        this.setState({story_list: story_ids.toString()});
    }

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

        var available_stories = non_completed_stories.filter(story => (story.state == 'undefined' || this.state.title))

        for (var i = 0; i < available_stories.length; i++) {
            for (var j = 0; j < stories.length; j++) {
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
            
            <FormGroup>
                <Label for="WIP">WIP limit:</Label>
                <Input
                    type="text"
                    name="WIP"
                    onChange={this.onChange}
                    value={this.returnDefaultIfFieldEmpty(this.state.WIP)}
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