
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import KanaMatch from '../question-types/KanaMatch'



const API_KEY = 'http://localhost:3000'


function Lesson(props) {

    const [title, useTitle] = useState('')
    const [vocab, useVocab] = useState([])
    const [data, useData] = useState({})
    const [loading, useLoading] = useState(false)
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

    return (
        <div className="lesson-plan">
            <nav className='lesson-header'>
                <h1 className="title test-elem">
                    TSURULINGO
                </h1>
            </nav>



            {
                loading
                ?
                <p>loading...</p>
                :
                <div>
                    <div className="cards">
                    {title.toUpperCase()}
                        <KanaMatch vocab={vocab}/>
                        {/* Load components here */}
                        
                    </div>
                    <div className="user-controls">
                        <button>Next</button>    
                    </div>
                </div>
            }


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