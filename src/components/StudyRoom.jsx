import React, { Component } from 'react';
import Dictionary from './Dictionary'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react' 
import ProgressBar from 'react-bootstrap/ProgressBar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios';

const API_KEY = 'http://localhost:3000'


function StudyRoom() {
    
    let navigate = useNavigate();

    const [lang, setLang] = useState('')
    const [user, setUser] = useState('unset')
    const [modules, setModules] = useState([])
    const [dictionary, setDictionary] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getLang()
        getUser()
    }, [lang])

    function dict(){
        // console.log('dict')
        // navigate('/learn/jp/dictionary')
        setDictionary(true)
    }
    function lesson(){
        setDictionary(false)
    }
    function getLang(){
        console.log('called', lang)
        axios.get(`${API_KEY}/JP`)
            .then((res) => {
                console.log(res.data)
                setLang(res.data.code)
                setModules(res.data.modules)
                setLoading(false)
            })
            .catch((err) => {
                console.log('error fetching data:', err)
            })
    }
    function getUser(){
        console.log('getting user', user)
        axios.get(`${API_KEY}/users/current/user`, {params: {token: localStorage.getItem("jwt")}})
            .then((res) => {
                console.log('this is current user:', res.data)
                setUser(res.data)
            })
            .catch((err) =>{
                console.log('error fetching user', err)
            })
    }



    let goToLesson = (index, mod)=>{
        let pass = user.passed.length
        if (pass == 0 || pass/(mod * 4) > 1/4){
            console.log('lesson:', index)
            lesson = pass + 1
            navigate(`/learn/jp/${lesson}`)
        } // call extra work lesson <-- randomly generated in backend
        else if(pass > mod * 4){
            navigate(`/learn/jp/${index+1}/complete`)
            axios.get(`${API_KEY}/complete/modules/${mod}`)
                .then((res) => {
                    console.log("COMPLETE MODULE RES", res.data)
                }) 
                .catch((err) => {
                    console.log("ERROR FETCHING PRAC LESSON", err)
                })
        }
        console.log(mod)
    }


    return (
        <div>
            <div className="nav-prog">

                <Button variant="secondary" onClick={lesson}>My Lessons</Button>
                <Button variant="secondary" onClick={dict}>Dictionary</Button>
                <Button variant="secondary" >Forums</Button>
                <Button variant="secondary" >Profile</Button>
                {/* <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                menuVariant="dark"
                title="My Decks"
                className="mt-2"
                >
                    <Dropdown.Item href="#/action-1" active>
                    Vocab
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Hiragana</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Katakana</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Kanji</Dropdown.Item>
                </DropdownButton> */}
            </div>
            {dictionary ? <Dictionary/> :
            <div className="modules" key="display">
                {loading 
                ? 
                <div className="load-text">
                    <div class="load">
                        <div class="load-one"></div>
                        <div class="load-two"></div>
                        <div class="load-three"></div>
                    </div>
                </div>
                :
                <div className="home-info">
                    <h3>Lesson Progress: {user.passed.length}/16</h3>
                    <ProgressBar className="home-progress" variant="warning" now={(user.passed.length)/16*100} />
                </div>

                }
                
            {
                modules.length > 0
                ?
                modules.map((e, index) => {
                    return(
                        <div>
                            
                            <div className="module-title" key={index} onClick={() => goToLesson(index, e.num)}>
                                <h2 key={index} className={"module-content " + "module"+index}>
                                    {e.title}
                                </h2>
                            </div>
                        </div>
                    )
                })
                :
                <p className='blank'></p>


            }
            
            </div>
            }
            
        </div>
    );
}

export default StudyRoom;