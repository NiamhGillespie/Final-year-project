import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/sign_up.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL_USERS } from '../../constants';

export function TeamDetails() {
    const location = useLocation();
    var team_details = location.state;
    var users = location.state;

    if (team_details === null) {
        team_details = { id: 6, belongs_to: 2, team_name: 'Default Team', team_leads: [], team_members: [], teams: [7], role: 'default' };
        users = [];
    } else {
        team_details = team_details.team;
        users = location.state.users;
    }

    function getTeamMembers(users) {
        const team_leads = [];
        const team_members = [];

        for (var i = 0; i < users.length; i++) {
            if (team_details.team_leads.includes(users[i].id)) {
                team_leads.push(users[i]);
            }

            if (team_details.team_members.includes(users[i].id)) {
                team_members.push(users[i]);
            }
        }

        return [team_leads, team_members];
    }

    var team = getTeamMembers(users);
    var team_leads = team[0];
    var team_members = team[1];

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

    const displayTeamMembers = () => {
        var returnList = [];

        for (var i = 0; i < team_members.length; i++) {
            returnList.push(
                <div className="small-team-member-card">
                    <img src={team_members[i].profile_photo} alt="user profile" className="small-team-member-photo" />
                    <p className="small-team-member-info">
                        {' '}
                        {team_members[i].first_name} {team_members[i].surname} - {team_members[i].username}
                    </p>
                </div>
            );
        }
        return returnList;
    };

    const displayTeamLeads = () => {
        var returnList = [];

        for (var i = 0; i < team_leads.length; i++) {
            returnList.push(
                <div>
                    <img src={team_leads[i].profile_photo} alt="user profile" className="small-team-member-photo" />
                    <p className="small-team-member-info">
                        {' '}
                        {team_leads[i].first_name} {team_leads[i].surname} - {team_leads[i].username}
                    </p>
                </div>
            );
        }
        return returnList;
    };

    return (
        <div>
            <h3 className="add-team-title"> View Team </h3>

            <div className="teams-details-box">
                <div className="team-details-section-one">
                    <img src={team_details.team_photo} alt="user profile" className="large-circular-photo" />
                
                    <p className="team-name-title">
                        {team_details.team_name}
                    </p>
                    <p className="team-subtitle"> {displayTeamLeads()}</p>

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
                    {displayTeamMembers()}
                </div>

                <div className="team-details-section-three">{displayStats()}</div>
            </div>
        </div>
    );
}

export default TeamDetails;
