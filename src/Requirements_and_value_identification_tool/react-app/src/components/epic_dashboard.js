import React, { Component } from 'react';
import '../css/basic.css';



export class EpicsDashboard extends Component {

    static displayName = EpicsDashboard.name;

    render() {
        return (
            <>
                <div className= "border-bottom d-flex flex-row">
                    <p className='w-5 text-center'> Stats bar </p>
                    <button className = "btn-primary w-5 justify-content-end"> Add new epic </button>
                </div>

                <div>
                    <div> 
                        <p> Team name - Epic Dashboard</p>
                    </div>
                    
                    <div class="d-flex flex-row w-10 h-100">
                        <div class="epic-container p-2">
                            <div class="epic-box"> Epic 1</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>

                        </div>

                         <div class="epic-container">
                            <div class="epic-box"> Epic 2</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>

                        </div>
            
                        <div class="epic-container">
                            <div class="epic-box"> Epic 3</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>
                        </div>

                        <div class="epic-container">
                            <div class="epic-box"> Epic 4</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>
                        </div>

                        <div class="epic-container">
                            <div class="epic-box"> Epic 5</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>
                        </div>

                        <div class="epic-container">
                            <div class="epic-box"> Epic 6</div>

                            <div class="d-flex flex-column">
                                <div className="story-box">Story 1</div>
                                <div class="story-box">Story 2</div>
                                <div class="story-box">Story 3</div>
                                <div class="add-story-box">+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EpicsDashboard;