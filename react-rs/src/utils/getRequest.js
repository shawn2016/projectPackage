import React from 'react'
import utils from 'utils'
import PopUp from 'react-robotUI/PopUp'
import Dialog from 'react-robotUI/dialog'
import cookieStorage from 'utils/cookieStorage'
import QBLoading from 'components/QBLoading'
let count = 0, // eslint-disable-line
  count2 = 0,
  isShow = false, // 是否显示loading
  popUp, // 实例化后的弹窗
  errMsgList = [],
  isJumpToLogin = false
let initDialog = (errMsg) => {
  let obj = new PopUp(<Dialog
    open
    content={errMsg || '连接服务器失败，请稍后重试'}
    actions={[{
      label: '确定',
      className: 'rob-btn rob-btn-danger rob-btn-circle'
    }]}
    onRequestClose={() => {
      console.log(count2)
      obj.close()
      if (!isJumpToLogin) return
      sessionStorage.removeItem('hisPath')
      cookieStorage.removeCookie('userInfo')
      window.location.pathname = '/login'
      isJumpToLogin = false
    }}
    actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
  />)
  return obj
}
const handleChangeLoading = () => { // 处理显示的loading
  if (count) {
    if (isShow) return
    // TODO: 显示弹窗
    isShow = !isShow
    popUp = new PopUp(<QBLoading showLoading />)
    popUp.show()
    return
  }
  if (!isShow) {
    return
  }
  // TODO: 隐藏弹窗
  popUp.close()
  if (errMsgList.length > 0) {
    let obj = initDialog(errMsgList[0])
    obj.show()
    errMsgList = []
    // timeOut = setTimeout(() => {
    //   obj.close()
    //   if (!isJumpToLogin) return
    //   sessionStorage.removeItem('hisPath')
    //   cookieStorage.removeCookie('userInfo')
    //   window.location.pathname = '/login'
    //   isJumpToLogin = false
    // }, 3000)
  }
  isShow = !isShow
}

const handDialog = (msg) => {
  errMsgList.push(msg)
}

export default (obj) => {
  const { isHideLoading = false } = obj
  count++
  if (!isHideLoading) handleChangeLoading()
  return utils.callApi(obj).then(
    res => {
      console.log(res)
      switch (res.data.respCode) {
        case '000000': break
        case '900005':
          count2++
          isJumpToLogin = true
          handDialog('由于您已长时间未登录，或在其他浏览器上登录，请重新登录')
          break
        case '500000':
        case '500002':
        case '500001':
        case '500010':
        case '500006':
        case '500007':
        case '500008':
        case '500005':
        case '500003':
        case '500011':
        case '500012':
        case '500013':
        case '500014':
        case '900006':
        case '900007':
        case '900012':
        case '900013':
        case '900014':
          count2++
          break
        default:
          handDialog(res.data.respMsg)
          break
      }
      // switch (res.data.respCode) {
      //   case '000000': break
      //   case '900000':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900001':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900002':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900003':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900004':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900005':
      //     count2++
      //     isJumpToLogin = true
      //     handDialog('由于您已长时间未登录，或在其他浏览器上登录，请重新登录')
      //     break
      //   case '900006':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900007':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900008':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900009':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '900010':
      //     count2++
      //     handDialog('请插入UKey，并使用支持UKey的IE浏览器！')
      //     break
      //   case '900011':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   case '999999':
      //     count2++
      //     handDialog(res.data.respMsg)
      //     break
      //   default: break
      // }
      count--
      handleChangeLoading()
      return res
    },
    err => {
      console.log(err)
      count--
      handleChangeLoading()
    }
  ).catch(err => {
    console.log(err)
    count--
    handleChangeLoading()
  })
}
