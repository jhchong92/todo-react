import React, {useState, useEffect} from 'react'
import { Container, Input, makeStyles, TextField, InputAdornment, Icon, IconButton, Divider, Grid, Typography, Box, List, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction, Paper, Chip, Button, Link, AppBar, Toolbar } from '@material-ui/core'
import Session from '../Session/session'
import ToDoApi from '../Api/api'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()
  const [taskName, setTaskName] = useState('')
  const [todoList, setTodoList] = useState([])
  const [filterStatus, setFilterStatus] = useState(0)
  const [hoverId, setHoverId] = useState(0)
  const classes = useStyles()
  
  // console.log('initial', todoList)
  // load once
  useEffect(() => {
    console.log(Session.get())
    ToDoApi.fetchTodos().then((res) => {
      console.log('fetch todos', res)
      setTodoList(res)
    })
  }, [])
  const filterStatuses = () => {
    return [
      {
        status: 0,
        label: 'All',
      },
      {
        status: 1,
        label: 'Active',
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
    console.log('handleToggle', id)
    const index = todoList.findIndex((item) => item.id === id)
    console.log('toggledIndex', index)

    const todo = todoList[index]
    const toggleStatus = todo.task_status === 1 ? 2 : 1
    ToDoApi.updateTodoStatus(id, toggleStatus)
    .then((res) => {
      todoList[index].task_status = toggleStatus
    })
    // setTodoList(todoList.splice())
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
    ToDoApi.submitTodo(taskName).then((data) => {
      setTodoList([
        ...todoList,
        data
      ])
      console.log('submit todo', data, todoList)
    })
    
    setTaskName('')
  }

  function handleFilterStatusClick(status) {
    setFilterStatus(status)
  }

  function clearCompleted() {
    ToDoApi.clearCompleted()
    .then((clearedItems) => {

      todoList.forEach((item) => {
        const clearedItem = clearedItems.find((clearedItem) => clearedItem.id === item.id)
        if (clearedItem) {
          item.task_status = clearedItem.task_status
        }
      })
    })
    setTodoList(todoList.filter((item) => item.task_status !== 2)) 
  }

  function logOut() {
    // need to logout from amplify as well
    Session.invalidate()
    history.replace('/login')
  }

  function getFinalList() {
    if (filterStatus === 0) {
      return todoList.filter((item) => item.task_status !== 3)
    }
    return todoList.filter((item) => item.task_status === filterStatus)
  }

  const pendingCount = todoList.filter((item) => item.task_status === 1).length

  const finalList = getFinalList()

  return (
    <div > 
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.appBarTitle}>To Do ReactJS</Typography>
            <Button color="inherit" onClick={logOut}>Log Out</Button>
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
                { finalList.length > 0 &&
                  <div style={{ width: '100%' }}>
                    <Container>
                      <Box p={1} m={1} display="flex">
                        <Box flexGrow={1}>{pendingCount > 0 ?  getPendingItemsHint(pendingCount) : ''}</Box>
                          
                            <Box>
                              {
                                todoList.filter((item) => item.task_status === 2).length > 0 && (
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
                                <ListItem 
                                  key={item.id} button 
                                  divider={index !== todoList.length -1}
                                  onMouseEnter={() => setHoverId(item.id)}
                                  
                                  onClick={() => handleToggle(item.id)}>
                                  <ListItemIcon>
                                    <Checkbox
                                      edge="start"
                                      checked={item.task_status === 2}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': labelId}}
                                    />
                                  </ListItemIcon>
                                  <ListItemText id={labelId} className={classes.todoListText} primary={
                                    <Typography color={item.task_status === 2 ? 'textSecondary' : 'textPrimary'} className={item.task_status === 2 ? classes.completedTask : '' } variant="h5">{item.task_name}</Typography>
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
                  </div>
                  
                }
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