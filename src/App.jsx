import React, { Component } from 'react';
import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Landing from './components/Landing'
import Login from './components/Login'
import StudyRoom from './components/StudyRoom'
import Lesson from './components/Lesson'
import LessonBrief from './components/LessonBrief'



class App extends Component {
  render() {
    return (
      <div>
  <Router>
      {/* TESTING AND DEBUGGING LINKS - DELETE THESE */}
      <Link to="/">HOME</Link> |
      <Link to="/login">LOGIN</Link> |
      {/* <Link to={`/lang/${lang}`}>lang</Link> |  */}
      {/* GET GLOBAL STATE <-- look into context api */}
      
      
      <Routes>
        <Route path="/" element={ <Landing/> } />
        <Route path="/login" element={ <Login/> } />
        <Route exact path="/learn/:lang" element={ <StudyRoom/> } />
        <Route exact path="/learn/:lang/:lesson/" element={ <Lesson/> } />
        <Route exact path="/learn/:lang/:lesson/brief" element={ <LessonBrief/> } />
      </Routes>

  </Router>

      </div>
    );
  }
}

export default App;