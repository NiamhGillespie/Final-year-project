import React, { Component } from 'react';
import '../css/basic.css';
import axios from "axios";
import { API_URL_DASHBOARD_TRACKING_COLUMNS, API_URL, API_URL_STORY_DETAILS, API_URL_TRACKING_COLUMN_DETAILS } from "../constants";
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
        this.resetState();
    }
    
    async getColumns() {
        await axios.get(API_URL_DASHBOARD_TRACKING_COLUMNS).then(response => this.setState({ columns: response.data }));
    };

    async getNonCompletedStories() {
        await axios.get(API_URL).then(response => this.setState({ non_completed_stories: response.data[1].filter(story => story.state != 'complete') }));
    }

    async getEpics() {
        await axios.get(API_URL).then(response => this.setState({ epics: response.data[0]}));
    }
   
    resetState= () => {
        this.getColumns();
        this.getNonCompletedStories();
        this.getEpics();
        
    };

    async updateStory(story_id, column_title) {
       // var story = 
        var story = this.state.non_completed_stories.filter(story => story.id === parseInt(story_id))[0]
        story.state = column_title.toString()
        await axios.put(API_URL_STORY_DETAILS + story_id + '/details', story)
    }

    async updateOldColumn(story_id, column_id) {
        var column = this.state.columns.filter(column => column.id === parseInt(column_id))[0]

        var stories = column.stories
        const index = stories.indexOf(parseInt(story_id));
        
        if (index > -1) {
            stories.splice(index, 1);
        }
        
        column.stories = stories;
        
        await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
        return
        
    }

    async updateNewColumn(story_id, column_id) {
        var column = this.state.columns.filter(column => column.id === parseInt(column_id))[0]
        column.stories.push(parseInt(story_id));

        await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
        return column.title
    }
    
    async reorderStories(result_destination, story_id, old_column_id) {
        console.log(result_destination, story_id)
        //need to remove story from current column

        if (old_column_id !== result_destination.droppableId) {
            this.updateOldColumn(story_id, old_column_id)

            //add story to new column at order
            var column_title = await this.updateNewColumn(story_id, result_destination.droppableId)

            //need to update story to say what column it's in
            this.updateStory(story_id, column_title)
            
        }
        this.resetState()

    }
    
    delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
    
    displayColumns() {
        var return_list = [];
        const columns = this.state.columns;
        const non_completed_stories = this.state.non_completed_stories;

        if (columns !== undefined) {
            return_list.push(
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                      return;
                    }
                    
                    this.reorderStories(result.destination, result.draggableId, result.source.droppableId)
                }}>
    
                    {columns.map((column, index) => (
                        <Droppable key={column.id} droppableId={column.id.toString()}>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='d-flex'>

                                    <div className='column-container'  droppableId={column}> 
                                        <EditColumnModal className='pb-0 mb-0' resetState={this.resetState} column={column} non_completed_stories={non_completed_stories}/>
                                        
                                        <hr className='pt-0 mt-0'></hr>

                                        {this.displayStories(column)}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    )

                )}
                </DragDropContext>
            )
        }
        
        return_list.push(
            <AddColumnModal resetState={this.resetState}/>
        )

        return return_list;
    }

    displayStories(column) {      
        const getDraggingStyle = isDraggingOver => ({
            background: isDraggingOver ? "#"  + "20" : "",
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 10,
        });

        var story_ids = column.stories
        var stories = [];
        if (story_ids != undefined && story_ids != []) {
            for (var i = 0; i < story_ids.length; i++) {
                stories.push(this.state.non_completed_stories.filter(story => story.id == story_ids[i])[0])
            }
            if (stories[0] != undefined) {
                
                return (
                    <div>
                        {stories.map((story, index) => (
                            <div>
                                <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop">
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}>
                                    
                                            <div {...provided.dragHandleProps} style={{border: '2px solid ' + 'red'}} className="story-box">
                                                <p className='story-title'> {story.title} </p>
                                                <p style={{background: 'red'}} className='story-profile-photo'> icon </p>
                                                <p className='story-priority'> {(story.priority)} </p>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                            
                        ))}
                    </div>    
                );
            }    
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
