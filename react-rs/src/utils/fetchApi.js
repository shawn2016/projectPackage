/**
 * name: fetchApi.js
 * author: songyaqi
 * date: 2017/07/20
 * desc:
 */
import React from 'react'
import fetch from 'isomorphic-fetch'
import URI from 'urijs'
import md5 from 'md5'
import PopUp from 'react-robotUI/PopUp'
import Dialog from 'react-robotUI/dialog'
import { APISUCCESS, APIFAIL } from 'reduxes/constants'
import cookieStorage from 'utils/cookieStorage'
import { isObject, Ukey } from './utils'
import config from '../config'
const ukeyUrl = [
  '/login',
  '/activate/updateUserInfo',
  '/curruser/modifyUkeyPwd',
  '/payment/single/saveOrder',
  '/payment/single/revokeOrder',
  '/payment/single/approveOrder',
  '/payment/batch/saveOrder',
  '/payment/batch/revokeOrder',
  '/payment/batch/approveOrder',
  '/payment/agency/saveOrder',
  '/payment/agency/revokeOrder',
  '/payment/agency/approveOrder'
]
const DEFAULT_OPTION = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  // mode: 'no-cors',
  credentials: 'include',
  body: {}
}
/**
 * 获取默认的 header 配置
 * @returns {DEFAULT_OPTION.headers|{Accept, Content-Type}}
 */
export const HEADERS = DEFAULT_OPTION.headers


export function converUrl(url = 'https://www.baidu.com') {
  if (Object.prototype.toString.call(url) !== '[object String]') {
    return ''
  }
  return url
}

export function bodyParse(body, dataType = 'json') {
  if (Object.prototype.toString.call(body) !== '[object Object]') {
    return ''
  }
  if (dataType === 'json') {
    return JSON.stringify(body)
  }
  return Object.keys(body).map(key => {
    let value = body[key]
    value = JSON.stringify(value)
    value = encodeURIComponent(value)
    return `${key}=${value}`
  }).join('&')
}

/**
 * fetch请求
 * @param url 目标URL
 * @param option fetch 参数
 * @param [dataType] 获取数据类型目前只提供 json 和 text, 默认是 json
 * @returns {Promise}
 */
export function fetchApi(url, option = {}, dataType = 'json') {
  let rawOption = option || {}

  const realOption = Object.assign(
    DEFAULT_OPTION,
    option
  )

  let x
  if (realOption.body && realOption.body.body) {
    for (x in realOption.body.body) {
      if (realOption.body.body[x] === '') realOption.body.body[x] = null
    }
  }

  if (realOption.method === 'POST') {
    realOption.body = bodyParse(realOption.body)
  }

  rawOption.headers = Object.assign(
    DEFAULT_OPTION.headers,
    option.headers
  )

  return new Promise(async (reslove, reject) => {
    // 捕获 async await 的异常
    try {
      // let _url = url.indexOf('.json') === -1 ? `/mockjs/53${url}` : url
      let _url = url.startsWith('/') ? `${url}` : `/${url}`
      let _environment = location.host.split('.')[0]
      let realUrl = ''
      switch (_environment) {
        case 'business':
          realUrl = config.online + converUrl(_url)
          break
        case 'cswallet':
          realUrl = config.test + converUrl(_url)
          break
        case 'test2business':
          realUrl = config.test2 + converUrl(_url)
          break
        default:
          realUrl = config.dev + converUrl(_url)
      }
      if (url.indexOf('.json') > 0) {
        realUrl = url
      }
      // goole "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36"
      // firefox "5.0 (Windows)"
      // ie "5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Tablet PC 2.0; rv:11.0) like Gecko"
      // IE9 单独做处理------------------
      let browser = navigator.appName
      let b_version = navigator.appVersion
      let version = b_version.split(';')
      if (version[1]) {
        let trim_Version = version[1].replace(/[ ]/g, '')
        if (browser === 'Microsoft Internet Explorer' && trim_Version === 'MSIE9.0') {
          // jQuery.support.cors = true
          // jQuery.ajax({
          //   url: realUrl,
          //   type: 'POST',
          //   ContentType: 'text/plain',
          //   dataType: 'json',
          //   data: realOption.body
          // })
          // let xdr = new XDomainRequest()
          // xdr.onerror = (err) => {
          //   console.log(`请求失败，原因是${err}`)
          //   return err
          // }
          // xdr.ontimeout = () => {
          //   alert('请求超时，请重新刷新请求数据')
          // }
          // xdr.onprogress = () => {
          //   reslove(JSON.parse(xdr.responseText))
          // }
          // xdr.contentType = 'text/plain'
          // xdr.open('POST', realUrl)
          // // let param = encodeURI(JSON.stringify(realOption.body))
          // let param = JSON.stringify(realOption.body)
          // xdr.send(param)
        } else {
          const res = await fetch(realUrl, realOption)
          if (res.ok) {
            if (dataType.toUpperCase() === 'TEXT') {
              const text = await res.text()
              reslove(text)
            } else if (dataType.toUpperCase() === 'JSON') {
              const json = await res.json()
              reslove(json)
            } else if (dataType.toUpperCase() === 'BLOB') {
              const blob = await res.blob()
              reslove(blob)
            }
          } else {
            reject(res)
          }
        }
      } else {
        const res = await fetch(realUrl, realOption)
        if (res.ok) {
          if (dataType.toUpperCase() === 'TEXT') {
            const text = await res.text()
            reslove(text)
          } else if (dataType.toUpperCase() === 'JSON') {
            const json = await res.json()
            reslove(json)
          } else if (dataType.toUpperCase() === 'BLOB') {
            const blob = await res.blob()
            reslove(blob)
          }
        } else {
          reject(res)
        }
      }
    } catch (err) {
      reject(err)
    }
  })
}

const callApi = (apiConfig) => {
  // 单点登录
  let pathnameHref = window.location.pathname.split('/')
  if (pathnameHref[1] !== 'otherInfo' && sessionStorage.getItem('userInfoToken')) {
    if (sessionStorage.getItem('userInfoToken') !== cookieStorage.getCookie('userInfo').token) {
      sessionStorage.clear()
      let abc = new PopUp(
        <Dialog
          open
          content="由于您已长时间未登录，或在其他浏览器上登录，请重新登录"
          actions={[{
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle'
          }]}
          onRequestClose={() => {
            abc.close()
            window.location.pathname = '/login'
          }}
          actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
        />
      )
      abc.show()
      return false
    }
  }
  const { path, param, method, saveAs, query, dataType, ...rest } = apiConfig
  for (let i in param) {
    if (param[i] === '' || param[i] === null || param[i] === undefined) {
      delete param[i]
    }
  }
  // let _path = path.startsWith('/') ? `/wwa${path}` : `/wwa/${path}`
  let url = new URI(path),
    signString = '',
    _userToken = '',
    reqBody = {
      body: param,
      deviceType: '',
      sign: '',
      token: '',
      version: ''
    }
  if (param === undefined) {
    delete reqBody.body
  }
  if (typeof param === 'object' && Object.keys(reqBody.body).length === 0) {
    delete reqBody.body
  }
  if (isObject(query) && query) {
    Object.keys(query).forEach((key) => {
      let item = query[key]
      if (typeof item === 'object') {
        url.addQuery(key, JSON.stringify(query[key]))
        return
      }
      url.addQuery(key, query[key])
    })
  }
  if (isObject(param) && param) {
    Object.keys(param).sort().forEach((key) => {
      let value = param[key]
      if (value === 0 || (value && typeof value !== 'object')) {
        signString += `${key}=${value}&`
      }
    })
    signString = signString.substr(0, signString.length - 1)
  }
  if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
    let _token = cookieStorage.getCookie('userInfo').token
    _userToken = '336edd5b0d12460cab88e0b79c350983'
    if (_token) _userToken = _token
    signString += `&key=${_token}`
  } else {
    signString += '&key='
  }
  console.log('signString连接串', signString)
  let _sign = md5(signString)
  console.log('sign签名====================', _sign)
  Object.assign(reqBody, { sign: _sign }, { token: _userToken || '' })
  ukeyUrl.forEach((item) => {
    if (path === item) {
      try {
        let ukey = new Ukey()
        let source = +new Date() // 原文
        let signedData = ukey.getCiphertextByOriginal(source).data // 生成的密文
        let certInfo = ukey.getSelectCertInfo() // 获取证书信息
        let _uKeyVerify = {}
        _uKeyVerify.serialNo = certInfo.data // 序列号
        _uKeyVerify.source = source          // 原文
        _uKeyVerify.signedData = signedData  // 密文
        Object.assign(reqBody, { uKeyVerify: _uKeyVerify })
      } catch (e) {
        console.log('为识别到ukey信息，可能未插入ukey或浏览器不支持')
      }
    }
  })
  return fetchApi(url.toString(), {
    body: reqBody,
    method
  }, dataType).then(res => {
    // let type = apiConfig.type || APISUCCESS, data = { ...res, [rest[0].type]: { ...res }, name: rest[0].type }
    let type = apiConfig.type || APISUCCESS, data = res
    console.log(rest)
    return { type, data, saveAs, ...rest }
  }, err => {
    console.log(err)
    let msg = err.statusText || err.message
    return { type: apiConfig.type || APIFAIL, data: { resMsg: msg, respCode: '500', body: {}, ...rest } }
  })
}
export default callApi