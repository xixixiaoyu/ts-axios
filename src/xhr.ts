import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null } = config
  // 实例化 XMLHttpRequest 对象 发送请求 传递参数
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
