import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import ChatRoom from './ChatRoom';

class App extends Component {
  state = {
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li class="nav-item active">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Create">Create</Link>
              </li>
              <li className="nav-item">
                <Link to="/Room">Room</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <Route path="/Create" component={CreateRoom}/>
          <Route path="/Room" component={ChatRoom}/>
        </div>
      </div>
    );
  }
}

export default App;
