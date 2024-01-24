import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/home.css';
import { Button, Collapse } from 'reactstrap';

export class Home extends Component {
    state = {
        collapsible_one: false,
        collapsible_two: false,
        collapsible_three: false,
        collapsible_four: false
    };

    updateCollapsible = (e) => {
        console.log(this.state[e.target.name])
        if (this.state[e.target.name] === false ) {
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
                <p className="home-welcome"> Welcome to RViT! </p>


                <button type="button" class="collapsible" name="collapsible_one" onClick={this.updateCollapsible} value={this.state.collapsible_one}>
                    What is Rvit?
                    < p className="float-end collapsible-symbol"> {this.state.collapsible_one ? (<> - </>) : (<> + </>)} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_one)}>
                    <p>Explanation of what RVit is, the goals behind is</p>
                </div>


                <button type="button" class="collapsible" name="collapsible_two" onClick={this.updateCollapsible} value={this.state.collapsible_two}>
                    How to use RViT - Admin
                    < p className="float-end collapsible-symbol"> {this.state.collapsible_two ? (<> - </>) : (<> + </>)} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_two)}>
                    <p>Setting up an organisation, adding teams and users </p>
                </div>

                <button type="button" class="collapsible" name="collapsible_three" onClick={this.updateCollapsible} value={this.state.collapsible_three}>
                    How to use RViT - Team Lead/Member
                    < p className="float-end collapsible-symbol"> {this.state.collapsible_three ? (<> - </>) : (<> + </>)} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_three)}>
                    <p>Different views explination </p>
                </div>

                <button type="button" class="collapsible" name="collapsible_four" onClick={this.updateCollapsible} value={this.state.collapsible_four}>
                    How to use RViT - Stakeholder
                    < p className="float-end collapsible-symbol"> {this.state.collapsible_four ? (<> - </>) : (<> + </>)} </p>
                </button>
                <div class="home-blurb" style={getCollapsed(this.state.collapsible_four)}>
                    <p>Coming soon</p>
                </div>
            </>
        );
    }
}

export default Home;
