import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

http.interceptors.request.use(req => {
  const token = window.localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = 'Bearer ' + token
  }

  return req
})

http.interceptors.response.use(res => {
  if (res.data.code !== 200) {
    return Promise.reject(res.data.msg)
  }
  return Promise.resolve(res.data)
}, err => {
  console.log(JSON.stringify(err));
  return '请求失败'
})

export default http