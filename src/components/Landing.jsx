import React, { Component } from 'react';
import * as THREE from 'three'
import { Link, useNavigate } from 'react-router-dom'
import '../css/App.css'
import Login from './Login'
import { useEffect, useState } from 'react' 
import peep from './peep-4.svg'
import peep2 from './peep-6.svg'
import peepSitting from './peep-sitting-2.svg'
import peepBike from './peep-sitting-3.svg'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const API_KEY = 'https://tsuru-lingo-backend.herokuapp.com'


// const peep = require('../images/peep-4.svg')

function Landing() {

    const [hey, useHey] = useState('')
    const [shuffle, useShuffle] = useState([])
    const [heyArr, useHeyArr] = useState([])
    const [count, useCount] = useState(0)
    const [show, useShow] = useState(false)
    


    useEffect(()=>{
        // const modal = document.querySelector("#modal");
        // const openModal = document.querySelector(".exist-acc");
        // const body = document.querySelector("body");
        
        // openModal.addEventListener("click", () => {
        //     // modal.showModal();
        // });
        
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

    const handleClose = () => useShow(false);
    const handleShow = () => useShow(true);
    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')

    let navigate = useNavigate();

    // const [currentUser, dispatch] = useReducer(reducer, {}) 


    function login(e) {
        e.preventDefault()
        console.log('mail:', mail, 'pass:', pass)
        axios.post(`${API_KEY}/login`, {
            email:mail,
            password:pass
        })
        .then((res) => {
            console.log("LOGIN SUCCESSFUL", res)
            // dispatch({type:'setUser'})

            navigate('/learn/jp')
            setUser(res.data.token)
            // this.setState({ redirect: "/learn/jp" });
        })
        .catch((err) => {
            console.log("Error logging in:", err)
        })
    }
    function setUser(token){
        localStorage.setItem("jwt", token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }


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
                    

                    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={e => setMail(e.target.value)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={e => setPass(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                        </Form>



                    </Modal.Body>
                    <Modal.Footer>
                        <div className="mail">
                            
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </div>
                        <div className="pass">
                            <Button variant="primary" onClick={login}>Login</Button>
                            
                        </div>
                    </Modal.Footer>
                    </Modal>
                    <button className="home butt">Learn Smarter Not Harder</button>
                    {/* <h1 className="home">HOME PAGE - [insert pretty CSS here] nothing here except for welcome and login</h1> */}
                    <div className="signup">
                        {/* <Link to="/"> */}
                        <div className="signup-buttons">

                            <button className="button new-acc" onClick={openSignup}>GET STARTED</button>

                        
                        </div>
                        {/* </Link> */}
                        

                        {/* <Link to="/login"> */}
                        <div className="signup-buttons">

                            <button className="button exist-acc" onClick={handleShow}>
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
                    <h3 className="about-tag">The best way to learn and memorise a language</h3>
                    <h5 className="about-exp">Have fun whilst learning a language: progress through quick and engaging lesson modules that are <u>proven to work.</u> Keep track of your progress and <u>compare results</u> with your friends and family!</h5>
                    
                    <img src={peepSitting} className="about-peep" />

                </div>
                <div className="about-line"></div>
                    
                <div className="app-benefits">
                    <h3 className="app-tag">Learn anytime anywhere</h3>
                    <h5 className="app-exp">Lorem ipsum dolor sit, <u>amet consectetur adipisicing</u> elit. Aperiam, repellat maiores, dicta saepe iste ex nemo ea, quia minima vitae reprehenderit <u>cumque dolorem atque! Culpa, dignissimos</u>. Voluptatum a deserunt odit?</h5>
                    <img src={peepBike} className="peep-bike" />
                </div>
                <div className="app-line"></div>

                <div className="added-info">
                    <h3>More info:</h3>
                    <li><h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolore eligendi similique perspiciatis minima voluptas esse eos libero fugit corrupti deserunt ex itaque doloremque ipsa sint eius error, provident ullam.</h5></li>
                    <li><h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolore eligendi similique perspiciatis minima voluptas esse eos libero fugit corrupti deserunt ex itaque doloremque ipsa sint eius error, provident ullam.</h5></li>
                    <li><h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolore eligendi similique perspiciatis minima voluptas esse eos libero fugit corrupti deserunt ex itaque doloremque ipsa sint eius error, provident ullam.</h5></li>
                </div>
                <footer>
                    <h5>Links</h5>
                </footer>
            </div>
        );

}

export default Landing;