
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import KanaMatch from '../question-types/KanaMatch'
import PictureMatch from '../question-types/PictureMatch'
import PairMatch from '../question-types/PairMatch'
import NoEngMatch from '../question-types/NoEngMatch'



const API_KEY = 'http://localhost:3000'


function Lesson(props) {

    const [part, usePart] = useState('')
    const [started, useStarted] = useState(false)
    const [vocab, useVocab] = useState([])
    const [data, useData] = useState({})
    const [loading, useLoading] = useState(false)
    const [progress, useProgress] = useState(0)
    const [questions, useQuestions] = useState(0)
    const [questionOrder, useQuestionOrder] = useState([])
    const [progressedOrder, useProgressedOrder] = useState([])
    const [strikes, useStrikes] = useState(0)
    const [result, useResult] = useState([])
    const [nextStage, useNextStage] = useState(false)
    const { lesson } = useParams()

    useEffect(()=>{
        getModule()
    }, [])

    useEffect(()=>{
        getGameData()
    }, [vocab])

    async function getModule(){
        // console.log('Getting module!')
        useLoading(true)
        let res = await axios.get(`${API_KEY}/JP/${lesson}`) // this is unnecessary 
            .then((res) => {
                console.log(res)
                useData(res.data)
                usePart(res.data.part)
                useVocab(res.data.vocab)
                useLoading(false)
            })
            .catch((err) => {
                // console.log('error fetching data:', err)
            })
            
        // getGameData()
    }

    function getGameData(){
        // console.log("progress:", progress)
        // useProgress(progress+1)

        function randomise(input){
            return input.sort((a,b) => 0.5 - Math.random())
        } 

        let shuffle = randomise(vocab)
        // console.log("*******SHUFFLE ARR********", shuffle )
        useQuestions(shuffle)


        // let qArr = Array(shuffle.length).fill().map((e, index) => index + 1)
        let qArr = Array(4).fill().map((e, index) => index + 1)

        let order = randomise(qArr)
        // console.log("*******CARD ORDER ARR********", order )
        useQuestionOrder(order)
        // let secondOrder = order.shuffle()
        let copy = [...order, ...randomise(order)]
        useProgressedOrder(copy)
    }

    function next(){
        useStarted(true)
        if (strikes === 2){
            console.log('OH NO, YOU FAILED THIS LESSON')
            confirm('OH NO, YOU FAILED THIS LESSON')
        } else {
            if (progressedOrder.length>0){
                const chosenGame = progressedOrder.shift()
                // console.log('PROGRESSING GAME !!!! ', chosenGame)
                useProgress(chosenGame)
                useProgressedOrder(progressedOrder)
            } else {
                confirm("Good job! you completed this lesson!")
                // console.log(`you've progressed through the array!!`, questionOrder)
            }
            useNextStage(false)
            if (!result){
                console.log(strikes)
                useStrikes(strikes + 1)
            }
        }
        
    }

    function randomNum(){
        return Math.floor(Math.random(4))
    }

    function questionResults(outcome){
        console.log('THIS IS BEING CALLED FROM THE CHILD!!!', outcome)
        useResult(outcome)
        if (outcome.length === 0){

        } else {
            useNextStage(true)
        }
    }



    return (
        <div className="lesson-plan">
            <nav className='lesson-header'>
                <h1 className="title test-elem">
                    TSURULINGO
                </h1>

            </nav>

            {/* {part} */}

            <div className="cards">
                {
                    loading
                    ?
                    <p>loading...</p>
                    :
                        <div>
                        {progress === 0 &&<div><h1>LESSON BRIEF</h1></div>}
                        {progress === 1 && <KanaMatch vocab={vocab} sendResult={questionResults}/>}
                        {progress === 2 && <PictureMatch vocab={vocab} sendResult={questionResults}/>}
                        {progress === 3 && <PairMatch vocab={vocab} sendResult={questionResults}/>}
                        {progress === 4 && <NoEngMatch vocab={vocab} sendResult={questionResults}/>}

                        </div>
                        // progress == 0
                        // ?
                        //     <div>
                        //         <h1>LESSON BRIEF</h1>
                        //     </div>
                        // :
                        // progress == 1
                        // ?
                        //     <KanaMatch vocab={vocab} sendResult={questionResults}/>
                        // :
                        // progress == 2
                        // ?
                        //     <PictureMatch vocab={vocab} sendResult={questionResults}/>
                        // :
                        // progress == 3 
                        // ?
                        //     <PairMatch vocab={vocab} sendResult={questionResults}/>
                        // :
                        //     <NoEngMatch vocab={vocab} sendResult={questionResults}/> // DON'T RENDER THIS FOR THE HIRAGANA ONLY ONES, ONLY FOR VOCABULARY!!!
                }
            </div>

            <div className={(!nextStage ? '' : (result ? 'control-correct' : 'control-incorrect')) + " user-controls"}>
                <button className={started ? (!nextStage ? 'hide' : 'display') : ''} onClick={next}>Next</button>    
            </div>

        </div>
    );
}

export default Lesson;


// rsf 