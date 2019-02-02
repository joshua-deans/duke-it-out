import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import ChatRoom from './ChatRoom';
import NavBar from "../components/NavBar";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  state = {
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div>
          <Route path="/create" component={CreateRoom}/>
          <Route path="/room" component={ChatRoom}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </div>
      </div>
    );
  }
}

export default App;
