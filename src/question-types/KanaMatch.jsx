
import React from 'react';
import { useState, useEffect } from 'react' 

// match kana to english spelling


function KanaMatch(props) {

    const [words, useWords] = useState([])


    useEffect(()=>{
        // useVocab(props)
        vocabulary(props.vocab)
    }, words)


    function vocabulary(vocab){
        console.log('props',props)
        useWords(vocab)
    }
    return (
        <div>

            <button onClick={() => console.log(words)}>test props</button>
            <h3>THIS IS KANA MATCH</h3>
        </div>
    );
}

export default KanaMatch;