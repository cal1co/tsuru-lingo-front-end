import React from 'react';
import { useState, useEffect } from 'react' 

// Match the pairs <-- 3-5 words to match 

// hardest component??? 





function PairMatch(props) {
    const [words, useWords] = useState([])
    const [kanaIndex, useKanaIndex] = useState([])
    const [options, useOptions] = useState([])
    const [selection, useSelection] = useState([])
    const [selected, useSelected] = useState([])
    const [correct, useCorrect] = useState(0)
    const [batsu, useBatsu] = useState(0)
    const [result, useResult] = useState([])
    


    useEffect(()=>{
        vocabulary(props.vocab)
        // console.log('******',props)
    }, [])

    // useEffect(()=>{
    //     props.sendResult(result)
    // },[result])

    useEffect(()=>{
        if (words.length > 0){
            checkGameState()      
        }

    },[selection])

    function randomise(input){
        return input.sort((a,b) => 0.5 - Math.random())
    } 

    function vocabulary(vocab){
        let secondShuffle = randomise(vocab)
        // console.log('props in vocab',vocab)
        useWords(secondShuffle)
        answers(vocab)
    }

    function answers(arr){
        // console.log(arr)
        let optionArr = []
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            optionArr.push(e)
        }
        let options = randomise(optionArr)
        useOptions(options)
    }

    function makeSelection(index, e){
        // console.log('PAIR MATCH SELECTION MADE:', index)
        if (selection.length > 0){
            // console.log(selection)
            if (selection[0].word !== index.word){
                // console.log('WRONG CHOICE!')
                selected.target.className = ''
                e.target.className = ''
                useSelection([])
                useBatsu(batsu+1)
            } else {
                // console.log('CORRECT CHOICE!!!')
                e.target.className = 'selected'
                useSelection([])
                useCorrect(correct+1)
            }
        } else {
            useSelection([index])
            // console.log('selection:', selection)
            e.target.className = 'selected'
            useSelected(e)
        }
    }

    function checkGameState(){
        console.log('correct:', correct, 'length:', words.length, 'incorrect', batsu)
        if (correct === words.length){
            // console.log('ALL CORRECT!!!')
            useResult(true)

            props.sendResult(true)
        }
        if (batsu === 3){
            // console.log(`YOU'RE OUT`, batsu, 'ERRORS')
            useResult(false)

            props.sendResult(false)

        }    
    }
    
    return (
        <div>
            <h1>This is pair match</h1>
            <div className="kana-match-grid">
                <div className="questions pair-match">
                    {
                    words.map((e, index) => {
                        return <div className={''} key={index} onClick={(e) => makeSelection(words[index], e)}>{e.kana}</div>
                    })
                    }

                </div>

                <div className="answers pair-match">
                    {
                    options.map((e, index)=> {
                        return <div className={''} key={index} onClick={(e) => makeSelection(options[index], e)}>{e.word}</div>
                    })
                    }
                </div>
            </div>



        </div>
    );
}

export default PairMatch;