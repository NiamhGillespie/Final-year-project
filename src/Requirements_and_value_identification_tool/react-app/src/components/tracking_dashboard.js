import React, { Component } from 'react';
import '../css/basic.css';
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS, API_URL } from "../constants";
import AddColumnModal from './add_tracking_column_modal';
import EditColumnModal from './edit_tracking_column_modal';
import { DragDropContext, Droppable, Draggable   } from '../constants/drag_and_drop';


export class TrackingDashboard extends Component {

    state = {
        boards: [],
        columns: [],
        non_completed_stories: [],
        epics: []
    };

    async componentDidMount() {
        await this.resetState();
    }
    
    async getColumns() {
        await axios.get(API_URL_DASHBOARD_TRACKING_COLUMNS).then(response => this.setState({ columns: response.data }));
    };

    async getNonCompletedStories() {
        await axios.get(API_URL).then(response => this.setState({ non_completed_stories: response.data[1].filter(story => story.state != 'done') }));
    }

    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0]}));
    }
   
    resetState= () => {
        this.getColumns();
        this.getNonCompletedStories();
        this.getEpics();
        
    };
    
    displayColumns() {
        var return_list = [];
        const columns = this.state.columns;
        const non_completed_stories = this.state.non_completed_stories;
        console.log(columns, non_completed_stories)
        const getDraggingStyle = isDraggingOver => ({
            background: isDraggingOver ? "#"  + "20" : "",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
          });

        if (columns !== undefined) {
            //for (var i = 0; i < this.state.columns.length; i++) {
                //if (columns[i] !== undefined) {
                 //console.log("OK COLUMNS?", columns[i])
                return_list.push(
                    <DragDropContext onDragEnd={result => {
                        if (!result.destination) {
                            console.log("in funct col", result)
                          return;
                          
                        }
                    
                        console.log("outside funct col", result)
                        return "boop"
                        //this.reorderStories(columns, result.source.index, result.destination.index);
                    }}>
    
                    <Droppable droppableId={'column'}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='d-flex'>
                        
                    
                        {columns.map((column, index) => (
                    <div className='column-container'> 
                        <EditColumnModal className='pb-0 mb-0' resetState={this.resetState} column={column} non_completed_stories={non_completed_stories}/>
                        
                        <hr className='pt-0 mt-0'></hr>

                        {this.displayStories(column)}
                    </div>)

                    )}
                    </div>
                    )}
                    </Droppable>
                    </DragDropContext>
                )
            }
        
        return_list.push(
            <AddColumnModal resetState={this.resetState}/>
        )

        return return_list;
    }

    reorderStories(stories, result_index, destination_index) {
        console.log(result_index, destination_index)
    }

    displayStories(column) {      
        const getDraggingStyle = isDraggingOver => ({
            background: isDraggingOver ? "#"  + "20" : "",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
          });

        var story_ids = column.stories
        var returnList = [];
        var stories = [];
        if (story_ids != undefined && story_ids != []) {
            for (var i = 0; i < story_ids.length; i++) {
                stories.push(this.state.non_completed_stories.filter(story => story.id == story_ids[i])[0])
            }

            if (stories[0] != undefined) {
                console.log("STORIES", stories[0]);
                for (var i = 0; i < stories.length; i++) {
                    returnList.push (
                        <div style={{border: '2px solid ' + 'red'}} className="story-box">
                            <p className='story-title'> {stories[i].title} </p>
                            <p style={{background: 'red'}} className='story-profile-photo'> icon </p>
                            <p className='story-priority'> {(stories[i].priority)} </p>
                        </div>
                    )
                }
            

            return (
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                        console.log("in funct", result)
                    return;
                    }
                
                    console.log("outsdie funct", result.destination)
                    this.reorderStories(stories, result.source.index, result.destination.index);
                }}>
                    <Droppable key={column.is} droppableId={column.id.toString()}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getDraggingStyle(snapshot.isDraggingOver)}>
                        
                    
                        {stories.map((story, index) => (
                            
                            <div>
                            <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}>
                                    
                                    <div {...provided.dragHandleProps} style={{border: '2px solid ' + 'red'}} className="story-box">
                                    {/* <div > */}
                                        <p className='story-title'> {story.title} </p>
                                        <p style={{background: 'red'}} className='story-profile-photo'> icon </p>
                                        <p className='story-priority'> {(story.priority)} </p>
                                    {/* </div> */}
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
        
        // return returnList;
        
    }
}


    render() {
        return (
            <>

            <div className='d-flex flex-row overflow-y'>
                { this.displayColumns() }
            </div>
            </> 
        );
    }
}
export default TrackingDashboard;
