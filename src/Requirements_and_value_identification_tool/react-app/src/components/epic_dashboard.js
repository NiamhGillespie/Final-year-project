import React, { Component, useState } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import AddStoryModal from './add_story_modal';
import axios from "axios";
import { API_URL } from "../constants";
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './draggable';
import {Droppable} from './droppable';
import {
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";


export class EpicsDashboard extends Component {

    state = {
        epics: [],
        stories: [],
        colour: null,
        parent: null,
        children:null
    };
    
    async componentDidMount() {
        await this.resetState();
    }
    
    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0] }));
    };

    async getStories() {
        await axios.get(API_URL).then(response => this.setState({ stories: response.data[1] }));
    };
    
    resetState= () => {
        this.getEpics();
        this.getStories();
    };

     story_drag_and_drop() {
        const containers = this.state.stories;
        const parent = this.state.parent;
        const draggableMarkup = (
          <Draggable id="draggable"> boop </Draggable>
        );
        // return (
        //   <DndContext onDragEnd={this.handleDragEnd}>
        //     {parent === null ? draggableMarkup : null}
      
        //     {containers.map((id) => (
        //       <Droppable key={id} id={id}>
        //         {parent === id ? draggableMarkup : id.title }
        //       </Droppable>
        //     ))}
        //   </DndContext>
        // );
        
        const items = this.state.stories;
        const epic_colour = 'c45676'

        return (
          <DndContext onDragEnd={this.handleDragEnd}>
            {parent === null ? draggableMarkup : null}
            {/* {items.map((story) => ( <Draggable id="draggable"> {story.title} </Draggable>))} */}
            {/* <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
                > */}
                <div div style={{ background: '#00000r' }} className="epic-box">
                    {items.map((story) => (
                        <Droppable key={story.story_id} id={story.story_id}>
                            {parent === story ? draggableMarkup:
                                <div style={{border: '2px solid ' + '#' + epic_colour}} className="story-box">
                                    <p className='story-title'> {story.title} </p>
                                    { console.log(parent)  }
                                    <p style={{background: '#' + epic_colour}} className='story-profile-photo'> icon </p>
                                    <p className='story-priority'> {this.displayPriority(story.priority)} </p>
                                </div> 
                            }
                        </Droppable>
                    ))}
                </div>
            {/* </SortableContext> */}
          </DndContext>
        );
      
        
      }

    handleDragEnd = event => {
        console.log(this.state.parent)
        const {over} = event;
        this.state.parent = (over ? over.id : null);
        this.setState(this.state);
        console.log(this.state.parent)
    }

    displayEpics() {
        var epics = this.state.epics;
        var return_list = [];

        console.log(epics)
        for (var i = 0; i < epics.length; i++) {
            
            return_list.push(
                <div className="epic-container">
                    <div style={{ background: '#' + epics[i].epic_colour }} className="epic-box"> {epics[i].title}</div>

                    <div className="d-flex flex-column">
                        {this.displayStories(epics[i].id, epics[i].epic_colour)}

                        <div style={{ border: '2px dashed ' + '#' + epics[i].epic_colour }} className="add-story-box">
                            <AddStoryModal resetState={this.resetState} epic_id={epics[i].epic_id} epic_colour={epics[i].epic_colour} />
                        </div>

                    </div>
                </div>
            )
        }
        return return_list;
    };

    displayPriority(priority) {
        var priorityText = '';
        var priorityIcon;
        var priorityColour;
        
        if (priority==='LOW') {
            priorityText = 'low';
            priorityIcon='!';
            priorityColour='green'
        } else if (priority==='MEDIUM') {
            priorityText = 'medium';
            priorityIcon='!!';
            priorityColour='orange'
        } else {
            priorityText = 'high';
            priorityIcon='!!!';
            priorityColour='red'
        }

        return(
            <div>
                <p style={{color: priorityColour}}> { priorityText }    { priorityIcon } </p>
            </div>
        )
    }
    
    displayStories(epic_id, epic_colour) {
        var stories = this.state.stories;
        var matching_list = [];
        var return_list = [];
        console.log('stories:', stories);

        for (var i = 0; i < stories.length; i++) {
            if (stories[i].epic_id === String(epic_id)) {
                matching_list.push(stories[i]);
            }
        }
        
        for (var j = 0; j < matching_list.length; j++) {
            return_list.push(
                <div>
                    <div style={{border: '2px solid ' + '#' + epic_colour}} className="story-box">
                        <p className='story-title'> {matching_list[j].title} </p>
                        <p style={{background: '#' + epic_colour}} className='story-profile-photo'> icon </p>
                        <p className='story-priority'> {this.displayPriority(matching_list[j].priority)} </p>
                    </div>
                </div>
            )
        }

        return return_list;
    }
    

    render() {
        return (
            <div>
                <div className= "border-bottom d-flex flex-row">
                    <p className='text-center'> Stats bar </p>
                    <AddEpicModal create={true} resetState={this.resetState} />
                </div>

                <div>
                    <div> 
                        <p> Team name - Epic Dashboard</p>
                        {/* {this.story_drag_and_drop()} */}
                        <p> draggable component ^</p>
                    </div>
                    
                    <div class="d-flex flex-row w-30 h-100 overflow-auto">
                        { this.displayEpics() }
                    </div>
                </div>
            </div>
        );
    }
}

export default EpicsDashboard;