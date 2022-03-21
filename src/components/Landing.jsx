import React, { Component } from 'react';
import * as THREE from 'three'
import {Link} from 'react-router-dom'
import '../css/App.css'
import Login from './Login'
import { useEffect, useState } from 'react' 
import peep from './peep-4.svg'
import peep2 from './peep-6.svg'
// const peep = require('../images/peep-4.svg')

function Landing() {

    const [hey, useHey] = useState('')
    const [shuffle, useShuffle] = useState([])
    const [heyArr, useHeyArr] = useState([])
    const [count, useCount] = useState(0)
    


    useEffect(()=>{
        const modal = document.querySelector("#modal");
        const openModal = document.querySelector(".exist-acc");
        const body = document.querySelector("body");
        
        openModal.addEventListener("click", () => {
            modal.showModal();
        });
        
        getGreetings()
        useHeyArr(['Hello!', '你好!', 'Bonjour', 'こんにちわ！', 'Ciao!', 'Halo!'])
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
    function openSignup(){
        console.log('open signup has been called!!')
    }

    function randomise(input){
        return input.sort((a,b) => 0.5 - Math.random())
    } 
    function getGreetings(){
        let heyOrder = Array(6).fill().map((e, index) => index)
        console.log('hey order', heyOrder)
        useShuffle(randomise(heyOrder))
        
    }
    function sayHey(){
        useHey(heyArr[shuffle[count]])
        if (count < 5){
            useCount(count+1)
        } else {
            useCount(0)
        }
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
                        {/* <Link to="/"> */}
                        <div className="signup-buttons">

                            <button className="button new-acc" onClick={openSignup}>GET STARTED</button>
                        </div>
                        {/* </Link> */}
                        

                        {/* <Link to="/login"> */}
                        <div className="signup-buttons">

                            <button className="button exist-acc" onClick={openLogin}>
                                I ALREADY HAVE AN ACCOUNT
                            </button>
                        </div>

                            <dialog class="modal" id="modal">
                                <div className="login-modal">
                                    <Login/>
                                </div>
                            </dialog>
                        
                        {/* </Link> */}
                    </div>
                    <div className="container">
                        <img src='http://assets.stickpng.com/images/58adf251e612507e27bd3c32.png' className="speech" onClick={sayHey}/>
                        <h3>{hey ? hey : 'Hello!'}</h3>
                    </div>
                    <div className="peeps">
                        <div>

                        <img src={peep} className="peep" />
                        </div>
                        <img src={peep2} className="peep listener" />
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