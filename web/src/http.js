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
  switch(res.data.code) {
    case 200:
      return Promise.resolve(res.data)
    case 999:
      window.localStorage.removeItem('token')
      window.location.reload()
      return Promise.reject(res.data.msg)
    default:
      return Promise.reject(res.data.msg)
  }
}, err => {
  console.log(JSON.stringify(err));
  return '请求失败'
})

export default http