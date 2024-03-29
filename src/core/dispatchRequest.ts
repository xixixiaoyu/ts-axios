import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import buildURL, { combineURL, isAbsoluteURL } from '../helpers/url'
import xhr from './xhr'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    err => {
      if (err && err.response) {
        err.response = transformResponseData(err.response)
      }
      return Promise.reject(err)
    }
  )
}

// 请求发送前处理 config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理 url 格式
export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

// 响应结果的处理
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default axios
