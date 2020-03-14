import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import SignUp from './app/Auth/SignUp';
import LogIn from './app/Auth/LogIn';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/register" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
