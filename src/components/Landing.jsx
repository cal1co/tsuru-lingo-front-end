import React, { Component } from 'react';
import * as THREE from 'three'

class Landing extends Component {
    render() {
        return (
            <div>
                <nav className="home-nav">
                    <button>HELP</button>
                    <button>LOGIN</button>
                    {/* 
                    DROP-DOWN/POP-UP DIV
                    https://www.w3schools.com/howto/howto_css_login_form.asp
                     */}
                </nav>

                <h1 className="home">THIS IS THE HOME PAGE!! WELCOME TO TSURU-LiNGO</h1>
            </div>
        );
    }
}

export default Landing;