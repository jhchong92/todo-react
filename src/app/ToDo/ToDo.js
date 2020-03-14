import React, {useState} from 'react'
import { Container, Input, makeStyles, TextField, InputAdornment, Icon, IconButton, Divider, Grid, Typography, Box, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  todoInput: {
    fontSize: '30px',
    marginBottom: theme.spacing(4)
  },
  todoList: {
    width: '100%'
  },
  todoListText: {
    fontSize: '22px'
  }
}))

export default function ToDo() {
  const todo = {
    id: 1,
    name: 'Do This',
    status: 1
  }
  const [taskName, setTaskName] = useState('')
  const [todoList, setTodoList] = useState([todo])
  const [filterStatus, setFilterStatus] = useState(0)
  const classes = useStyles()
  
  function handleComplete(id) {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        item.status = 2
      }
      return item
    })
    setTodoList(newList)
  }

  function handleKeyDown(event) {
    if (event.which === 13) { // enter pressed
      console.log('enter pressed')
      // add a todo
      addTask()
    }else if (event.which === 27) { // escape pressed
      setTaskName('')
    }
  }

  function handleDelete(id) {
    const list = todoList.filter((item) => item.id !== id)
    setTodoList(list)
  }

  function addTask() {
    if (taskName === '') {
      return
    }
    const timestamp = (new Date()).getTime();
    setTodoList([
      ...todoList,
      {
        id: timestamp,
        name: taskName,
        status: 1
      }
    ])
    setTaskName('')
  }
  
  const finalList = filterStatus === 0 ? todoList : todoList.filter((item) => item.status === filterStatus)

  return (
    <Container maxWidth='sm' >
      <div className={classes.paper}>
        
        <Input 
          className={classes.todoInput}
          fullWidth
          placeholder="What is your task?"
          endAdornment={
            taskName !== '' && 
            <InputAdornment position="end">
              <IconButton fontSize="large"
                onClick={() => addTask()}
              ><Icon>label</Icon></IconButton>
            </InputAdornment>
          }
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          />
          <div style={{ width: '100%' }}>
            <Box p={1} m={1} display="flex">
              <Box flexGrow={1}>3 items left</Box>
              <Box >Clear completed</Box>
            </Box>
          </div>
          <List className={classes.todoList}>
            {
              finalList.map(item => {
                const labelId = `label-${item.id}`
                return (
                  <ListItem key={item.id} role={undefined} dense button onClick={() => handleComplete(item.id)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={item.status === 2}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId}}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} className={classes.todoListText} primary={
                      <Typography variant="h5">{item.name}</Typography>
                    } />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments"
                        onClick={() => handleDelete(item.id)}>
                        <Icon>delete</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            }
          </List>
      </div>
    </Container>
  )
}