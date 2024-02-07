import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/home.css';
import { Link } from 'react-router-dom';

export class HelpDashboard extends Component {
    state = {
        collapsible_one: false,
        collapsible_two: false,
        collapsible_three: false,
        collapsible_four: false
    };

    updateCollapsible = (e) => {
        if (this.state[e.target.name] === false) {
            this.setState({ [e.target.name]: true });
        } else {
            this.setState({ [e.target.name]: false });
        }
    };

    render() {
        const getCollapsed = (collapsed) => ({
            display: collapsed ? 'block' : 'none'
        });
        return (
            <>
                <div classname="home-body">
                    <div className="help-banner">
                        <p className="home-welcome"> 🛠️ RViT Help 🛠️</p>
                    </div>

                    <button
                        type="button"
                        class="collapsible"
                        name="collapsible_one"
                        onClick={this.updateCollapsible}
                        value={this.state.collapsible_one}>
                        What is Rvit?
                        <p className="float-end collapsible-symbol"> {this.state.collapsible_one ? <> - </> : <> + </>} </p>
                    </button>
                    <div class="home-blurb" style={getCollapsed(this.state.collapsible_one)}>
                        <p>
                            RViT is a requirements and value identification tool for prioritisation developed by Niamh Gillespie for her final year
                            dissertation.
                        </p>
                        <p>
                            RViT draws on key agile methodologies and concepts to provide an easy-to-use project management tool. RViT also uses value
                            statements which can be linked to epics or stories to allow team members and stakeholders to understand the values that an
                            epic or story will add to a project.
                        </p>

                        <p>Some example values include: 'Customer Satisfaction', 'Cost Reduction' and 'Automation'</p>
                    </div>

                    <button
                        type="button"
                        class="collapsible"
                        name="collapsible_two"
                        onClick={this.updateCollapsible}
                        value={this.state.collapsible_two}>
                        How to use RViT - Admin
                        <p className="float-end collapsible-symbol"> {this.state.collapsible_two ? <> - </> : <> + </>} </p>
                    </button>
                    <div class="home-blurb" style={getCollapsed(this.state.collapsible_two)}>
                        <p>
                            When you{' '}
                            <Link to="/sign-up" className="white-text">
                                set up an organisation
                            </Link>{' '}
                            with RViT, you will have to create an admin account in the process.
                        </p>

                        <p>
                            When logged into an admin account you can add teams and users as well as view, edit, and delete these different profiles.
                        </p>

                        <p>
                            A variety of user types exist; admins, team leads, team members and stakeholders. Only team leads, team members and
                            stakeholders can view their relevant team's dashboards. For more information on the permissions of each of these user
                            types please see the other help sections.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="collapsible"
                        name="collapsible_three"
                        onClick={this.updateCollapsible}
                        value={this.state.collapsible_three}>
                        How to use RViT - Team Leads and Team Members
                        <p className="float-end collapsible-symbol"> {this.state.collapsible_three ? <> - </> : <> + </>} </p>
                    </button>
                    <div class="home-blurb" style={getCollapsed(this.state.collapsible_three)}>
                        <p>
                            Both team leads and team members have access to a number of different dashboards designed to incorporate different areas
                            of the agile process. As both team leads and team members can be part of multiple teams, each dashboard can be toggled
                            between the set of teams that a user belongs to.
                        </p>

                        <p className="text-decoration-underline mb-0 pb-0"> Tag dashboard </p>
                        <p className="mt-0 mb-0">
                            The tag dashboard allows users to add and edit tags and values. Tags typically will be used to classify the skills an user
                            story will need and are only available to be used on stories. Whereas values are used to identify the value that either an
                            epic or story will bring to a project.
                        </p>
                        <p className="mt-1">Both tags and values have an optional description field and are fully colour customisable.</p>

                        <p className="text-decoration-underline mb-0 pb-0"> Team dashboard </p>
                        <p className="mt-0 mb-0">
                            The team dashboard provides quick access to a team's set of dashboards and provides a list of the users belonging to the
                            team.
                        </p>
                        <p className="mt-1">
                            There is also a team statistics section which in the future will feature useful agile metrics such as burndown charts and
                            team velocity data. Future development would also ideally allow for these metrics to be exported as a report.
                        </p>

                        <p className="text-decoration-underline mb-0 pb-0"> Tracking dashboard </p>
                        <p className="mt-0">
                            The tracking dashboard is a customisable kanban board, designed to allow users to visualise workflow. Users can define
                            tracking columns with optional WIP (Work In Progress) limits, add stories to these columns and move these stories both
                            horizontally and vertically through the columns. Time based filters also allow users to filter the stories based on they
                            last changed tracking column.
                        </p>

                        <p className="text-decoration-underline mb-0 pb-0"> Epics dashboard </p>
                        <p className="mt-0 mb-0">
                            The epics dashboard allows users to define and edit epics and stories. Once added to the dashboard, epics can be ordered
                            horizontally and stories vertically to visualise priority. Users can add values to the epics and both values and tags to
                            user stories.
                        </p>
                        <p className="mt-1 mb-0">
                            The epics dashboard can also be filtered to show all epics and stories, only the uncompleted epics and stories and finally
                            only the completed epics and stories.
                        </p>
                        <p className="mt-1">The dashboard also features a small number of simple metrics which will be expanded on in the future.</p>
                    </div>

                    <button
                        type="button"
                        class="collapsible"
                        name="collapsible_four"
                        onClick={this.updateCollapsible}
                        value={this.state.collapsible_four}>
                        How to use RViT - Stakeholders
                        <p className="float-end collapsible-symbol"> {this.state.collapsible_four ? <> - </> : <> + </>} </p>
                    </button>
                    <div class="home-blurb" style={getCollapsed(this.state.collapsible_four)}>
                        <p>This feature set is coming soon. </p>
                        <p>
                            In the future a stakeholder will provided with seamless access to multiple team's dashboards with custom metrics reports
                            and team productivity views.
                        </p>
                    </div>
                    <div className="last-section" />
                </div>
            </>
        );
    }
}

export default HelpDashboard;
