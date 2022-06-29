import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers } = config
  // 实例化 XMLHttpRequest 对象 发送请求 传递参数
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 处理 headers
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
