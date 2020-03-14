import React from 'react'
import { Container, Input, makeStyles, TextField, InputAdornment, Icon } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  todoInput: {
    fontSize: '30px'
  }
}))

export default function ToDo() {
  const classes = useStyles()
  return (
    <Container maxWidth='sm' >
      <div className={classes.paper}>
        
        <Input 
          className={classes.todoInput}
          fullWidth
          placeholder="What is your task?"
          endAdornment={
            <InputAdornment position="end">
              <Icon>star</Icon>
            </InputAdornment>
          }
          />

      </div>
    </Container>
  )
}