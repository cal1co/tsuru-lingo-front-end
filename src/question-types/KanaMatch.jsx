
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
    function select(num){
        console.log('User selected option:', num)
        if (options[num].kana===props.vocab[0].kana){
            console.log('CORRECT!!', props.vocab[0].kana)
        } else {
            console.log('INCORRECT!!', options[num].kana)
        }
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

                    <div className="option" onClick={()=>select(0)}>
                        <div className="option-val choice-1" >
                            <h3>{options[0].word}</h3>
                        </div>
                    </div>
                    <div className="option" onClick={()=>select(1)}>
                        <div className="option-val choice-2" >
                            <h3>{options[1].word}</h3>
                        </div>
                    </div>
                    <div className="option" onClick={()=>select(2)}>
                        <div className="option-val choice-3" >
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