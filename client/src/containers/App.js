import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import ChatRoom from './ChatRoom';
import NavBar from "../components/NavBar";
import Login from "./Login";
import Signup from "./Signup";

class App extends Component {
  constructor(props){
    super(props);
    this.getCredentials();
  }

  getCredentials() {
    fetch("http://localhost:5000/api/auth", {
      credentials: 'include'})
        .then(function(res) {
          return res;
        }).then(function(data) {
          console.log(data);
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
          <Route path="/create" component={CreateRoom}/>
          <Route path="/room" component={ChatRoom}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
      </div>
    );
  }
}

export default App;
