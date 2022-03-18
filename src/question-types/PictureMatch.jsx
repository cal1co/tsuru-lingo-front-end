import React from 'react';
import { useState, useEffect } from 'react' 

// Match image to word OR word to image

// FOR NON HIRAGANA - ENG LETTER, THE WORD SHOULD BE REPLACED WITH KANA TO MATCH TO THE IMAGES


function PictureMatch(props) {
    const [words, useWords] = useState([])
    const [options, useOptions] = useState([])
    const [result, useResult] = useState([])


    useEffect(()=>{
        // useVocab(props)
        vocabulary(props.vocab)
        console.log('******',props)
    }, [])

    useEffect(()=>{
        props.sendResult(result)
    },[result])

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

    function select(num){
        console.log('User selected option:', num)
        if (options[num].kana===props.vocab[0].kana){
            console.log('CORRECT!!', props.vocab[0].kana)
            useResult(true)
        } else {
            console.log('INCORRECT!!', options[num].kana)
            useResult(false)
        }
    }

    return (
        <div>

            <button onClick={() => console.log(words)}>test props</button>
            <h3>THIS IS PICTURE MATCH</h3>
            {words.length>0
            ?
            <div className="kana-match-grid">
                {/* <img src={props.vocab[0].word} /> */}
                {/* <h1>{props.vocab[0].word}</h1> */}
                <h1>{props.vocab[0].kana}</h1>
                <div className="kana-options">

                    <div className="option" onClick={()=>select(0)}>
                        <div className="option-val">
                            <img src={options[0].image} />

                            {/* <h3>{options[0].image}</h3> */}
                        </div>
                    </div>
                    <div className="option" onClick={()=>select(1)}>
                        <div className="option-val">
                            <img src={options[1].image} />

                            {/* <h3>{options[1].image}</h3> */}
                        </div>
                    </div>
                    <div className="option" onClick={()=>select(2)}>
                        <div className="option-val">
                            <img src={options[2].image} />
                            {/* <h3>{options[2].image}</h3> */}
                        </div>
                    </div>
                </div>
            </div>
            :
            <p>loading...</p>}

        </div>
    );
}

export default PictureMatch;