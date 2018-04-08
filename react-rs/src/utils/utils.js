export LocalStorage from './localStroage'
export * from './emptyFunc' // eslint-disable-line
export * from './ukey' // eslint-disable-line

export const queryToString = (json) => {
  let keys = Object.keys(json)
  let arr = []
  keys.forEach(item => {
    arr.push(`${item}=${JSON.stringify(json[item])}`)
  })
  return arr.join('&')
}
export const isObject = (obj) => Object.prototype.toString(obj) === '[object Object]' // 判断一个值是否是一个对象
export const isString = (str) => Object.prototype.toString(str) === '[object String]' // 判断一个值是否是一个字符串

/**
 * reducer创建工厂
 * @param  {[type]} type          [action匹配的type]
 * @param  {[type]} defaultState) [默认的状态]
 * @return {[type]}               [返回❤新的reducer]
 */
export const reducerFactory = (type, defaultState) => (state, action = { data: {} }) => {
  switch (action.type) {
    case type:
      if (action.data.body === undefined) {
        return state || defaultState
      }
      return action.data.body
    default:
      return state || defaultState
  }
}

/**
 * action创建工厂
 * @param  {[type]} type   [action匹配的type]
 * @param  {[type]} method [请求方式]
 * @param  {[type]} path)  [请求的路径]
 * @return {[type]}        [返回一个新的actionCreator]
 */
/*export const actionFactory = (type, method, path, isHideLoading) => (param, query, ...rest) => {
  console.log(...rest)
  return {
    callApi: {
      path,
      method,
      type,
      param,
      query,
      isHideLoading,
      ...rest
    }
  }
}*/
export const actionFactory = (type, method, path, isHideLoading, dataType) => (param, query, ...rest) => ({
  callApi: {
    path,
    method,
    type,
    param,
    query,
    dataType,
    isHideLoading,
    ...rest
  }
})
export const actionFactory2 = (type, method, path, isHideLoading) => (param, query, saveAs, ...rest) => {
  console.log(...rest)
  return {
    callApi: {
      path,
      method,
      type,
      param,
      query,
      saveAs,
      isHideLoading,
      ...rest
    }
  }
}

/**
 * reducer创建工厂
 * @param  {[type]} type          [action匹配的type]
 * @param  {[type]} defaultState) [默认的状态]
 * @return {[type]}               [返回❤新的reducer]
 */
export const reducerFactory1 = (type, defaultState) => (state, action = { data: {} }) => {
  switch (action.type) {
    case type:
      if (action.data === undefined) {
        return state || defaultState
      }
      return { ...action.data }
    default:
      return state || defaultState
  }
}
export const reducerFactory2 = (type, defaultState) => (state, action = { data: {} }) => {
  switch (action.type) {
    case type:
      if (action.data === undefined) {
        return state || defaultState
      }
      return { ...action.data, name: action.saveAs.type, [action.saveAs.type]: action.data }
    default:
      return state || defaultState
  }
}
/**
 * 将一个字符串转换为16进制
 */
export const strToHexCharCode = (str) => {
  if (str === '') return ''
  let hexCharCode = []
  // hexCharCode.push('0x');
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16))
  }
  return hexCharCode.join('')
}

/**
 * 将16进制串转换为10进制
 * @param  {[type]} hexCharCodeStr [description]
 * @return {[type]}                [description]
 */
export const hexCharCodeToStr = (hexCharCodeStr) => {
  let trimedStr = hexCharCodeStr.trim()
  let rawStr = trimedStr
  // let rawStr =trimedStr.substr(0,2).toLowerCase() === "0x"?trimedStr.substr(2):trimedStr
  let len = rawStr.length
  if (len % 2 !== 0) {
    alert('Illegal Format ASCII Code!')
    return ''
  }
  let curCharCode
  let resultStr = []
  for (let i = 0; i < len; i += 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16) // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode))
  }
  return resultStr.join('')
}