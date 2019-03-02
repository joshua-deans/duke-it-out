import React, { Component } from 'react';
import { Route , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import './App.css';

import BrowseRoom from '../components/BrowseRoom';
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
      console.log("User not signed in");
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.props.loginStatus} userInfo={this.props.userInfo} />
        <Route exact path="/" component={BrowseRoom}/>
        <Route path="/create" component={CreateRoom}/>
        <Route path="/room" component={ChatRoom}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.isloggedIn,
    userInfo: state.userInfo
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onReceiveUserData: (decodedToken) => dispatch ({
      type: 'ADD_USER_DATA',
      data: {
        userInfo: {
          id: decodedToken.id,
          email: decodedToken.email,
          username: decodedToken.username,
        },
        isloggedIn: true
      }
    })
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
