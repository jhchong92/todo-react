import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import SignUp from './app/Auth/SignUp';
import LogIn from './app/Auth/LogIn';
import Amplify, { Auth } from "aws-amplify";
import ToDo from './app/ToDo/ToDo';
import Session from './app/Session/session';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const sessionValid = Session.isValid()
    if (!sessionValid) {
      Session.invalidate()
    }
    return (
       sessionValid
        ? <Component {...props} />
        : <Redirect to='/login' />
    )
  }} />
)

const NonGuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !Session.isValid()
      ? <Component {...props} />
      : <Redirect to='/todo' />
  )} />
)

const CatchAllRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !Session.isValid()
      ? <Redirect to='/login' />
      : <Redirect to='/todo' />
  )} />
)

const routing = (
  <Router>
    <Switch>
      <NonGuestRoute path="/register" component={SignUp}/>
      <NonGuestRoute path="/login" component={LogIn}/>
      <PrivateRoute path="/todo" component={ToDo}/>
      <CatchAllRoute exact path="*"/>
    </Switch>
  </Router>
)

// setup aws amplify
Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-1_9BmUg6y0S',
    region: 'ap-southeast-1',
    userPoolWebClientId: '1pi9r6t0nq5fre67jma335pibg',
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
