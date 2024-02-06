import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation } from 'react-router-dom';
import DisplayTeamUsers from '../helper_components/displayTeamUsers';
import { API_URL_USERS, SHORT_URL } from '../../constants';
import axios from 'axios';

export class TeamDashboard extends Component {
    state = {
        team: this.props.current_team
    };

    async getUsers() {
        //UPDATE ME
        await axios.get(API_URL_USERS + this.props.user.belongs_to + '/admin/users').then((response) => this.setState({ users: response.data }));
    }

    resetState = () => {
        this.getUsers();
    };

    displayStats = () => {
        const percentage = 66;

        return (
            <div>
                <p className="pt-2 ps-2 pb-0 mb-0">
                    <u> Team Statistics</u>
                </p>
                <div className="d-flex flex-row flex-nowrap pt-4 pl-5">
                    <div className="progress-tracker left-margin">
                        <div style={{ width: '20vh', height: '20vh' }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                style={{ width: 20, height: 20 }}
                                background={true}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathColor: '#58c1d6',
                                    textColor: '#58c1d6',
                                    trailColor: '#58c1d620',
                                    backgroundColor: '#ffffff'
                                })}
                            />
                        </div>
                    </div>

                    <div className="progress-tracker">
                        <div style={{ width: '20vh', height: '20vh' }}>
                            <CircularProgressbar
                                className="progress-tracker"
                                value={12}
                                text={`${12}%`}
                                style={{ width: 20, height: 20 }}
                                background={true}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathColor: '#1ab81a',
                                    textColor: '#1ab81a',
                                    trailColor: '#1ab81a20',
                                    backgroundColor: '#ffffff'
                                })}
                            />
                        </div>
                    </div>

                    <div className="progress-tracker">
                        <div style={{ width: '20vh', height: '20vh' }}>
                            <CircularProgressbar
                                className="progress-tracker"
                                value={76}
                                text={`${76}%`}
                                style={{ width: 20, height: 20 }}
                                background={true}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathColor: '#873acf',
                                    textColor: '#873acf',
                                    trailColor: '#873acf20',
                                    backgroundColor: '#ffffff'
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
        this.resetState();
    };

    render() {
        return (
            <>
                <h3 className="add-team-title"> Team Profile </h3>
                <div className="teams-details-box">
                    
                    <div className="team-details-section-one">
                        {this.state.team.team_photo === null ? (
                            <img src={SHORT_URL + "media/profile_images/default.jpg"} alt="user profile" className="large-circular-photo" />
                        ) : (
                            <img src={this.state.team.team_photo} alt="hey" className="large-circular-photo" />
                        )}

                        <select name="team" onChange={this.changeChosenTeam} className="ms-2 team-choice-team-dashboard team-name-title" value={this.state.team.id}>
                            {this.getTeams(this.props.teams)}
                        </select>

                        <p className="team-subtitle"> </p>

                        <div className="link-area">
                            <p>
                                <u> Team Dashboards</u>
                            </p>
                            <li style={{ color: '#58c1d6' }}>
                                <Link
                                    to="/teamName/epics-dashboard"
                                    className="team-link"
                                    state={{ teams: this.props.teams, user: this.props.user, current_team: this.state.team }}>
                                    Epic Dashboard
                                </Link>
                            </li>

                            <li style={{ color: '#58c1d6' }}>
                                <Link
                                    to="/teamName/tracking-dashboard"
                                    className="team-link"
                                    state={{ teams: this.props.teams, user: this.props.user, current_team: this.state.team }}>
                                    Tracking Dashboard
                                </Link>
                            </li>

                            <li style={{ color: '#58c1d6' }}>
                                <Link
                                    to="/teamName/tag-dashboard"
                                    className="team-link"
                                    state={{ teams: this.props.teams, user: this.props.user, current_team: this.state.team }}>
                                    Tag Dashboard
                                </Link>
                            </li>
                        </div>
                    </div>

                    <div className="team-details-section-two">
                        <p className="team-members-heading"> Team Members </p>
                        <DisplayTeamUsers
                            team_leads={this.state.team.team_leads}
                            team_members={this.state.team.team_members}
                            belongs_to={this.state.team.belongs_to}
                            links={false}
                            user={this.props.user}
                        />
                    </div>

                    <div className="team-details-section-three">{this.displayStats()}</div>
                </div>
            </>
        );
    }
}
export default TeamDashboard;
