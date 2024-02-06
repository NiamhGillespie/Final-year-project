import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/home.css';

export class Home extends Component {
    render() {

        return (
            <>
                    <div className="home-img-background">
                        <img src="http://localhost:8000//media/homepage.png" alt="logo" className="home-img" />
                    </div>
            </>
        );
    }
}

export default Home;
