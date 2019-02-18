import React from 'react';
import {Link} from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Duke It Out</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/room">Room</Link>
                    </li>
                </ul>
                {props.isLoggedIn ? 
                  <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Logout</Link>
                    </li>
                  </ul> 
                  :
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/signup">Signup</Link>
                      </li>
                  </ul>
                }
            </div>
        </nav>
    )
};

export default NavBar;