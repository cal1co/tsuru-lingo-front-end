
import React from 'react';
import { useState, useEffect } from 'react' 
import { LoadingManager } from 'three';

// match kana to english spelling
// TODO: THE KANA SHOULD BE CHOSEN HERE!!!! NOT THE PARENT !!!!
// SAVE THE CHOSEN KANA INDEX INTO KANA INDEX AND COMPARE WITH THE CHOICE


function KanaMatch(props) {

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
        for (let i = 0; i < 3; i++) {
            const e = arr[i];
            optionArr.push(e)
        }
        let options = randomise(optionArr)
        useOptions(options)
    }

    return (
        <div>

            <button onClick={() => console.log(words)}>test props</button>
            <h3>THIS IS KANA MATCH</h3>
            {words.length>0
            ?
            <div className="kana-match-grid">
                <h1>{props.vocab[0].kana}</h1>
                <div className="kana-options">

                    <div className="option">
                        <div className="option-val">
                            <h3>{options[0].word}</h3>
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-val">
                            <h3>{options[1].word}</h3>
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-val">
                            <h3>{options[2].word}</h3>
                        </div>
                    </div>
                </div>
                {/* <option value="hi">{words[1][0]}</option>
                <option value="hi">{words[1][1]}</option>
                <option value="hi">{words[1][2]}</option> */}
            </div>
            :
            <p>loading...</p>}


        </div>
    );
}

export default KanaMatch;