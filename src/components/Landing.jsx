import React, { Component } from 'react';
import * as THREE from 'three'
import {Link} from 'react-router-dom'
import '../css/App.css'

class Landing extends Component {
    render() {
        return (
            <div>
                <nav className="home-nav">
                    {/* <a href="/">tsurulingo</a> */}
                    <Link to="/" className="blank"><h1 className="title">TSURULINGO</h1></Link>
                    
                    {/* 
                    DROP-DOWN/POP-UP DIV
                    https://www.w3schools.com/howto/howto_css_login_form.asp
                     */}
                </nav>

                <h1 className="home">HOME PAGE - [insert pretty CSS here] nothing here except for welcome and login</h1>

                <h2>ABOUT THE APP</h2>


            </div>
        );
    }
}

export default Landing;
