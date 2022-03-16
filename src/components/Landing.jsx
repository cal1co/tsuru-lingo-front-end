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
                    <div className="nav-elements">
                        <ul>
                            <li>
                                <Link to="/" className="blank"><h1 className="title test-elem">TSURULINGO</h1></Link>
                                {/* 
                                DROP-DOWN/POP-UP DIV
                                https://www.w3schools.com/howto/howto_css_login_form.asp
                                */}
                            </li>

                            {/* <li>
                                <h1 className="test-elem">HIHI</h1>
                            </li> */}
                        </ul>
                    </div>
                    
                </nav>
                <div className="landing">
                    
                    <h1 className="home">HOME PAGE - [insert pretty CSS here] nothing here except for welcome and login</h1>
                    {/* <h1 className="home">HOME PAGE - [insert pretty CSS here] nothing here except for welcome and login</h1> */}
                    <div className="signup">
                        <Link to="/">
                        <button className="button new-acc">GET STARTED</button>
                            </Link>
                        

                        <Link to="/login">
                        <button className="button exist-acc">I ALREADY HAVE AN ACCOUNT</button>
                        </Link>
                    </div>
                </div>

                <div className="about">
                    <h2>ABOUT THE APP</h2>
                    
                </div>

                <footer>
                    misc info

                </footer>
            </div>
        );
    }
}

export default Landing;
