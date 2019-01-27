import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./containers/App";
import CreateRoom from './containers/CreateRoom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<CreateRoom />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
