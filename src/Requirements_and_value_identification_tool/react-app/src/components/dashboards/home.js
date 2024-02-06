import React, { Component } from 'react';
import '../../css/basic.css';
import '../../css/home.css';
import { SHORT_URL } from '../../constants';

export class Home extends Component {
    render() {

        return (
            <>
                    <div className="home-img-background">
                        <img src={SHORT_URL + "media/homepage.png"} alt="logo" className="home-img" />
                    </div>
            </>
        );
    }
}

export default Home;
