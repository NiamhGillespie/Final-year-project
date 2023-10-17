import React, { Component, useState } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import AddStoryModal from './add_story_modal';
import axios from "axios";
import { API_URL } from "../constants";
import { DragDropContext, Droppable, Draggable   } from 'react-beautiful-dnd';
import SortableStory from './sortable_story'
import {
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";


export class EpicsDashboard extends Component {

    state = {
        epics: [],
        stories: [],
        colour: null,
        parent: null
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

    story_drag_and_drop(stories, epic_colour) {
        //const stories = this.state.stories;
        console.log('-----', stories)
        if (stories != []) {
            console.log('stories!!!:', stories)
            
            const parent = this.state.parent;

            return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.id}>
                        
                       
                        {stories.map((story, index) => (
                            <div className='stories' {...stories.droppableProps} ref={React.useRef()}> 
                                <Draggable key={story.id} draggableId={story.id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div style={{border: '2px solid ' + '#' + epic_colour}} className="story-box">
                                            <p className='story-title'> {story.title} </p>
                                            <p style={{background: '#' + epic_colour}} className='story-profile-photo'> icon </p>
                                            <p className='story-priority'> {this.displayPriority(story.priority)} </p>
                                        </div> 
                                    </div>
                                )}
                                </Draggable>
                            </div>
                        ))}
                        </div>
                    )}
                    </Droppable>
              </DragDropContext>
            );
        }
    }

    reorder(list, startIndex, endIndex) {
        console.log('reordering')
      };

    handleOnDragEnd(result) {
            // dropped outside the list
            if (!result.destination) {
              return;
            }
        
            const items = this.reorder(
              this.state.items,
              result.source.index,
              result.destination.index
            );
        
           this.setState(this.state);
          }


    handleDragEndOld = event => {
        
        const {over} = event;
        console.log(this.state.parent, "ahjhhh", over);
        //this.state.stories = this.swapElement(stories, over.id, this.state.parent);
        //this.state.parent = (over ? over.id : null);

        //this.setState(this.state);
        console.log(this.state.parent)
        console.log(this.state.stories)
    }

    swapElement(array, elt_1, elt_2) {
        var temp = array[elt_1];
        array[elt_1] = array[elt_2];
        array[elt_2] = temp;
        return array;
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
        //console.log('stories:', stories);

        if (stories.length >= 1) {
            for (var i = 0; i < stories.length; i++) {
                if (stories[i].epic_id === String(epic_id)) {
                    matching_list.push(stories[i]);
                }
            }
            
            return_list.push(
                <div>
                        {/* <p className='story-title'> {matching_list[j].title} </p>
                        <p style={{background: '#' + epic_colour}} className='story-profile-photo'> icon </p>
                        <p className='story-priority'> {this.displayPriority(matching_list[j].priority)} </p> */}
                        { this.story_drag_and_drop(matching_list, epic_colour) }            
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
                        { }
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