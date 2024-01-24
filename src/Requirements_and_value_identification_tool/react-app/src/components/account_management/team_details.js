import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL_USERS } from '../../constants';
import DisplayTeamUsers from '../helper_components/displayTeamUsers';

export function TeamDetails() {
    const location = useLocation();
    var team_details = location.state;

    if (team_details === null) {
        team_details = { id: 6, belongs_to: 2, team_name: 'Default Team', team_leads: [], team_members: [], teams: [7], role: 'default' };
    } else {
        team_details = team_details.team;
    }

    const displayStats = () => {
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

    return (
        <div>
            <h3 className="add-team-title"> View Team </h3>

            <div className="teams-details-box">
                <div className="team-details-section-one">
                    {team_details.team_photo === null ? (
                        <img src="http://localhost:8000/media/profile_images/default.jpg" alt="user profile" className="large-circular-photo" />
                    ) : (
                        <img src={team_details.team_photo} alt="hey" className="large-circular-photo" />
                    )}

                    <p className="team-name-title">{team_details.team_name}</p>
                    <p className="team-subtitle"> </p>

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
                    <p className="team-members-heading"> Team Members </p>
                    <DisplayTeamUsers
                        team_leads={team_details.team_leads}
                        team_members={team_details.team_members}
                        belongs_to={team_details.belongs_to}
                        links={true}
                    />
                </div>

                <div className="team-details-section-three">{displayStats()}</div>
            </div>
        </div>
    );
}

export default TeamDetails;
