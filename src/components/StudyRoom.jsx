import React, { Component } from 'react';
import Dictionary from './Dictionary'
import { useNavigate } from "react-router-dom";

function StudyRoom() {
    
 

    let navigate = useNavigate();

    function dict(){
        // console.log('dict')
        navigate('/learn/jp/dictionary')

    }
    return (
        <div>
            <h1>PARENT COMPONENT FOR LESSON AND LESSON BRIEF</h1>
            <button onClick={dict}>Dict</button>

        </div>
    );
}

export default StudyRoom;