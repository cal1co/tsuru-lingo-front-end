import React, { Component } from 'react';
import axios from 'axios'
import { useState, useReducer } from 'react' 

import { useNavigate } from "react-router-dom";

const API_KEY = 'https://tsuru-lingo-backend.herokuapp.com/'


// function reducer(state, action){

//     switch(action.type){
//         case 'setUser':
//             return state = 
//     }



// }


function Login() {
    
    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')

    let navigate = useNavigate();

    // const [currentUser, dispatch] = useReducer(reducer, {}) 


    function login(e) {
        e.preventDefault()
        console.log('mail:', mail, 'pass:', pass)
        axios.post(`${API_KEY}/login`, {
            email:mail,
            password:pass
        })
        .then((res) => {
            console.log("LOGIN SUCCESSFUL", res)
            // dispatch({type:'setUser'})

            navigate('/learn/jp')
            setUser(res.data.token)
            // this.setState({ redirect: "/learn/jp" });
        })
        .catch((err) => {
            console.log("Error logging in:", err)
        })
    }
    function setUser(token){
        localStorage.setItem("jwt", token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
        return (
            <div className="modal">
                <h1>LOGIN PAGE [RENDERED IN THE LANDING PAGE??]</h1>
            
            <form className="modal">
                <input type="text" onChange={e => setMail(e.target.value)} placeholder="e-mail"/>
                <input type="text" onChange={e => setPass(e.target.value)} placeholder="password"/>
                <button onClick={login}>login</button>
            </form>
            
            </div>
        );

}

export default Login;