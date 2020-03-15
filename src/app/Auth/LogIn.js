import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, TextField, Button, Link } from "@material-ui/core";
import axios from 'axios'
import { Auth } from 'aws-amplify';
import Session from '../Session/session';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
}))

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    Auth.signIn(email, password)
    .then((user) => {
      Session.storeCognitoUser(user)
      history.push('/todo')
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
    })
    
    // axios.get('https://todo-react.auth.ap-southeast-1.amazoncognito.com/login', {
    //   params: {
    //     response_type: 'code',
    //     client_id: '5f4ucadabnvtvvkn72arpooi7a',
    //     redirect_uri: 'http://localhost:3001/home'
    //   }
    // })
    // .then((response) => {
    //   console.log(response)
    // })
  }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              /> 
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              /> 
            </Grid>
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
              Log In
          </Button>
          <Link href="/register" variant="body2" >
            {"Don't have an account?"}
          </Link>
        </form>
      </div>
    </Container>
  );
}