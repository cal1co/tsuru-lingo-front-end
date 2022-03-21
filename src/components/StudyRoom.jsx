import React, { Component } from 'react';
import Dictionary from './Dictionary'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react' 
import axios from 'axios';

const API_KEY = 'http://localhost:3000'


function StudyRoom() {
    
    let navigate = useNavigate();

    const [lang, setLang] = useState('')
    const [user, setUser] = useState('unset')
    const [modules, setModules] = useState([])
    const [dictionary, setDictionary] = useState(false)


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




    let goToLesson = (index)=>{
        if (user.passed.length < 4){
            console.log('lesson:', index)
            lesson = user.passed.length + 1
            navigate(`/learn/jp/${lesson}`)
        }
    }





    return (
        <div>

            <button onClick={dict}>Dictionary</button>
            <button onClick={lesson}>My Lessons</button>
            {/* {dictionary && <Dictionary/>} */}
            {dictionary ? <Dictionary/> :
            <div className="modules" key="display">
            {
                modules.length > 0
                ?
                modules.map((e, index) => {
                    return(
                        <div>
                            <h1>My Lessons:</h1>
                            <div className="module-title" key={index} onClick={() => goToLesson(index)}>
                                <h2 key={index}>
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