import axios from 'axios'

axios.defaults.baseURL = 'https://api.yuanfanglai.top'
const auth = localStorage.getItem('auth')
if (auth) {
  axios.defaults.headers.common['Authorization'] = auth
}
else {
  axios.defaults.headers.common['Authorization'] = null
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
async function GET (url) {
  try {
    const res = await axios.get(url)
    return res
  }
  catch (error) {
    return error
  }
}
async function POST (url, params) {
  try {
    const res = await axios.post(url, {...params})
    return res
  }
  catch (error) {
    return error
  }
}
async function DELETE (url, params) {
  try {
    const res = await axios.delete(url, params)
    return res
  }
  catch (error) {
    return error
  }
}
export {
  GET,
  POST,
  DELETE
}
