import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/tag_dashboard.css';
import axios from 'axios';
import { API_URL, API_URL_TEAM_DETAILS, API_URL_USERS } from '../../constants';
import { DragDropContext, Droppable, Draggable } from '../../constants/drag_and_drop';
import StoryDetailsModal from '../story_forms/story_details_modal';
import EpicDetailsModal from '../epic_forms/epic_details_modal';
import AddStoryModal from '../story_forms/add_story_modal';
import AddEpicModal from '../epic_forms/add_epic_modal';
import { epicsAddedThisWeek, highPriorityStories, storiesAddedThisWeek } from '../helper-methods/stats_bar_methods';

export class EpicsDashboard extends Component {
    state = {
        epics: [],
        stories: [],
        colour: null,
        parent: null,
        current_stories: [],
        filter: 'uncomplete_only',
        users: []
        
    };

    async componentDidMount() {
        this.resetState();
    }

    async getEpics() {
        if (this.state.filter === 'all') {
            await axios.get(API_URL).then((response) => this.setState({ epics: response.data[0] }));
        }

        if (this.state.filter === 'uncomplete_only') {
            await axios.get(API_URL).then((response) => this.setState({ epics: response.data[0].filter((epic) => epic.completed === false) }));
        }

        if (this.state.filter === 'complete_only') {
            await axios.get(API_URL).then((response) => this.setState({ epics: response.data[0].filter((epic) => epic.completed === true) }));
        }
    }

    async getStories() {
        if (this.state.filter === 'all') {
            await axios.get(API_URL).then((response) => this.setState({ stories: response.data[1] }));
        }

        if (this.state.filter === 'uncomplete_only') {
            await axios.get(API_URL).then((response) => this.setState({ stories: response.data[1].filter((story) => story.completed === false) }));
        }

        if (this.state.filter === 'complete_only') {
            await axios.get(API_URL).then((response) => this.setState({ stories: response.data[1].filter((story) => story.completed === true) }));

            var stories_and_epics = await axios.get(API_URL);
            var epic_ids = stories_and_epics.data[1].filter((story) => story.completed === true).map((story) => story.epic_id);
            var other_epic_ids = stories_and_epics.data[0].filter((epic) => epic.completed === true).map((epic) => epic.epic_id);
            var all_epics = epic_ids.concat(other_epic_ids);

            await axios
                .get(API_URL)
                .then((response) => this.setState({ epics: response.data[0].filter((epic) => all_epics.includes(epic.epic_id)) }));
        }
    }


    async getUsers() {
        //UPDATE ME
        await axios
        .get(API_URL_USERS + '2/admin/users')
        .then((response) => this.setState({ users: response.data}));
    }

    resetState = () => {
        this.getEpics();
        this.getStories();
        this.getUsers();
    };

    changeFilter(filterName) {
        this.state.filter = filterName;
        this.resetState();
    }

    epics_drag_and_drop(epics) {
        if (epics.length !== 0) {
            return (
                <DragDropContext
                    onDragEnd={(result) => {
                        if (!result.destination) {
                            return;
                        }
                        this.reorderEpics(epics, result.source.index, result.destination.index);
                    }}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
                                {epics.map((epic, index) => (
                                    <Draggable key={epic.id} draggableId={epic.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                                <div
                                                    className="epic-container"
                                                    style={{ border: snapshot.draggingOver ? '3px solid #' + epic.epic_colour + '60' : '' }}
                                                    key={epic.id}>
                                                    <div {...provided.dragHandleProps}>
                                                        <EpicDetailsModal resetState={this.resetState} epic={epic} stories={this.state.stories} />
                                                    </div>

                                                    <div className="d-flex flex-column">
                                                        {this.displayStories(epic.id, epic.epic_colour)}

                                                        <div style={{ border: '2px dashed #' + epic.epic_colour }} className="add-story-box">
                                                            <AddStoryModal
                                                                resetState={this.resetState}
                                                                epic_id={epic.epic_id}
                                                                epic_colour={epic.epic_colour}
                                                            />
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

    story_drag_and_drop(stories, epic_colour) {
        const getDraggingStyle = (isDraggingOver) => ({
            background: isDraggingOver ? '#' + epic_colour + '20' : '',
            padding: 5,
            paddingBottom: 10,
            marginBottom: 2,
            borderRadius: 10
        });

        if (stories.length !== 0) {
            return (
                <DragDropContext
                    onDragEnd={(result) => {
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
                                        <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop">
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}>
                                                    <div {...provided.dragHandleProps}>
                                                        <StoryDetailsModal
                                                            resetState={this.resetState}
                                                            story={story}
                                                            users={this.state.users}
                                                            epic_colour={story.completed ? 'c7c7c7' : epic_colour}
                                                        />
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

    reorderEpics(epics, startIndex, endIndex) {
        const [removed] = epics.splice(startIndex, 1);
        epics.splice(endIndex, 0, removed);

        for (var i = 0; i < epics.length; i++) {
            epics[i].order = i + 1;

            axios.put('http://localhost:8000/api/teamName/epics/' + epics[i].epic_id + '/details', epics[i]);
        }

        this.setState({ epics: epics });
    }

    reorderStories(stories, startIndex, endIndex) {
        const [removed] = stories.splice(startIndex, 1);
        stories.splice(endIndex, 0, removed);

        for (var i = 0; i < stories.length; i++) {
            stories[i].order = i + 1;

            axios.put('http://localhost:8000/api/teamName/stories/' + stories[i].story_id + '/details', stories[i]);
        }

        this.getStories();
    }

    displayStories(epic_id, epic_colour) {
        var stories = this.state.stories;
        var matching_list = [];
        var return_list = [];

        if (stories.length >= 1) {
            for (var i = 0; i < stories.length; i++) {
                if (stories[i].epic_id === String(epic_id)) {
                    matching_list.push(stories[i]);
                }
            }

            return_list.push(<div>{this.story_drag_and_drop(matching_list, epic_colour)}</div>);
        }
        return return_list;
    }

    displayStatsBar() {
        var returnList = [];
        returnList.push(epicsAddedThisWeek(this.state.epics), storiesAddedThisWeek(this.state.stories), highPriorityStories(this.state.stories));
        return returnList;
    }

    render() {
        return (
            <>
                <div key="epic-dashboard">
                    <div className="border-bottom d-flex flex-row flex-nowrap">
                        <p className="text-center"> {this.displayStatsBar()} </p>
                        <AddEpicModal create={true} resetState={this.resetState} className="align-self-stretch" />
                    </div>

                    <div className="mt-1">
                        <p
                            onClick={() => this.changeFilter('all')}
                            className={this.state.filter === 'all' ? 'active-choice-button' : 'inactive-choice-button'}
                            style={{ borderRight: '2px solid white' }}>
                            Display all
                        </p>
                        <p
                            onClick={() => this.changeFilter('uncomplete_only')}
                            className={this.state.filter === 'uncomplete_only' ? 'active-choice-button' : 'inactive-choice-button'}
                            style={{ borderRight: '2px solid white' }}>
                            Display uncomplete only
                        </p>
                        <p
                            onClick={() => this.changeFilter('complete_only')}
                            className={this.state.filter === 'complete_only' ? 'active-choice-button' : 'inactive-choice-button'}
                            style={{ borderRight: '2px solid white' }}>
                            Display complete only
                        </p>

                        <p onClick={() => this.changeFilter('complete_only')} className="float-end inactive-choice-button">
                            Search bar?
                        </p>
                    </div>

                    <div>
                        <div className="d-flex flex-row w-30 h-100 overflow-y">{this.epics_drag_and_drop(this.state.epics)}</div>
                    </div>
                </div>
            </>
        );
    }
}
export default EpicsDashboard;
