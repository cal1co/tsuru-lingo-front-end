import React, { Component } from 'react';
import * as THREE from 'three'
import {Link} from 'react-router-dom'
import '../css/App.css'
import Login from './Login'
import { useEffect } from 'react' 


function Landing() {

    useEffect(()=>{
        const modal = document.querySelector("#modal");
        const openModal = document.querySelector("button");
        const body = document.querySelector("body");

        openModal.addEventListener("click", () => {
            modal.showModal();
        });

        // body.addEventListener("click", (e) => {
        //     if (!e.target.classList.contains('modal')){

        //     }
        //     // modal.close();
        //     console.log(e.target.classList)
        // })
        // modal.setCanceledOnTouchOutside

    }, [])

    function openLogin(){
        console.log('open login has been called!!')
        
    }

        // const modal = document.querySelector("#modal");
        // const openModal = document.querySelector("button");
        // openModal.addEventListener("click", () => {
        //     modal.showModal();
        // });


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
                            <button className="button new-acc" onClick={openLogin}>GET STARTED</button>
                        </Link>
                        

                        {/* <Link to="/login"> */}
                            <button className="button exist-acc" onClick={openLogin}>
                                I ALREADY HAVE AN ACCOUNT
                            </button>

                            <dialog class="modal" id="modal">
                                <div className="login-modal">
                                    <Login/>
                                </div>
                            </dialog>

                        {/* </Link> */}
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

export default Landing;