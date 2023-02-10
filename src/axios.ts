import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig) {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
