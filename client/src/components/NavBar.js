import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Duke It Out</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link class="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link class="nav-link" to="/create">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link class="nav-link" to="/room">Room</Link>
                    </li>
                </ul>
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSignIn">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link class="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link class="nav-link" to="/signup">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default NavBar;