import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/tracking_dashboard.css';
import axios from 'axios';
import { API_URL_USERS, API_URL_SHORT } from '../../constants';
import { DragDropContext, Droppable, Draggable } from '../../constants/drag_and_drop';
import EditColumnModal from '../tracking_column_forms/edit_tracking_column_modal';
import AddColumnModal from '../tracking_column_forms/add_tracking_column_modal';
import { updateColumStoryOrder, updateNewColumn, updateOldColumn, updateStory } from '../helper-methods/column_update_methods';
import { storiesEdited24Hours, storiesEdited48Hours, storiesEdited72Hours } from '../helper-methods/time_filter_methods';
import StoryDetailsModal from '../story_forms/story_details_modal';
import NavigationBar from '../navigation_bar';

export class TrackingDashboard extends Component {
    state = {
        boards: [],
        columns: [],
        non_completed_stories: [],
        epics: [],
        sprint: {},
        filter: 'all',

        users: this.getUsers(),
        team: this.getTeam()
    };

    getTeam() {
        if (this.props.current_team) {
            //this.state.team = this.props.current_team
            this.setState({ team: this.props.current_team });
            return this.props.current_team;
        } else {
            //this.state.team = this.props.team[0]
            this.setState({ team: this.props.team[0] });
            return this.props.team[0];
        }
    }

    async componentDidMount() {
        await this.getTeam();
        this.getUsers();
        this.resetState();
    }

    componentDidCatch(error, errorInfo) {
        console.log("error has occured", error, errorInfo);
    }

    async getUsers() {
        //UPDATE ME
        await axios.get(API_URL_USERS + this.props.user.belongs_to + '/admin/users').then((response) => this.setState({ users: response.data }));
    }

    async getColumns() {
        await axios.get(API_URL_SHORT + this.state.team.id + '/tracking-columns').then((response) => this.setState({ columns: response.data }));
    }

    async getNonCompletedStories() {
        if (this.state.filter === 'all') {
            await axios
                .get(API_URL_SHORT + this.state.team.id + '/epicsDashboard')
                .then((response) => this.setState({ non_completed_stories: response.data[1] }));
        }

        if (this.state.filter === '24_hours') {
            await axios
                .get(API_URL_SHORT + this.state.team.id + '/epicsDashboard')
                .then((response) => (this.state.non_completed_stories = storiesEdited24Hours(response.data[1])));
        }

        if (this.state.filter === '48_hours') {
            await axios
                .get(API_URL_SHORT + this.state.team.id + '/epicsDashboard')
                .then((response) => (this.state.non_completed_stories = storiesEdited48Hours(response.data[1])));
        }

        if (this.state.filter === '72_hours') {
            await axios
                .get(API_URL_SHORT + this.state.team.id + '/epicsDashboard')
                .then((response) => (this.state.non_completed_stories = storiesEdited72Hours(response.data[1])));
        }
    }

    async getEpics() {
        await axios.get(API_URL_SHORT + this.state.team.id + '/epicsDashboard').then((response) => this.setState({ epics: response.data[0] }));
    }

    resetState = () => {
        this.getNonCompletedStories();
        this.getEpics();
        this.getColumns();
        this.getUsers();
        this.displayColumns();
    };

    changeFilter(filterName) {
        this.state.filter = filterName;
        this.resetState();
    }

    async reorderStories(result_destination, story_id, old_column_id, old_index) {
        if (old_column_id !== result_destination.droppableId) {
            //need to remove story from current column
            await updateOldColumn(story_id, old_column_id, this.state.columns);

            //add story to new column at order - is adding to new column
            var column = await updateNewColumn(story_id, result_destination.droppableId, result_destination.index, this.state.columns);

            //need to update story to say what column it's in
            await updateStory(story_id, column, this.state.non_completed_stories);
        } else {
            await updateColumStoryOrder(old_column_id, story_id, result_destination.index, old_index, this.state.columns);
        }
        this.getColumns();
    }

    getTeams(teams) {
        var returnList = [];
        for (var i = 0; i < teams.length; i++) {
            returnList.push(
                <>
                    <option value={teams[i].id}>
                        <div>{teams[i].team_name}</div>
                    </option>
                </>
            );
        }

        return returnList;
    }

    changeChosenTeam = (e) => {
        for (var i = 0; i < this.props.teams.length; i++) {
            if (parseInt(e.target.value) === this.props.teams[i].id) {
                this.state.team = this.props.teams[i];
                this.setState({ team: this.props.teams[i] })
                this.getEpics()
            }
        }
        this.resetState();
    };

    displayColumns() {
        const getDraggingStyleColumn = (isDraggingOver, WIP, col_stories) => ({
            background: isDraggingOver ? '#58c1d620' : '#d3d7dc20',
            boxShadow:
                col_stories.length > WIP && WIP > 0
                    ? 'inset 0 0 0em 0em #e3322960, 0 0 0.4em 1px #e3322960'
                    : 'inset 0 0 0em 0em #58c1d6, 0 0 0.4em 1px #58c1d680'
        });

        const WIPStyling = (WIP, col_stories) => ({
            border: col_stories.length > WIP && WIP > 0 ? '2px solid #e3322960' : '2px solid #58c1d680'
        });

        var return_list = [];
        const columns = this.state.columns;
        const non_completed_stories = this.state.non_completed_stories;

        if (columns !== undefined) {
            return_list.push(
                <DragDropContext
                    onDragEnd={(result) => {
                        if (!result.destination) {
                            return;
                        }

                        this.reorderStories(result.destination, result.draggableId, result.source.droppableId, result.source.index);
                    }}>
                    {columns.map((column, index) => (
                        <Droppable key={column.id} droppableId={column.id.toString()}>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="d-flex">
                                    <div
                                        className="column-container"
                                        droppableId={column}
                                        style={getDraggingStyleColumn(snapshot.isDraggingOver, column.WIP, column.stories)}>
                                        <EditColumnModal
                                            className="pb-0 mb-1"
                                            resetState={this.resetState}
                                            column={column}
                                            non_completed_stories={non_completed_stories}
                                            team={this.state.team}
                                        />
                                        {column.WIP !== 0 ? (
                                            <p className="wip-limit mt-0 mb-2 d-block" style={WIPStyling(column.WIP, column.stories)}>
                                                WIP: {column.WIP}
                                            </p>
                                        ) : (
                                            <p className="no-wip-limit mt-0 mb-2 d-block"> </p>
                                        )}
                                        <hr className="pt-0 mt-2 d-block w-100"></hr>

                                        {this.displayStories(column)}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            );
        }

        return return_list;
    }

    filterIds(orderIds) {
        var filteredIds = [];
        var idList = orderIds.split(',');
        for (var i = 0; i < idList.length; i++) {
            for (var j = 0; j < this.state.non_completed_stories.length; j++) {
                if (parseInt(idList[i]) === this.state.non_completed_stories[j].id) {
                    filteredIds.push(idList[i]);
                }
            }
        }

        return filteredIds;
    }

    displayStories(column) {
        var ordered_ids = this.filterIds(column.story_list);
        var stories = [];
        var story_colours = [];
        if (
            ordered_ids !== undefined &&
            ordered_ids.length !== 0 &&
            column.story_list.length > 0 &&
            column.stories.length !== 0 &&
            column.stories !== undefined &&
            this.state.epics !== undefined &&
            this.state.epics.length !== 0
        ) {
            for (var i = 0; i < ordered_ids.length; i++) {
                // eslint-disable-next-line no-loop-func
                stories.push(this.state.non_completed_stories.filter((story) => story.id === parseInt(ordered_ids[i]))[0]);
                // eslint-disable-next-line no-loop-func
                story_colours.push(this.state.epics.filter((epic) => epic.epic_id === stories[i].epic_id)[0].epic_colour);
            }
            if (stories[0] !== undefined) {
                return (
                    <div>
                        {stories.map((story, index) => (
                            <div>
                                <Draggable key={story.id} draggableId={story.id.toString()} index={index} className="story-drag-and-drop">
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div {...provided.dragHandleProps}>
                                                {/* <p className="story-title"> {story.title} </p>
                                                {this.displayUserImages(story)}
                                                <p className="story-priority"> {displayPriority(story.priority)} </p> */}

                                                <StoryDetailsModal
                                                    resetState={this.resetState}
                                                    story={story}
                                                    completed = {story.completed ? true : false}
                                                    users={this.state.users}
                                                    epic_colour={story.completed ? 'c7c7c7' : story_colours[index]}
                                                    team={this.state.team}
                                                />
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

    // displaySprintSettings() {
    //     if (this.state.sprint !== undefined) {
    //         return <EditSprintModal resetState={this.resetState} sprint={this.state.sprint} />;
    //     }

    //     return <TrackingSettingsModal resetState={this.resetState} />;
    // }

    render() {
        return (
            <>
                <div className="d-flex mt-0 pt-0 ">
                    <div className="team-choice choice-section w-50 mt-0 pt-0 mb-2">
                        {this.state.team.team_photo === null ? (
                            <img src="http://localhost:8000/media/profile_images/default.jpg" alt="user profile" className="nav-photo-left" />
                        ) : (
                            <img src={'http://localhost:8000/' + this.state.team.team_photo} alt="hey" className="nav-photo-left" />
                        )}
                        <select name="team" onChange={this.changeChosenTeam} className="ms-2 team-choice" value={this.state.team.id}>
                            {this.getTeams(this.props.teams)}
                        </select>
                         - Tracking Dashboard
                    </div>
                    <AddColumnModal resetState={this.resetState} team={this.state.team} className="d-inline w-25 bg-primary float-end" />
                </div>

                <hr className='mt-0 mb-2 pt-0 pb-2'/>

                <div className="ms-4 mt-2">
                    <p
                        onClick={() => this.changeFilter('all')}
                        className={this.state.filter === 'all' ? 'active-choice-button' : 'inactive-choice-button'}
                        style={{ borderRight: '2px solid white' }}>
                        All
                    </p>

                    <p
                        onClick={() => this.changeFilter('24_hours')}
                        className={this.state.filter === '24_hours' ? 'active-choice-button' : 'inactive-choice-button'}
                        style={{ borderRight: '2px solid white', marginLeft: '1vh' }}>
                        24
                    </p>

                    <p
                        onClick={() => this.changeFilter('48_hours')}
                        className={this.state.filter === '48_hours' ? 'active-choice-button' : 'inactive-choice-button'}
                        style={{ borderRight: '2px solid white', marginLeft: '1vh' }}>
                        48
                    </p>

                    <p
                        onClick={() => this.changeFilter('72_hours')}
                        className={this.state.filter === '72_hours' ? 'active-choice-button' : 'inactive-choice-button'}
                        style={{ borderRight: '2px solid white', marginLeft: '1vh' }}>
                        72
                    </p>
                </div>

                <div className="d-flex flex-row overflow-y mt-0">{this.displayColumns()}</div>
            </>
        );
    }
}
export default TrackingDashboard;
