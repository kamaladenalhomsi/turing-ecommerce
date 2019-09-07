import axios from 'axios'
export default axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    'user-key': localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*'
  }
})
