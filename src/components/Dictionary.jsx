import React, { Component } from 'react';
import axios from 'axios'
import { useState } from 'react' 
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useNavigate } from "react-router-dom";

const API_KEY = 'https://tsuru-lingo-backend.herokuapp.com/'

const JISHO_API = 'https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword='
// https://www.npmjs.com/package/cors-anywhere

function Dictionary() {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState({})


    async function search(e){
        e.preventDefault()
        console.log('searching', query)
        setLoading(true)
        const search = await axios.get(JISHO_API+query)
        .then((res)=>{
            console.log("RESPONSE", res.data.data)
            setResults(res.data.data)
        })
        .catch((err) => {
            console.warn("Issue grabbing response")
        })
        setLoading(false)
    }

    // (function() {
    //     var cors_api_host = 'cors-anywhere.herokuapp.com';
    //     var cors_api_url = 'https://' + cors_api_host + '/';
    //     var slice = [].slice;
    //     var origin = window.location.protocol + '//' + window.location.host;
    //     var open = XMLHttpRequest.prototype.open;
    //     XMLHttpRequest.prototype.open = function() {
    //         var args = slice.call(arguments);
    //         var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    //         if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
    //             targetOrigin[1] !== cors_api_host) {
    //             args[1] = cors_api_url + args[1];
    //         }
    //         return open.apply(this, args);
    //     };
    // })();

    return (
        <div>
            <h2 className="dict-info" >Search for JP or EN words or phrases:</h2>
            <Form className="dict-form">
                <Form.Control className="dict-search" type="text" placeholder="JP/EN" onChange={e => setQuery(e.target.value)}/>
                <Button variant="secondary" type="submit" onClick={search}>search</Button>
            </Form>

            <div className="results">
            {
            loading 
            ? 
            <div className="load-text">
            <div class="load">
            <div class="load-one"></div>
            <div class="load-two"></div>
            <div class="load-three"></div>
            </div>

            
          </div>
            :
            <h1></h1>
            }    
            </div>


            { 
            results.length > 1
            && 
            results.map((result, index) => {
                let defArr = result.senses
                // console.log(defArr)
                return(
                    <div className="dict-results" key={index} id={index}>
                        <h1 key="word">{result.slug} ({result.japanese[0].reading})</h1>

                        <h3>{defArr.map((definition, index)=>{
                            return(
                                <div className="defs">
                                    {/* <h3>{definition.english_definitions.join(', ')}</h3>     */}
                                    <h3>{index+1}: {definition.english_definitions.join(', ')}</h3>    
                                </div>
                            )

                        })}</h3>
                    </div>
                )

            })
            }


        </div>
    );

}

export default Dictionary;