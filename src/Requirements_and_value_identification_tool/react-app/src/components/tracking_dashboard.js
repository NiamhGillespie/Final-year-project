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
        var story = this.state.non_completed_stories.filter(story => story.id === parseInt(story_id))[0]
        story.state = column_title.toString()
        await axios.put(API_URL_STORY_DETAILS + story_id + '/details', story)
    }

    async updateOldColumn(story_id, column_id) {
        var column = this.state.columns.filter(column => column.id === parseInt(column_id))[0]

        var ordered = column.story_list.split(",")
        var ordered_ids = [];
        for (var i = 0; i < ordered.length; i++) {
            ordered_ids.push(parseInt(ordered[i]))
        }

        if (ordered_ids != []) {
            const index = ordered_ids.indexOf(parseInt(story_id));
        
            if (index > -1) {
                ordered_ids.splice(index, 1);
            }
        } else {
            ordered_ids.push(parseInt(story_id))
        }
        column.stories = ordered_ids;
        column.story_list = ordered_ids.toString()
        
        await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
        return
        
    }

    async updateNewColumn(story_id, column_id, new_index) {  
        var column = this.state.columns.filter(column => column.id === parseInt(column_id))[0]

        var ordered_ids = [];
        if (column.stories.length >= 1) {
            var ordered = column.story_list.split(",")
            for (var i = 0; i < ordered.length; i++) {
                ordered_ids.push(parseInt(ordered[i]))
            }
            ordered_ids.splice(new_index, 0, parseInt(story_id));
        } else {
            ordered_ids.push(parseInt(story_id))
        }

        column.stories = ordered_ids;
        column.story_list = ordered_ids.toString()
        await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
        return column.title
    }
    
    async updateColumStoryOrder(column_id, story_id, new_index, old_index) {
        var column = this.state.columns.filter(column => column.id === parseInt(column_id))[0]

        if (column.stories.length >= 1) {
            var ordered = column.story_list.split(",")
            var ordered_ids = [];
            
            for (var i = 0; i < ordered.length; i++) {
                ordered_ids.push(parseInt(ordered[i]))
            
            }
            ordered_ids.splice(old_index, 1);
            ordered_ids.splice(new_index, 0, parseInt(story_id));
        } else {
            ordered_ids.push(parseInt(story_id))
        }

        column.stories = ordered_ids
        column.story_list = ordered_ids.toString();

        await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
    }
    async reorderStories(result_destination, story_id, old_column_id, old_index) {

        if (old_column_id !== result_destination.droppableId) {
             //need to remove story from current column
            await this.updateOldColumn(story_id, old_column_id)

            //add story to new column at order - is adding to new column
            var column_title = await this.updateNewColumn(story_id, result_destination.droppableId, result_destination.index)

            //need to update story to say what column it's in
            await this.updateStory(story_id, column_title)
            
        } else {
            await this.updateColumStoryOrder(old_column_id, story_id, result_destination.index, old_index)
        }
        this.getColumns();

    }
    
    displayColumns() {
        const getDraggingStyleColumn = isDraggingOver => ({
            background: isDraggingOver ? "#58c1d620" : "#d3d7dc20",
        });

        var return_list = [];
        const columns = this.state.columns;
        const non_completed_stories = this.state.non_completed_stories;

        if (columns !== undefined) {
            return_list.push(
                <DragDropContext onDragEnd={result => {
                    if (!result.destination) {
                      return;
                    }
                    
                    this.reorderStories(result.destination, result.draggableId, result.source.droppableId, result.source.index)
                }}>
    
                    {columns.map((column, index) => (
                        <Droppable key={column.id} droppableId={column.id.toString()}>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='d-flex' >

                                    <div className='column-container'  droppableId={column} style={getDraggingStyleColumn(snapshot.isDraggingOver)}> 
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
        
        return return_list;
    }

    displayStories(column) {      
        
        var ordered_ids = column.story_list.split(",");
        var stories = [];
        var story_colours = [];
        if (ordered_ids !== undefined && ordered_ids != [] && column.story_list.length > 0 && column.stories != [] && column.stories != undefined && this.state.epics !== undefined && this.state.epics.length !== 0) {
            for (var i = 0; i < ordered_ids.length; i++) {
                stories.push(this.state.non_completed_stories.filter(story => story.id == parseInt(ordered_ids[i]))[0])
                story_colours.push((this.state.epics.filter(epic => epic.epic_id === stories[i].epic_id)[0].epic_colour))
            }
            if (stories[0] != undefined) {
                return (
                    <div>
                        {stories.map((story, index) => (
                            <div>
                                <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop">
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}>
                                    
                                            <div {...provided.dragHandleProps} style={{border: '2px solid ' + '#' + story_colours[index]}} className="story-box">
                                                <p className='story-title'> {story.title} </p>
                                                <p style={{background: '#' + story_colours[index]}} className='story-profile-photo'> icon </p>
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

            <div className='d-flex flex-row flex-parent m-0'>
            <AddColumnModal resetState={this.resetState}/>
            </div>
        
            <div className='d-flex flex-row overflow-y mt-0'>
                { this.displayColumns() }
            </div>
            </> 
        );
    }
}
export default TrackingDashboard;
