import axios from 'axios'

//创建axios的实例，给实例添加默认的配置参数
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 5000
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      resolve(res.data)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => { 
    instance.get(url, {params}).then((res) => {
      resolve(res.data)
    }).catch((err)=>{
      reject(err)
    })
  })
}