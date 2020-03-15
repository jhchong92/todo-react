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

}

export default ToDoApi