import React, { Component } from 'react';
import Dictionary from './Dictionary'
import { useNavigate } from "react-router-dom";
import { useState } from 'react' 
import axios from 'axios';


const API_KEY = 'http://localhost:3000'


function StudyRoom() {
    
    let navigate = useNavigate();

    const [lang, setLang] = useState('')
    const [modules, setModules] = useState([])

    function dict(){
        // console.log('dict')
        navigate('/learn/jp/dictionary')
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
    let goToLesson = (index)=>{
        console.log('lesson:', index)
        navigate(`/learn/jp/${index+1}`)
    }

    return (
        <div>
            <h1>PARENT COMPONENT FOR LESSON AND LESSON BRIEF</h1>
            <button onClick={dict}>Dict</button>
            <button onClick={getLang}>get lang</button>


            <div className="modules" key="display">
                {
                    modules.length > 0
                    ?
                    modules.map((e, index) => {
                        return(
                            <div key={index} onClick={() => goToLesson(index)}>
                                <h2 key={index}>
                                    {e.title}
                                </h2>
                            </div>
                        )
                    })
                    :
                    <p className='blank'></p>


                }
                
            </div>
        </div>
    );
}

export default StudyRoom;