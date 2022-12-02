import React from 'react';
import './App.css';
import 'normalize.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';

function App() {
 return(
  <div className='App'>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />}></Route>
        <Route path = "/register" element = {<Registration />}></Route>
        <Route path = "/projects" element = {<Projects />}></Route>
        <Route path = "/createProject" element = {<CreateProject />}></Route>
      </Routes>
      
    </Router>
  </div>
 );
}

export default App;
