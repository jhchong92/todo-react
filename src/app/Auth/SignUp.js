import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, TextField, Button, Link } from "@material-ui/core";
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
  function handleSubmit(event) {
    event.preventDefault()
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
            <Grid item sm={12}>
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
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
              /> 
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
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