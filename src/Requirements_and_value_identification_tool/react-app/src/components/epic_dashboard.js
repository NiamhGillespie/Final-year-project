import React, { Component } from 'react';
import '../css/basic.css';
import AddEpicModal from './add_epic_modal';
import AddStoryModal from './add_story_modal';
import axios from "axios";
import { API_URL } from "../constants";
import { DragDropContext, Droppable, Draggable   } from '../constants/drag_and_drop';
import ReactDOM from "react-dom";
import EpicDetailsModal from './epic_details_modal';
import StoryDetailsModal from './story_details_modal';


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
            background: isDraggingOver ? "#" + epic_colour + "20" : "",
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
                    <Droppable droppableId="droppable" direction="vertical">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getDraggingStyle(snapshot.isDraggingOver)}>
                        
                       
                        {stories.map((story, index) => (
                              
                              <div>
                              <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop"
                                  >
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                    
                                    <div {...provided.dragHandleProps}>
                                        <StoryDetailsModal resetState={this.resetState} story={story} epic_colour={epic_colour}/>
                                    </div>
                                    </div>
                                )}
                                </Draggable>
                                </div>
                             
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
        
        const [removed] = stories.splice(startIndex, 1);
        stories.splice(endIndex, 0, removed);

        for (var i = 0; i < stories.length; i++) {
            stories[i].order = i+1
            
            axios.put('http://localhost:8000/api/teamName/stories/' + stories[i].story_id + '/details', stories[i]);
        }
        
        this.getStories();
    };

    epics_drag_and_drop(epics) {
        const getDraggingStyleEpicList = isDraggingOver => ({
            // background: isDraggingOver ? "#58c1d620" : "",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
            display: "flex",
        });

        if (epics != []) {

            return (
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                      return;
                    }
                
                    this.reorderEpics(epics, result.source.index, result.destination.index);
                }}>
                    <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getDraggingStyleEpicList(snapshot.isDraggingOver)}>
                        
                       
                        {epics.map((epic, index) => (
                              
                              
                              <Draggable key={epic.id} draggableId={epic.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                        <div className="epic-container" style={{ 
                                                border: snapshot.draggingOver ? "3px solid #" + epic.epic_colour + "60" : "", 
                                            }}>

                                            <div {...provided.dragHandleProps}> 
                                                <EpicDetailsModal resetState={this.resetState} epic={epic} stories={this.state.stories}/>
                                            </div>
                                                
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
        //console.log('reordering...', epics, startIndex, endIndex)
        
        const [removed] = epics.splice(startIndex, 1);
        epics.splice(endIndex, 0, removed);
       // console.log('EPICS REORDERED', epics)

        for (var i = 0; i < epics.length; i++) {
            epics[i].order = i+1
            
            axios.put('http://localhost:8000/api/teamName/epics/' + epics[i].epic_id + '/details', epics[i]);
        }
        
        this.state.epics = epics;
        this.setState(this.state);
    };

    displayEpics() {
        var epics = this.state.epics;

        return this.epics_drag_and_drop(epics);
    };
    
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

    dateInWeek(createdDate) {

        var weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7)

        createdDate = Date.parse(createdDate)

        console.log(weekAgo <= createdDate)
        return weekAgo <= createdDate

    }
    
    displayStatsBar() {
        var returnList = [];
        returnList.push(
            <div style={{ display: 'inline-block' }} >
                <p style={{ clear: 'both' }} className='epic-stat'> {this.state.epics.filter(epic => this.dateInWeek(epic.time_created)).length} </p>

                <p style={{ fontSize: '2vh'}} className='epic-stat'> Epics added this week </p>
            </div>
        )
        
        returnList.push(
            <div style={{ display: 'inline-block' }} >
                <p style={{ clear: 'both' }} className='epic-stat'> {this.state.stories.filter(story => this.dateInWeek(story.time_created)).length} </p>
                
                <p style={{ fontSize: '2vh'}} className='epic-stat'> Stories added this week </p>
            </div>
        )

        returnList.push(
            <div style={{ display: 'inline-block' }} >
                <p style={{clear: 'both'}} className='epic-stat'> {this.state.stories.filter(story => story.priority == 'HIGH').length} </p>
                <p style={{ fontSize: '2vh'}} className='epic-stat'> High priority stories </p>
            </div>
        )
        return returnList;
    }

    render() {
        return (
            <>
            <div key='epic-dashboard'>
                <div className= "border-bottom d-flex flex-row">
                    <p className='text-center'> { this.displayStatsBar() } </p>
                    <AddEpicModal create={true} resetState={this.resetState} />
                </div>

                <div>
                    
                    <div className="d-flex flex-row w-30 h-100 overflow-y">
                        { this.displayEpics() }
                    </div>
                </div>
            </div>
            </>
        );
    }
}
export default EpicsDashboard;
