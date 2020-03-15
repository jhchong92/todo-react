import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@material-ui/lab"
import { Container, Typography, Grid, TextField, Button, Link } from "@material-ui/core";
import axios from 'axios'
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Session from '../Session/session';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing(3)
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  }
}))

export default function SignUp() {
  const history = useHistory()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    // call api
    Auth.signUp(email, password)
    .then((res) => {
      console.log('signup', res)
      // Session.storeCognitoUser(user)
      history.push('/login')
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
      setError(error.message)
    })
  }
  
  const isInputValid = () => {
    return email !== '' && password.length >= 6
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              /> 
            </Grid> */}
            <Grid item sm={12} xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
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
                onChange={e => setPassword(e.target.value)}
                autoFocus
              /> 
            </Grid>
              { error !== '' &&
                <Grid item sm={12}>
                  <Alert onClose={() => setError('')} severity="error">{error}</Alert>
                </Grid>
              }
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isInputValid()}
            >
              Sign Up
          </Button>
          <Link href="/login" variant="body2" >
            {"Already have an account?"}
          </Link>
        </form>
      </div>
    </Container>
  );
}