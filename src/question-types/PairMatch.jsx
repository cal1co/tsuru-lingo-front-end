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

            <div className="questions">
                {words[0].kana}
                {words[1].kana}
                {words[2].kana}
                {words[3].kana}
                {words[4].kana}
            </div>

            <div className="answers">
                {options[0].word}
                {options[1].word}
                {options[2].word}
                {options[3].word}
                {options[4].word}
            </div>



        </div>
    );
}

export default PairMatch;