import React from 'react';
import { useState, useEffect } from 'react' 

// Match the pairs <-- 3-5 words to match 

// hardest component??? 





function PairMatch(props) {
    const [words, useWords] = useState([])
    const [kanaIndex, useKanaIndex] = useState([])
    const [options, useOptions] = useState([])

    useEffect(()=>{
        // useVocab(props)
        vocabulary(props.vocab)
        console.log('******',props)
    }, [])

    function randomise(input){
        return input.sort((a,b) => 0.5 - Math.random())
    } 

    function vocabulary(vocab){
        let secondShuffle = randomise(vocab)
        console.log('props in vocab',vocab)
        useWords(secondShuffle)
        answers(vocab)
    }

    function answers(arr){
        console.log(arr)
        let optionArr = []
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            optionArr.push(e)
        }
        let options = randomise(optionArr)
        useOptions(options)
    }

    return (
        <div>
            <h1>This is pair match</h1>
            <div className="kana-match-grid">
                <div className="questions pair-match">
                    {words.map((e)=> {return <p>{e.kana}</p>})}

                </div>

                <div className="answers pair-match">
                    {options.map((e)=> {return <p>{e.word}</p>})}
                </div>
            </div>



        </div>
    );
}

export default PairMatch;