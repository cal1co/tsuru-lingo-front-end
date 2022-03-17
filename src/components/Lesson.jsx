
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
    const [vocab, useVocab] = useState([])
    const [data, useData] = useState({})
    const [loading, useLoading] = useState(false)
    const [progress, useProgress] = useState(0)
    const [questions, useQuestions] = useState(0)
    const [questionOrder, useQuestionOrder] = useState([])
    const [progressedOrder, useProgressedOrder] = useState([])
    const { lesson } = useParams()


    useEffect(()=>{
        getModule()
    }, [])

    useEffect(()=>{
        getGameData()
    }, [vocab])

    async function getModule(){
        console.log('Getting module!')
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
                console.log('error fetching data:', err)
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
        console.log("*******SHUFFLE ARR********", shuffle )
        useQuestions(shuffle)


        // let qArr = Array(shuffle.length).fill().map((e, index) => index + 1)
        let qArr = Array(4).fill().map((e, index) => index + 1)

        let order = randomise(qArr)
        console.log("*******CARD ORDER ARR********", order )
        useQuestionOrder(order)
        // let secondOrder = order.shuffle()
        let copy = [...order, ...randomise(order)]
        useProgressedOrder(copy)
    }

    function next(){
        if (progressedOrder.length>0){
            const chosenGame = progressedOrder.shift()
            console.log('PROGRESSING GAME !!!! ', chosenGame)
            useProgress(chosenGame)
            useProgressedOrder(progressedOrder)
        } else {
            console.log(`you've progressed through the array!!`, questionOrder)
        }
    }
    function randomNum(){
        return Math.floor(Math.random(4))
    }

    return (
        <div className="lesson-plan">
            <nav className='lesson-header'>
                <h1 className="title test-elem">
                    TSURULINGO
                </h1>

            </nav>

            {part}

            <div className="cards">
                {
                    loading
                    ?
                    <p>loading...</p>
                    :
                        
                        progress == 0
                        ?
                            <div>

                                {/* LESSON INTRO GOES HERE */}
                                <h1>LESSON BRIEF</h1>
                            </div>
                        :
                        progress == 1
                        ?
                            <KanaMatch vocab={vocab}/>
                        :
                        progress == 2
                        ?
                            <PictureMatch vocab={vocab}/>
                        :
                        progress == 3 
                        ?
                            <PairMatch vocab={vocab}/>
                        :
                            <NoEngMatch vocab={vocab}/> // DON'T RENDER THIS FOR THE HIRAGANA ONLY ONES, ONLY FOR VOCABULARY!!!
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