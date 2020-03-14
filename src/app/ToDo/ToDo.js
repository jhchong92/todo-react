import React, {useState} from 'react'
import { Container, Input, makeStyles, TextField, InputAdornment, Icon, IconButton, Divider, Grid, Typography, Box, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction, Paper, Chip, Button, Link, AppBar, Toolbar } from '@material-ui/core'

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
  listRoot: {
    width: '100%'
  },
  todoListText: {
    fontSize: '22px'
  },
  listItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  completedTask: {
    textDecoration: 'line-through',
    textColor: 'red'
  },
  filterStatusRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1)
    },
    marginTop: theme.spacing(2)
  },
  chip: {
    minWidth: '50px'
  },
  root: {
    flexGrow: 1
  },
  appBarTitle: {
    flexGrow: 1
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
  const [hoverId, setHoverId] = useState(0)
  const classes = useStyles()
  
  const filterStatuses = () => {
    return [
      {
        status: 0,
        label: 'All',
      },
      {
        status: 2,
        label: 'Completed',
      },
      {
        status: 3,
        label: 'Deleted',
      }
    ]
  }
  const getPendingItemsHint = (count) => {
    if (count === 1) {
      return '1 item left'
    }else if (count > 1) {
      return `${count} items left`
    }
    return ''
  }
  function handleToggle(id) {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        item.status = item.status === 1 ? 2 : 1
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

  function handleFilterStatusClick(status) {
    setFilterStatus(status)
  }

  function clearCompleted() {
    setTodoList(todoList.filter((item) => item.status !== 2)) 
  }

  const pendingCount = todoList.filter((item) => item.status === 1).length

  const finalList = filterStatus === 0 ? todoList : todoList.filter((item) => item.status === filterStatus)

  return (
    <div > 
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.appBarTitle}>To Do ReactJS</Typography>
            <Button color="inherit">Log Out</Button>
          </Toolbar>
        </AppBar>

      </div>
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
            {
              todoList.length > 0 &&
              <div style={{ width: '100%' }}>
                <Container>
                  <Box p={1} m={1} display="flex">
                    <Box flexGrow={1}>{pendingCount > 0 ?  getPendingItemsHint(pendingCount) : ''}</Box>
                      
                        <Box>
                          {
                            todoList.filter((item) => item.status === 2).length > 0 && (
                              <Link component="button" color="secondary" onClick={clearCompleted}>Clear completed</Link>
                            )
                          } 
                        </Box>
                  </Box>

                  <Paper className={classes.listRoot} elevation={1}>
                    
                    <List 
                      onMouseLeave={() => setHoverId(0)}>
                      {
                        finalList.map((item, index) => {
                          const labelId = `label-${item.id}`
                          return (
                            <ListItem key={item.id} button 
                              divider={index !== todoList.length -1}
                              onMouseEnter={() => setHoverId(item.id)}
                              
                              onClick={() => handleToggle(item.id)}>
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
                                <Typography color={item.status === 2 ? 'textSecondary' : 'textPrimary'} className={item.status === 2 ? classes.completedTask : '' } variant="h5">{item.name}</Typography>
                              } />
                              {
                                hoverId === item.id && (
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments"
                                      onClick={() => handleDelete(item.id)}>
                                      <Icon>delete</Icon>
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                )
                              }
                            
                            </ListItem>
                            
                          );
                        })
                      }
                    </List>
                  </Paper>
                </Container>
                <div className={classes.filterStatusRoot}>
                    {
                      filterStatuses().map(item => {
                        return (
                          <Chip 
                            key={item.status}
                            className={classes.chip} 
                            color={filterStatus === item.status ? 'primary' : 'default'} 
                            label={item.label} 
                            onClick={() => handleFilterStatusClick(item.status)}/>
                        )
                      })
                    }
                </div>
              </div>
            }
        </div>
      </Container>
    </div>
  )
}