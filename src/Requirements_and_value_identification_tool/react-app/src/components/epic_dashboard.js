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
        //const stories = this.state.stories;
        console.log('-----', stories)
        const grid = 8;
        const getListStyle = isDraggingOver => ({
            background: isDraggingOver ? "lightblue" : "lightgrey",
            padding: grid,
            width: 250
          });

        const getItemStyle = (isDragging, draggableStyle) => ({
            // some basic styles to make the items look a bit nicer
            userSelect: "none",
            padding: grid * 2,
            margin: `0 0 ${grid}px 0`,
          
            // change background colour if dragging
            background: isDragging ? "lightgreen" : "grey",
          
            // styles we need to apply on draggables
            ...draggableStyle
        });

          
        if (stories != []) {
            this.state.current_stories = stories
            console.log('stories!!!:', stories)
            this.onDragEnd = this.onDragEnd.bind(this);

            return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        
                       
                        {stories.map((story, index) => (
                              
                                <Draggable key={story.id} draggableId={story.id.toString()} index={index}
                                 style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps
                                  )}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        
                                        {/* {console.log(stories, 'ahhhhhhhhh')} */}

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

    reorder(stories, startIndex, endIndex) {
        console.log('reordering...', stories, startIndex, endIndex)
        
        const [removed] = stories.splice(startIndex, 1);
        stories.splice(endIndex, 0, removed);
        console.log('STORIES REORDERED', stories)

        for (var i = 0; i < stories.length; i++) {
            stories[i].order = i+1
            
            axios.put('http://localhost:8000/api/teamName/stories/' + stories[i].story_id + '/details', stories[i]);
        }
        
        this.state.stories = stories; //only works this way if we have 1 epic only :(
        this.setState(this.state);
      };


    onDragEnd(result)  {
            // dropped outside the list
            resetServerContext()
            if (!result.destination) {
                console.log( 'boop', result)
              return;
            }
        
            console.log('iodsjsdk', this.state.current_stories)
            const items = this.reorder(
                this.state.current_stories,
                result.source.index,
                result.destination.index
              
            );
        
           
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
ReactDOM.render(<EpicsDashboard />, document.getElementById("root"));
export default EpicsDashboard;
