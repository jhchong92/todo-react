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
  },
}))

export default function LogIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
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