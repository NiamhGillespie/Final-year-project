import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class TeamDetails extends Component {
    state = {
        team: this.props.team
    };

    //get teams from API function

    resetState() {
        //call getTeams funct
    }

    displayStats() {
        const percentage = 66;

        return (
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
        );
    }

    render() {
        return (
            <div>
                <h3 className="add-team-title"> View Team </h3>

                <div className="teams-details-box">
                    <div className="view-teams-section-one">
                        PHOTO Team Name - ID
                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/epics-dashboard">
                                <span>Epic Dashboard </span>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/tracking-dashboard">
                                <span>Tracking Dashboard </span>
                            </NavLink>
                        </NavItem>
                        
                        <NavItem>
                            <NavLink tag={Link} className="text-dark nav-item" to="/teamName/teamTags">
                                <span>Tag Dashboard </span>
                            </NavLink>
                        </NavItem>
                    </div>

                    <div className="view-teams-section-two">
                        <p> Team Members </p>
                    </div>
                    <div className="view-teams-section-three">{this.displayStats()}</div>
                </div>
            </div>
        );
    }
}

export default TeamDetails;
