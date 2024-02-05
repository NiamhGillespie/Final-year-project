import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/home.css';
import { Link } from 'react-router-dom';

export class Home extends Component {
    state = {
        collapsible_one: false,
        collapsible_two: false,
        collapsible_three: false,
        collapsible_four: false
    };

    updateCollapsible = (e) => {
        console.log(this.state[e.target.name]);
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

<img src='http://localhost:8000//media/homepage.png' alt="logo" className='home-img' />
                <p className="home-welcome"> Welcome to RViT! </p>

                <button type="button" class="collapsible" name="collapsible_one" onClick={this.updateCollapsible} value={this.state.collapsible_one}>
                    What is Rvit?
                    <p className="float-end collapsible-symbol"> {this.state.collapsible_one ? <> - </> : <> + </>} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_one)}>
                    <p>RVit is a requirements and value identification tool for prioritisation.</p>
                    <p>Can be used..</p>
                </div>

                <button type="button" class="collapsible" name="collapsible_two" onClick={this.updateCollapsible} value={this.state.collapsible_two}>
                    How to use RViT - Admin
                    <p className="float-end collapsible-symbol"> {this.state.collapsible_two ? <> - </> : <> + </>} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_two)}>
                    <p>
                        When you <Link to="/sign-up"> set up an organistation</Link> with RViT, an admin account will also be created.
                    </p>

                    <p> When logged into an admin account you can add teams and users and view, edit, and delete these profiles. </p>
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
                    <p> When logged into a team lead or team member account you can access a variety of views?... </p>

                    <p> Tag dashboard </p>
                    <p> explanation</p>

                    <p> Team dashboard </p>

                    <p> Tracking dashboard </p>

                    <p> Epics dashboard </p>
                </div>

                <button
                    type="button"
                    class="collapsible"
                    name="collapsible_four"
                    onClick={this.updateCollapsible}
                    value={this.state.collapsible_four}>
                    How to use RViT - Stakeholder - Coming soon...
                    <p className="float-end collapsible-symbol"> {this.state.collapsible_four ? <> - </> : <> + </>} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_four)}>
                    <p>Coming soon </p>
                    <p> A stakeholder account will provide seamless access to multiple team's dashboards</p>
                </div>
            </>
        );
    }
}

export default Home;
