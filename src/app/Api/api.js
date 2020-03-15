import axios from 'axios'
import Session from '../Session/session'

const API_URL = 'https://desj0yh5gi.execute-api.ap-southeast-1.amazonaws.com/dev'
const ToDoApi = {
  fetchTodos: () => {
    return axios.get(`${API_URL}/todos`, {
      headers: {
        'Authorization': Session.get().idToken
      }
    }).then(res => res.data.todos)
  },
  submitTodo: (taskName) => {
    return axios.post(`${API_URL}/todos`, {
        taskName 
      }, {
      headers: {
        'Authorization': Session.get().idToken
      }
    }).then(res => res.data.data)
  },
  updateTodoStatus: (todoId, status) => {
    return axios.put(`${API_URL}/todos/${todoId}/status/${status}`, {}, {
      headers: {
        'Authorization': Session.get().idToken
      }
    }).then(res => res.data.data)
  },
  clearCompleted: () => {
    return axios.post(`${API_URL}/todos/clear-completed`, {}, {
      headers: {
        'Authorization': Session.get().idToken
      }
    }).then(res => res.data.data)
  }
}

export default ToDoApi