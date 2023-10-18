import React, { Component, useState } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import AddStoryModal from './add_story_modal';
import axios from "axios";
import { API_URL } from "../constants";
import { resetServerContext } from "react-beautiful-dnd"
import { DragDropContext, Droppable, Draggable   } from 'react-beautiful-dnd';
import ReactDOM from "react-dom";
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
        current_stories: []
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
        const getDraggingStyle = isDraggingOver => ({
            background: isDraggingOver ? "#" + epic_colour + "20" : "WhiteSmoke",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
          });

          
        if (stories != []) {

            return (
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                      return;
                    }
                
                    this.reorderStories(stories, result.source.index, result.destination.index);
                }}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getDraggingStyle(snapshot.isDraggingOver)}>
                        
                       
                        {stories.map((story, index) => (
                              
                              
                              <Draggable key={story.id} draggableId={story.id.toString()} index={index}
                                  >
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
                             
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
              </DragDropContext>
            );
        }
    }

    reorderStories(stories, startIndex, endIndex) {
        //console.log('reordering...', stories, startIndex, endIndex)
        
        const [removed] = stories.splice(startIndex, 1);
        stories.splice(endIndex, 0, removed);
        //console.log('STORIES REORDERED', stories)

        for (var i = 0; i < stories.length; i++) {
            stories[i].order = i+1
            
            axios.put('http://localhost:8000/api/teamName/stories/' + stories[i].story_id + '/details', stories[i]);
        }
        
        this.getStories();
    };

    epics_drag_and_drop(epics) {
        const getDraggingStyle = isDraggingOver => ({
            background: isDraggingOver ? "blue" : "WhiteSmoke",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
            display: "inline-flex",
          });

          
        if (epics != []) {

            return (
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                      return;
                    }
                
                    this.reorderEpics(epics, result.source.index, result.destination.index);
                }}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getDraggingStyle(snapshot.isDraggingOver)}>
                        
                       
                        {epics.map((epic, index) => (
                              
                              
                              <Draggable key={epic.id} draggableId={epic.id.toString()} index={index}
                                  >
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className="epic-container">
                                            <div style={{ background: '#' + epic.epic_colour }} className="epic-box"> {epic.title}</div>
                    
                                            <div className="d-flex flex-column">
                                                {this.displayStories(epic.id, epic.epic_colour)}
                    
                                                <div style={{ border: '2px dashed ' + '#' + epic.epic_colour }} className="add-story-box">
                                                    <AddStoryModal resetState={this.resetState} epic_id={epic.epic_id} epic_colour={epic.epic_colour} />
                                                </div>
                    
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </Draggable>
                             
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
              </DragDropContext>
            );
        }
    }

    reorderEpics(epics, startIndex, endIndex) {
        console.log('reordering...', epics, startIndex, endIndex)
        
        const [removed] = epics.splice(startIndex, 1);
        epics.splice(endIndex, 0, removed);
        console.log('EPICS REORDERED', epics)

        for (var i = 0; i < epics.length; i++) {
            epics[i].order = i+1
            
            axios.put('http://localhost:8000/api/teamName/epics/' + epics[i].epic_id + '/details', epics[i]);
        }
        
        this.state.epics = epics;
        this.setState(this.state);
    };

    displayEpics() {
        var epics = this.state.epics;
        var return_list = [];

        return this.epics_drag_and_drop(epics);
        
        // console.log('EPICS', epics)
        // for (var i = 0; i < epics.length; i++) {
            
        //     return_list.push(
        //         <div className="epic-container">
        //             <div style={{ background: '#' + epics[i].epic_colour }} className="epic-box"> {epics[i].title}</div>

        //             <div className="d-flex flex-column">
        //                 {this.displayStories(epics[i].id, epics[i].epic_colour)}

        //                 <div style={{ border: '2px dashed ' + '#' + epics[i].epic_colour }} className="add-story-box">
        //                     <AddStoryModal resetState={this.resetState} epic_id={epics[i].epic_id} epic_colour={epics[i].epic_colour} />
        //                 </div>

        //             </div>
        //         </div>
        //     )
        // }
        // return return_list;
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
                    </div>
                    
                    <div class="d-flex flex-row w-30 h-100 overflow-auto">
                        { this.displayEpics() }
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<EpicsDashboard />, document.getElementById("root"));
export default EpicsDashboard;
