import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/tag_dashboard.css';
import axios from 'axios';
import { API_URL_TAGS, API_URL_STORIES } from '../../constants';
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
        tagsDisplayed: true
    };

    async componentDidMount() {
        this.resetState();
    }

    async getTags() {
        await axios.get(API_URL_TAGS).then((response) => this.setState({ tags: response.data }));
    }

    async getValues() {
        await axios.get(API_URL_STORIES).then((response) => this.setState({ values: response.data }));
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
                    <EditTagModal resetState={this.resetState} tag={tags[i]} />
                    <p className="tag-description"> {tags[i].description} </p>
                </div>
            );
        }

        return returnList;
    }

    getAddButton() {
        if (this.state.tagsDisplayed) {
            return <AddTagModal resetState={this.resetState} />;
        } else {
            return <AddValueModal resetState={this.resetState} />;
        }
    }

    displayValues() {
        var values = this.state.values;
        var returnList = [];

        for (var i = 0; i < values.length; i++) {
            returnList.push(
                <div className="tag-list" style={{ border: '2px solid #' + values[i].colour }}>
                    <DeleteValueModal resetState={this.resetState} value={values[i]} />
                    <EditValueModal resetState={this.resetState} value={values[i]} />
                    <p className="tag-description"> {values[i].description} </p>
                </div>
            );
        }

        return returnList;
    }

    render() {
        return (
            <>
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
