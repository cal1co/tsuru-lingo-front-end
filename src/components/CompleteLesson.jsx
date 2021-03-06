
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'
import css from '../css/App.css'
import KanaMatch from '../question-types/KanaMatch'
import PictureMatch from '../question-types/PictureMatch'
import PairMatch from '../question-types/PairMatch'
import NoEngMatch from '../question-types/NoEngMatch'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



const API_KEY = 'https://tsuru-lingo-backend.herokuapp.com'


function CompleteLesson(props) {

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
    const [passFail, usePassFail] = useState(false)
    const [passCalled, usePassCalled] = useState(false)
    const [remaining, useRemaining] = useState(0)
    const [count, useCount] = useState(0)
    const [show, useShow] = useState(false)
    const [failShow, useFailShow] = useState(false)
    const { lesson } = useParams()

    const handleClose = () => useShow(false);
    const handleShow = () => useShow(true);
    const handleFailShow = () => useFailShow(true);


    let navigate = useNavigate();

    useEffect(()=>{
        getModule()
        console.log('lesson', lesson)
    }, [])

    useEffect(()=>{
        getGameData()
    }, [vocab])

    async function getModule(){
        // console.log('Getting module!')
        useLoading(true)
        let res = await axios.get(`${API_KEY}/complete/modules/${lesson}`) // this is unnecessary 
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
        useRemaining(progressedOrder.length)

        useCount(count + 1)
        if (strikes === 2){
            console.log('OH NO, YOU FAILED THIS LESSON')
            usePassFail(false)
            // confirm('OH NO, YOU FAILED THIS LESSON')
            handleFailShow()
        } else {
            if (progressedOrder.length>0){
                const chosenGame = progressedOrder.shift()
                // console.log('PROGRESSING GAME !!!! ', chosenGame)
                useProgress(chosenGame)
                useProgressedOrder(progressedOrder)
            } else {
                usePassFail(true)
                handleShow()
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
    function goHome(){
        navigate('/learn/jp')
    }

    // if (passFail){
       
    // }



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
                    <div className="load-text">
                        <div class="load">
                            <div class="load-one"></div>
                            <div class="load-two"></div>
                            <div class="load-three"></div>
                        </div>
                    </div>
                    :
                        <div>
                        {progress === 0 &&<div><h1>LESSON BRIEF</h1></div>}
                        {progress !== 0 && <div className="progress-info"><button className="close-lesson" onClick={goHome}>X</button><ProgressBar variant="info" now={(count-1)/8*100} /><h4>{remaining}</h4></div>}
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
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You have passed lesson {lesson}!
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={goHome}variant="primary">Back To lessons</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={failShow} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Oh no!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You have failed lesson {lesson}!
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={goHome}variant="primary">Back To lessons</Button>
                </Modal.Footer>
            </Modal>
            </div>

            <div className={(!nextStage ? '' : (result ? 'control-correct' : 'control-incorrect')) + " user-controls"}>
                <button className={started ? (!nextStage ? 'hide' : 'display') : ''} onClick={next}>Next</button>    
            </div>

        </div>
    );
}

export default CompleteLesson;


// rsf 