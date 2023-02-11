import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['hello'] = '123'

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '123'
//   }
// }).then(res => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [
//     function(data) {
//       // return qs.stringify(data)
//       return data
//     },
//     ...axios.defaults.transformRequest
//   ],
//   transformResponse: [
//     ...axios.defaults.transformResponse,
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then(res => {
//   console.log('res.data', res.data)
// })

const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...axios.defaults.transformRequest
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
