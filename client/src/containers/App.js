import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import './App.css';

import CreateRoom from '../components/CreateRoom';
import ChatRoom from './ChatRoom';
import NavBar from "../components/NavBar";
import Login from "../components/Login";
import Signup from "../components/Signup";

class App extends Component {

  componentDidMount() {
    try {
      const token = Cookies.get('token');
      const decodedToken = JwtDecode(token);
      this.props.onReceiveUserData(decodedToken);
    } catch (err) {
      console.log("user not signed in");
    }
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

const mapDispatchToProps = dispatch => {
  return {
    onGuestAccess: () => dispatch ({
      type: 'GUEST_ACCESS'
    }),
    onReceiveUserData: (decodedToken) => dispatch ({
      type: 'ADD_USER_DATA',
      userInfo: {
        id: decodedToken.id,
        email: decodedToken.email,
        username: decodedToken.username
      }})
  }
};

export default connect(null, mapDispatchToProps)(App);
