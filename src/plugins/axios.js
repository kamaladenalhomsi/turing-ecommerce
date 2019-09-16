import axios from 'axios'
export default axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    'user-key': localStorage.getItem('token'),
    'stripe-signature': 'whsec_SxsCTdtkm6xHwyuOQgSyTBg0vYci8Qbj',
    'Access-Control-Allow-Origin': '*'
  }
})
