import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.all = function(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function warp(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
