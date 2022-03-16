
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import KanaMatch from '../question-types/KanaMatch'
import PictureMatch from '../question-types/PictureMatch'



const API_KEY = 'http://localhost:3000'


function Lesson(props) {

    const [title, useTitle] = useState('')
    const [vocab, useVocab] = useState([])
    const [data, useData] = useState({})
    const [loading, useLoading] = useState(false)
    const [progress, useProgress] = useState(0)
    const [questions, useQuestions] = useState(0)
    const [questionOrder, useQuestionOrder] = useState(0)
    const { lesson } = useParams()


    useEffect(()=>{
       
        getModule()

    }, data)

    async function getModule(){
        console.log('Getting module!')
        useLoading(true)
        let res = await axios.get(`${API_KEY}/JP/${lesson}`) // this is unnecessary 
            .then((res) => {
                console.log(res)
                useData(res.data)
                useTitle(res.data.title)
                useVocab(res.data.vocab)
                useLoading(false)
            })
            .catch((err) => {
                console.log('error fetching data:', err)
            })
    }

    function next(){
        console.log("progress:", progress)
        useProgress(progress+1)

        function randomise(input){
            return input.sort((a,b) => 0.5 - Math.random())
        } 

        let shuffle = randomise(vocab)
        console.log("*******SHUFFLE ARR********", shuffle )
        useQuestions(shuffle)


        let qArr = Array(shuffle.length).fill().map((e, index) => index + 1)

        let order = randomise(qArr)
        console.log("*******CARD ORDER ARR********", order )
        useQuestionOrder(shuffle)
    }



    return (
        <div className="lesson-plan">
            <nav className='lesson-header'>
                <h1 className="title test-elem">
                    TSURULINGO
                </h1>
            </nav>


            {title.toUpperCase()}

            <div className="cards">
            {
                loading
                ?
                <p>loading...</p>
                :
                    
                    progress < 1
                    ?
                    <div>

                        {/* LESSON INTRO GOES HERE */}
                        <h1>LESSON BRIEF</h1>
                    </div>
                    :
                    progress < 2
                    ?
                        <KanaMatch vocab={vocab}/>
                    :
                        <PictureMatch />
            }
                    </div>

<           div className="user-controls">
                        <button onClick={next}>Next</button>    
            </div>
            {/* {
            vocab.length>1
            ?
            vocab.map((e, index) => {
                return(
                    <div className="vocab" key={index}>
                        <p>{e.kana}: {e.word}</p>
                        <img src={e.image}/>
                    </div>
                    )
                })
            :
            <p></p>
            } */}
            



            {/* <button onClick={getModule}> Get Module!</button> */}
        </div>
    );
}

export default Lesson;


// rsf 