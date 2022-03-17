import React from 'react';
import { useState, useEffect } from 'react' 


// Match image to word - no english! 



function WordMatch(props) {
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
            <h3>THIS IS NO ENG MATCH - no english</h3>
            {words.length>0
            ?
            <div className="kana-match-grid">
                <img src={props.vocab[0].image} />
                <div className="kana-options">

                    <div className="option">
                        <div className="option-val">
                            <h3>{options[0].kana}</h3>
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-val">
                            <h3>{options[1].kana}</h3>
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-val">
                            <h3>{options[2].kana}</h3>
                        </div>
                    </div>
                </div>
            </div>
            :
            <p>loading...</p>}

        </div>
    );
}

export default WordMatch;