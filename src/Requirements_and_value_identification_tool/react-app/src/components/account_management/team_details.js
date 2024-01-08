import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

export class TeamDetails extends Component {
    state = {
        team: this.props.team

        //get team info from provided id :)
    };

    //get teams from API function

    resetState() {
        //call getTeams funct
    }

    displayStats() {
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
    }

    displayTeamMembers() {
        const team_members = [1,2,3, 4, 5, 6] //this.state.team_members;
        var returnList = []

        for (var i = 0; i < team_members.length; i++) {
            returnList.push(
                <div className='small-team-member-card'>
                    <p className='small-team-member-photo'/>
                    <p className='small-team-member-info'> Username {team_members[i]} - id</p>
                </div>
            )
        }
        return returnList
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Team </h3>

                <div className="teams-details-box">
                    <div className="team-details-section-one">
                        <div className="large-circular-photo"> </div>
                        <p className="team-name-title"> Team Name - ID </p>
                        <p className="team-subtitle"> team leader #1, team leader #2 ...</p>

                        <div className="link-area">
                            <p>
                                <u> Team Dashboards</u>
                            </p>
                            <li style={{ color: '#58c1d6' }}>
                                <Link to="/teamName/epics-dashboard" className="team-link">
                                    Epic Dashboard
                                </Link>
                            </li>

                            <li style={{ color: '#58c1d6' }}>
                                <Link to="/teamName/tracking-dashboard" className="team-link">
                                    Tracking Dashboard
                                </Link>
                            </li>

                            <li style={{ color: '#58c1d6' }}>
                                <Link to="/teamName/tag-dashboard" className="team-link">
                                    Tag Dashboard
                                </Link>
                            </li>
                        </div>
                    </div>

                    <div className="team-details-section-two">
                        <p className='team-members-heading'> Team Members </p>
                        {this.displayTeamMembers()}
                    </div>

                    <div className="team-details-section-three">{this.displayStats()}</div>
                </div>
            </div>
        );
    }
}

export default TeamDetails;
