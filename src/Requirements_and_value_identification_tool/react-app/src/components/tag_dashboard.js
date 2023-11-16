import React, { Component } from 'react';
import '../css/basic.css';
import axios from "axios";
import { API_URL_TAGS, API_URL_STORIES, API_URL_VALUE_DETAILS } from "../constants";
import ReactDOM from "react-dom";
import AddTagModal from './add_tag_modal';
import AddValueModal from './add_value_modal';
import EditTagModal from './edit_tag_modal';
import EditValueModal from './edit_value_modal';
import DeleteTagModal from './delete_tag_modal';
import DeleteValueModal from './delete_value_modal';


export class TagDashboard extends Component {

    state = {
        tags: [],
        values: [],
        tagsDisplayed: true,
    };

    async componentDidMount() {
        await this.resetState();
    }
    
    async getTags() {
        await axios.get(API_URL_TAGS).then(response => this.setState({ tags: response.data }));
    };

    async getValues() {
        await axios.get(API_URL_STORIES).then(response => this.setState({ values: response.data }));
    };
    
    resetState= () => {
        this.getTags();
        this.getValues();
    };

    switchToTags= () => {
        this.setState({ tagsDisplayed: true })
    };

    switchToValues= () => {
        this.setState({ tagsDisplayed: false })
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
                <div className='tag-list' style={{ border: '2px solid ' + '#' + tags[i].colour }}>
                    <DeleteTagModal resetState={this.resetState} tag={tags[i]}/>
                    <EditTagModal resetState={this.resetState} tag={tags[i]}/>
                    <p className='tag-description'> { tags[i].description } </p>
                </div>
            )
        }

        return returnList
    }

    getAddButton() {
        if (this.state.tagsDisplayed) {
            return <AddTagModal resetState={this.resetState}/>
           
        } else {
            return <AddValueModal resetState={this.resetState}/>
        }
    }

    displayValues() {
        var values = this.state.values;
        var returnList = [];

        for (var i = 0; i < values.length; i++) {
            returnList.push(
                <div className='tag-list' style={{ border: '2px solid ' + '#' + values[i].colour }}>
                    <DeleteValueModal resetState={this.resetState} value={values[i]}/>
                    <EditValueModal resetState={this.resetState} value={values[i]}/>
                    <p className='tag-description'> { values[i].description } </p>
                </div>
            )
        }

        return returnList
    }
    
    render() {
        return (
            <>
            <div className='centered' div key='tag-dashboard'>
                <div className='choice-section'>
                    <button className='choice-button' style={{borderRight: '2px solid white'}} onClick={this.switchToTags}>
                        Tags
                    </button>
                    <button className='choice-button' onClick={this.switchToValues}>
                        Values
                    </button>
                    
                    {this.getAddButton()}
                </div>
                

                <div className='display-box'> 
                    {this.renderChoice()}
                </div>
            </div>
            </>
        );
    }
}
//ReactDOM.render(<TagDashboard />, document.getElementById("root"));
export default TagDashboard;
