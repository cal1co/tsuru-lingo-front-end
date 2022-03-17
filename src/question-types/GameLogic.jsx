
import React from 'react';
import { useState, useEffect } from 'react' 
import { LoadingManager } from 'three';


function GameLogic(props) {
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
};