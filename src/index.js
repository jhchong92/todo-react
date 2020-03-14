import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import SignUp from './app/Auth/SignUp';
import LogIn from './app/Auth/LogIn';
import Amplify, { Auth } from "aws-amplify";
import ToDo from './app/ToDo/ToDo';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/register" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/todo" component={ToDo}/>
    </div>
  </Router>
)

// setup aws amplify
Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-1_d1Ij3mS1Z',
    region: 'ap-southeast-1',
    userPoolWebClientId: 'hm0g43kqv12ugpp5a5de2uk6p',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'https://todo-react.auth.ap-southeast-1.amazoncognito.com',
      scope: ['email', 'openid'],
      redirectSignIn: 'http://localhost:3001/home',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
  }
})

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
