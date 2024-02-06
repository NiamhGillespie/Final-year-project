import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/tag_dashboard.css';
import axios from 'axios';
import { API_URL_TAGS, API_URL_STORIES, API_URL_SHORT, SHORT_URL } from '../../constants';
import DeleteTagModal from '../tag_forms/delete_tag_modal';
import EditTagModal from '../tag_forms/edit_tag_modal';
import AddTagModal from '../tag_forms/add_tag_modal';
import AddValueModal from '../value_forms/add_value_modal';
import DeleteValueModal from '../value_forms/delete_value_modal';
import EditValueModal from '../value_forms/edit_value_modal';

export class TagDashboard extends Component {
    state = {
        tags: [],
        values: [],
        tagsDisplayed: true,
        team: this.getTeam()
    };

    getTeam() {
        console.log("PROPS ARE", this.props)
        if (this.props.current_team) {
            console.log("current team", this.props.current_team)
            //this.state.team = this.props.current_team
            this.setState({ team: this.props.current_team })
            return this.props.current_team
        } else {
            //this.state.team = this.props.team[0]
            this.setState({ team: this.props.team[0] })
            return this.props.team[0]
        }
    }

    async componentDidMount() {
        await this.getTeam()
        this.resetState();
    }

    async getTags() {
        await axios.get(API_URL_SHORT + this.state.team.id + '/tags').then((response) => this.setState({ tags: response.data }));
    }

    async getValues() {
        await axios.get(API_URL_SHORT + this.state.team.id + '/values').then((response) => this.setState({ values: response.data }));
    }

    resetState = () => {
        this.getTags();
        this.getValues();
    };

    switchToTags = () => {
        this.setState({ tagsDisplayed: true });
    };

    switchToValues = () => {
        this.setState({ tagsDisplayed: false });
    };

    renderChoice() {
        if (this.state.tagsDisplayed) {
            return this.displayTags();
        } else {
            return this.displayValues();
        }
    }

    displayTags() {
        var tags = this.state.tags;
        var returnList = [];

        for (var i = 0; i < tags.length; i++) {
            returnList.push(
                <div className="tag-list" style={{ border: '2px solid #' + tags[i].colour }}>
                    <DeleteTagModal resetState={this.resetState} tag={tags[i]} />
                    <EditTagModal resetState={this.resetState} tag={tags[i]} belongs_to={this.state.team.id} />
                    <p className="tag-description"> {tags[i].description} </p>
                </div>
            );
        }

        if (tags.length === 0 ) {
            returnList.push(<div className='tag-list list-center'> Used to catagorise a story, e.g Bug or Testing</div>)
        }

        return returnList;
    }

    getAddButton() {
        if (this.state.tagsDisplayed) {
            return <AddTagModal resetState={this.resetState} belongs_to={this.state.team.id} />;
        } else {
            return <AddValueModal resetState={this.resetState} belongs_to={this.state.team.id} />;
        }
    }

    displayValues() {
        var values = this.state.values;
        var returnList = [];

        for (var i = 0; i < values.length; i++) {
            returnList.push(
                <div className="tag-list" style={{ border: '2px solid #' + values[i].colour }}>
                    <DeleteValueModal resetState={this.resetState} value={values[i]} />
                    <EditValueModal resetState={this.resetState} value={values[i]} belongs_to={this.state.team.id} />
                    <p className="tag-description"> {values[i].description} </p>
                </div>
            );
        }

        if (values.length === 0 ) {
            returnList.push(<div className='tag-list list-center'> Used to identify what values belong to a particular story or epic </div>)
        }

        return returnList;
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
            }
        }
        this.resetState()
    };

    render() {
        return (
            <>
                {this.state.team.team_photo === null ? (
                    <img src={SHORT_URL + "media/profile_images/default.jpg"} alt="user profile" className="nav-photo" />
                ) : (
                    <img src={SHORT_URL + this.state.team.team_photo} alt="hey" className="nav-photo" />
                )}
                <select name="team" onChange={this.changeChosenTeam} className="ms-2 team-choice" value={this.state.team.id}>
                    {this.getTeams(this.props.teams)}
                </select>

                <div className="centered" div key="tag-dashboard">
                    <div className="choice-section">
                        <button
                            className={this.state.tagsDisplayed ? 'active-choice-button' : 'inactive-choice-button'}
                            style={{ borderRight: '2px solid white' }}
                            onClick={this.switchToTags}>
                            Tags
                        </button>

                        <button
                            className={this.state.tagsDisplayed ? 'inactive-choice-button' : 'active-choice-button'}
                            onClick={this.switchToValues}>
                            Values
                        </button>

                        {this.getAddButton()}
                    </div>

                    <div className="display-box">{this.renderChoice()}</div>
                </div>
            </>
        );
    }
}
//ReactDOM.render(<TagDashboard />, document.getElementById("root"));
export default TagDashboard;
