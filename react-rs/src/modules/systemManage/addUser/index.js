import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
// import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import QBTextarea from 'components/QBTextarea'
import QBSelect from 'components/QBSelect'
import Dialog from 'react-robotUI/dialog'
import cookieStorage from 'utils/cookieStorage'
// import Tab from 'react-robotUI/Tab'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getRequest from 'utils/getRequest'
import * as action from './redux/actions'
import './redux/reducer'
const YES = 'YES'
const NO = 'NO'
class addUserPage extends PureComponent {
  static propTypes = {
    isTestRule: PropTypes.bool,
    params: PropTypes.object,
  }
  static defaultProps = {
    isTestRule: false,
    params: {},
  }
  constructor(prop) {
    super(prop)
    this.state = {
      params: {},
      levelOneArr: [],
      optionalArray: [],
      d11: false,
      isCfcaUserStatus: false,
      renderData1: [{
        label: '用户姓名',
        name: 'userName',
        required: true,
        placeholder: '请输入用户姓名',
        pattern: /^.{1,58}$/,
        errorMsg: '请输入1-58个字的姓名',
        emptyMsg: '请输入用户姓名'
      }, {
        label: '手机号码',
        name: 'phonenum',
        required: true,
        placeholder: '请输入手机号码',
        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        errorMsg: '请输入正确的手机号码',
        emptyMsg: '请输入手机号码'
      }, {
        label: '邮箱地址',
        name: 'email',
        required: false,
        placeholder: '请输入邮箱地址',
        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        errorMsg: '请输入正确的邮箱地址',
        emptyMsg: '请输入邮箱地址'
      }, {
        label: '身份证号',
        name: 'identifyNo',
        required: true,
        placeholder: '请输入身份证号',
        emptyMsg: '请输入身份证号',
        errorMsg: '请输入18位数字或字母身份证号码',
        pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      }],
    }
    this.selectes = [
      { value: '出纳', text: '出纳' },
      { value: '会计', text: '会计' },
      { value: '经理', text: '经理' },
      { value: '总监', text: '总监' },
      { value: '其他', text: '其他' }
    ]
    this.inputs = {}
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
  }
  // 弹窗
  handleOpen = (type, msg, status) => {
    this.setState({
      contentDom: msg
    }, function () {
      this.dialogShow[type](status)
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ [type]: false })
    if (name === 'save') {
      this.context.router.history.push('/systemManage/userManage')
    }
  }
  dialogShow = {
    d11: (status) => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: status
      }])
    }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object,
    })
  }
  /**
   * 跳转到登陆
  */
  componentDidMount() {
    // if (this.props.params.id !== null) {
    //   // this.userName.setValue('test')
    //   this.props.getData()
    // } else {
    // }
    if (this.props.params && this.props.params.id && this.props.params.checkType) {
      this.props.getUserInfo2({ checkType: this.props.params.checkType, id: this.props.params.id })
    } else {
      this.props.getUserCodeFunc().then((res) => {
        if (res.data.respCode === '000000') {
          this.setState({
            params: { ...this.state.params, userCode: res.data.body.userCode }
          })
        }
      })
    }
  }
  componentWillMount() {
    if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
      let isCfcaUserType = cookieStorage.getCookie('userInfo')
      if (isCfcaUserType.isCfcaUser === '1') {
        this.setState({
          isCfcaUserStatus: true
        })
      } else {
        this.setState({
          isCfcaUserStatus: false
        })
      }
    }
  }
  levelTigger = (arrType, flag, i, o) => {
    let arr = this.state[arrType]
    if (flag === 'one') {
      // 当一级菜单被关闭时
      if (arr[i].buttonStyle === true) {
        arr[i].buttonStyle = false
        arr[i].childShow = false
      } else {
        //可选菜单：当一级菜单被开启时 其他一级关全部关闭
        //已选菜单：当一级菜单被开启时 其他不影响
        if (arrType === 'levelOneArr') {
          arr.map((obj, k) => {
            arr[k].buttonStyle = false
            arr[k].childShow = false
            obj.childArr.map((val, i2) => {
              arr[k].childArr[i2].buttonStyle = false
              arr[k].childArr[i2].childShow = false
              return true
            })
            return true
          })
        }
        //本一级菜单及其后代菜单全部开启
        arr[i].childShow = true
        arr[i].buttonStyle = true
        arr[i].childArr.map((obj, index) => {
          if (arr[i].childArr[index].childShow !== undefined) {
            arr[i].childArr[index].childShow = true
            arr[i].childArr[index].buttonStyle = true
          }
          return true
        })
      }
    } else {
      // 当点击二级菜单展开、收起时，对应的三级菜单对应显示、隐藏
      arr[i].childArr[o].childShow = !arr[i].childArr[o].childShow
      arr[i].childArr[o].buttonStyle = !arr[i].childArr[o].buttonStyle
    }
    this.setState({
      arrType: [...arr]
    })
  }
  isCfcaUserFunc = (type) => {
    let paramDemo = { isCfcaUser: type }
    if (this.props.params && this.props.params.id) {
      paramDemo.id = this.props.params.id
    }
    (async () => {
      // 请求全部菜单
      let data = await getRequest({
        path: '/user/getUserMenuTree',
        method: 'POST',
        param: {
          id: ''
        }
      })
      // 请求权限内的菜单
      let { body: roleTree = [] } = data.data,
        levelOneArr = [],
        levelTwoArr = [],
        levelThreeArr = []
      roleTree.map((a) => {
        if (a.menuLevel === '1') {
          levelOneArr.push({ ...a, ...{ checked: false } })
        }
        if (a.menuLevel === '2') {
          levelTwoArr.push({ ...a, ...{ checked: false } })
        }
        if (a.menuLevel === '3') {
          levelThreeArr.push({ ...a, ...{ checked: false } })
        }
        return true
      })
      levelOneArr.map((obj, index) => {
        levelOneArr[index].childArr = [] // 为每一个一级菜单对象加上childArr属性
        levelTwoArr.map(obj2 => {
          if (obj.menuId === obj2.pMenuId) {
            levelOneArr[index].childArr.push(obj2)
            if (index === 0) { //初始化的时候只有第一项展开，其余是关闭的
              levelOneArr[index].childShow = true
              levelOneArr[index].buttonStyle = true
            } else {
              levelOneArr[index].childShow = false
              levelOneArr[index].buttonStyle = false
            }
          }
          return true
        })
        return true
      })
      levelOneArr.map((obj, index) => {
        if (obj.childArr.length !== 0) {
          obj.childArr.map((obj1, index2) => {
            levelOneArr[index].childArr[index2].childArr = []
            levelThreeArr.map(obj2 => {
              if (obj1.menuId === obj2.pMenuId) {
                if (Object.keys(this.props.params).length === 0) {
                  levelOneArr[index].childArr[index2].childShow = true
                  levelOneArr[index].childArr[index2].buttonStyle = true
                  levelOneArr[index].childArr[index2].childArr.push(obj2)
                } else {
                  levelOneArr[index].childArr[index2].childShow = false
                  levelOneArr[index].childArr[index2].buttonStyle = false
                  levelOneArr[index].childArr[index2].childArr.push(obj2)
                }
              }
              return true
            })
            return true
          })
        }
        return true
      })
      this.setState({ levelOneArr }, () => {
      })
      // if (Object.keys(this.props.params).length === 0) { //如果是新增
      //   this.setState({ levelOneArr })
      //   return
      // }
      let data2 = await getRequest({
        path: '/user/getUserMenuTree',
        method: 'POST',
        param: {
          id: paramDemo.id
        }
      })
      let _data2 = this.handMenus(data2)
      let _data3 = this._handMenus(data2)
      _data3.map((val, index) => {
        _data3[index].checked = true
        if (val.childArr.length !== 0) {
          _data3[index].childArr.map((val2, index2) => {
            _data3[index].childArr[index2].checked = true
            if (val2.childArr.length !== 0) {
              _data3[index].childArr[index2].childArr.map((val3, index3) => {
                _data3[index].childArr[index2].childArr[index3].checked = true
                return true
              })
            }
            return true
          })
        }
        return true
      })
      levelOneArr.map((val, index) => {
        levelOneArr[index].buttonStyle = false
        levelOneArr[index].childShow = false
        return true
      })
      _data2.map((val) => {
        levelOneArr.map((val2, index2) => {
          if (val.menuId === val2.menuId) {
            levelOneArr[index2].childShow = true
            levelOneArr[index2].buttonStyle = true
            levelOneArr[index2].checked = true
          }
          if (val2.childArr.length !== 0) {
            val2.childArr.map((val3, index3) => {
              if (val.menuId === val3.menuId) {
                levelOneArr[index2].childArr[index3].childShow = true
                levelOneArr[index2].childArr[index3].buttonStyle = true
                levelOneArr[index2].childArr[index3].checked = true
              }
              if (val3.childArr.length !== 0) {
                val3.childArr.map((val4, index4) => {
                  if (val.menuId === val4.menuId) {
                    levelOneArr[index2].childArr[index3].childArr[index4].childShow = true
                    levelOneArr[index2].childArr[index3].childArr[index4].buttonStyle = true
                    levelOneArr[index2].childArr[index3].childArr[index4].checked = true
                  }
                  return true
                })
              }
              return true
            })
          }
          return true
        })
        return true
      })
      this.setState({
        levelOneArr,
        optionalArray: _data3
      })
    })()
  }
  componentWillReceiveProps(nextProps) {
    const { getUserInfo2Data = {} } = nextProps,
      { body = {} } = getUserInfo2Data
    if (nextProps.params && nextProps.params.id) {
      this.setState({
        params: { ...body }
      }, () => {
      })
      if (body.isCfcaUser === '1') {
        this.setState({
          isWantUkey: YES
        })
      } else {
        this.setState({
          isWantUkey: NO
        })
      }
      for (let i = 0; i < this.state.renderData1.length; i++) {
        for (let item in body) {
          if (item === this.state.renderData1[i].name && body[item] !== ' ') {
            this.inputs[item].setValue(body[item])
            break
          }
        }
      }
      if (body.userComment) {
        this.inputs.userComment.setValue(body.userComment)
      }
      if (body.userDuty) {
        let demoList = { 'text': body.userDuty, 'value': body.userDuty } //eslint-disable-line
        this.inputs.userDuty.setValue(demoList)
      }
      this.isCfcaUserFunc(body.isCfcaUser)
    }
    if (nextProps.data.userData[0] !== this.props.data.userData[0]) {
      let user = this.props.data.userData.body[0]
      this.userName.setValue(user.userName)
    }
  }
  data = {
    checked: true
  }
  getArrayIndex = (...args) => {
    if (args.length === 2) {
      this.state.levelOneArr.map((val, i) => {
        if (args[1].menuId === val.menuId) {
          this.checked(args[0], i, this.state.optionalArray)
        }
        return true
      })
    }
    if (args.length === 3) {
      let index
      this.state.levelOneArr.map((val, i) => {
        if (args[1].menuId === val.menuId) {
          index = i
          val.childArr.map((val2, i2) => {
            if (args[2].menuId === val2.menuId) {
              this.checked(args[0], index, i2, this.state.optionalArray)
            }
            return true
          })
        }
        return true
      })
    }
    if (args.length === 4) {
      let index,
        index2
      this.state.levelOneArr.map((val, i) => {
        if (args[1].menuId === val.menuId) {
          index = i
          val.childArr.map((val2, i2) => {
            if (args[2].menuId === val2.menuId) {
              index2 = i2
              val2.childArr.map((val3, i3) => {
                if (args[3].menuId === val3.menuId) {
                  this.checked(args[0], index, index2, i3, this.state.optionalArray)
                }
                return true
              })
            }
            return true
          })
        }
        return true
      })
    }
  }
  handleRadio = (checked) => () => this.setState({ isWantUkey: checked, params: { ...this.state.params, isCfcaUser: checked === YES ? '1' : '2' } })
  handleChange = (key) => (value) => {
    this.setState({ params: { ...this.state.params, [key]: value } })
  }
  handleSelect = (key) => (item) => {
    // TODO: 选中的项
    this.setState({
      params: { ...this.state.params, [key]: item }
    })
  }
  handleCheckout = () => {
    let filter = []
    if (!this.state.params.email) {
      filter = ['userComment', 'email']
    }
    return new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        const keys = Object.keys(this.inputs)
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i]
          if (filter.includes(key)) {
            continue // eslint-disable-line
          }
          if (this.inputs[key] && this.inputs[key].getErrStatus()) {
            resolve(false)
            break
          }
        }
        resolve(true)
      })
    })
  }
  handMenus = (list) => {
    let { body: roleTree = [] } = list.data,
      levelOneArr = []
    roleTree.map((a) => {
      if (a.checkStatus === '1') {
        levelOneArr.push(a)
      }
      return true
    })
    return levelOneArr
  }
  _handMenus = (list) => {
    let { body: roleTree = [] } = list.data,
      levelOneArr = [],
      levelTwoArr = [],
      levelThreeArr = []
    roleTree.map((a) => {
      if (a.menuLevel === '1') {
        if (a.checkStatus === '1') {
          levelOneArr.push(a)
        }
      }
      if (a.menuLevel === '2') {
        if (a.checkStatus === '1') {
          levelTwoArr.push(a)
        }
      }
      if (a.menuLevel === '3') {
        if (a.checkStatus === '1') {
          levelThreeArr.push(a)
        }
      }
      return true
    })
    levelOneArr.map((obj, index) => {
      levelOneArr[index].childArr = []
      levelTwoArr.map(obj2 => {
        if (obj.menuId === obj2.pMenuId) {
          levelOneArr[index].childArr.push(obj2)
          if (index === 0) { //初始化的时候只有第一项展开，其余是关闭的
            levelOneArr[index].childShow = true
            levelOneArr[index].buttonStyle = true
          } else {
            levelOneArr[index].childShow = false
            levelOneArr[index].buttonStyle = false
          }
        }
        return true
      })
      return true
    })
    levelOneArr.map((obj, index) => {
      if (obj.childArr.length !== 0) {
        obj.childArr.map((obj1, index2) => {
          levelOneArr[index].childArr[index2].childArr = []
          levelThreeArr.map(obj2 => {
            if (obj1.menuId === obj2.pMenuId) {
              levelOneArr[index].childArr[index2].childShow = true
              levelOneArr[index].childArr[index2].buttonStyle = true
              levelOneArr[index].childArr[index2].childArr.push(obj2)
            }
            return true
          })
          return true
        })
      }
      return true
    })
    return levelOneArr
  }
  /**
  * 可选菜单的勾选事件
  */
  checked = (...args) => {
    let arr = this.state.levelOneArr
    // 勾选一级菜单
    if (args.length === 3) {
      // 关闭
      if (arr[args[1]].checked === true) {
        arr[args[1]].checked = false
        if (arr[args[1]].childArr.length !== 0) {
          arr[args[1]].childArr.map((value, i) => {
            arr[args[1]].childArr[i].checked = false
            if (arr[args[1]].childArr[i].childArr !== 0) {
              arr[args[1]].childArr[i].childArr.map((value2, i2) => {
                arr[args[1]].childArr[i].childArr[i2].checked = false
                return true
              })
            }
            return true
          })
        }
      } else {
        // 开启
        arr[args[1]].checked = true
        if (arr[args[1]].childArr.length !== 0) {
          arr[args[1]].childArr.map((value, i) => {
            arr[args[1]].childArr[i].checked = true
            if (arr[args[1]].childArr[i].childArr !== 0) {
              arr[args[1]].childArr[i].childArr.map((value2, i2) => {
                arr[args[1]].childArr[i].childArr[i2].checked = true
                return true
              })
            }
            return true
          })
        }
      }
      // 闭合所有一级菜单和二级菜单
      if (arr[args[1]].buttonStyle === false) {
        arr.map((obj, k) => {
          arr[k].buttonStyle = false
          arr[k].childShow = false
          obj.childArr.map((val, o) => {
            arr[k].childArr[o].buttonStyle = false
            arr[k].childArr[o].childShow = false
            return true
          })
          return true
        })
        arr[args[1]].childShow = true
        arr[args[1]].buttonStyle = true
        arr[args[1]].childArr.map((obj, index) => {
          if (arr[args[1]].childArr[index].childShow !== undefined) {
            arr[args[1]].childArr[index].childShow = true
            arr[args[1]].childArr[index].buttonStyle = true
          }
          return true
        })
      }
    }
    // 勾选二级菜单
    if (args.length === 4) {
      if (arr[args[1]].childArr[args[2]].checked === true) {
        arr[args[1]].childArr[args[2]].checked = false
        if (arr[args[1]].childArr[args[2]].childArr !== 0) {
          arr[args[1]].childArr[args[2]].childArr.map((value, i) => {
            arr[args[1]].childArr[args[2]].childArr[i].checked = false
            return true
          })
        }
        // 除首页 二级菜单没有了 需要去掉一级菜单
        let i = 0
        for (let aa = 0; aa < arr[args[1]].childArr.length; aa++) {
          if (arr[args[1]].childArr[aa].checked && arr[args[1]].menuName !== '首页') {
            ++i
          }
          if (i === 0 && aa === arr[args[1]].childArr.length - 1 && arr[args[1]].menuName !== '首页') {
            arr[args[1]].checked = false
          }
        }
      } else {
        arr[args[1]].childArr[args[2]].checked = true
        arr[args[1]].checked = true
      }
    }
    // 勾选三级菜单
    if (args.length === 5) {
      if (arr[args[1]].childArr[args[2]].childArr[args[3]].checked === false) {
        arr[args[1]].childArr[args[2]].childArr[args[3]].checked = true
        arr[args[1]].childArr[args[2]].checked = true
        arr[args[1]].checked = true
      } else {
        arr[args[1]].childArr[args[2]].childArr[args[3]].checked = false
      }
    }
    // 深拷贝一个新数组（数组内的对象和数组全部深拷贝）
    let optionalArray = [...arr]
    optionalArray.map((value, i) => {
      optionalArray[i] = { ...optionalArray[i] }
      optionalArray[i].childArr = [...optionalArray[i].childArr]
      optionalArray[i].childArr.map((value2, i2) => {
        optionalArray[i].childArr[i2] = { ...optionalArray[i].childArr[i2] }
        optionalArray[i].childArr[i2].childArr = [...optionalArray[i].childArr[i2].childArr]
        optionalArray[i].childArr[i2].childArr.map((value3, i3) => {
          optionalArray[i].childArr[i2].childArr[i3] = { ...optionalArray[i].childArr[i2].childArr[i3] }
          return true
        })
        return true
      })
      return true
    })
    // 递归删除没有勾选的成员
    let filterArr = (array) => {
      let filterLevelOneArr = []
      array.map((value, i) => {
        if (value.checked === false) {
          array.splice(i, 1)
          filterArr(array)
        } else {
          filterLevelOneArr = array
        }
        return true
      })
      return filterLevelOneArr
    }
    filterArr(optionalArray)
    filterArr(optionalArray).map(value => {
      filterArr(value.childArr).map(value2 => {
        filterArr(value2.childArr)
        return true
      })
      return true
    })
    // 已选菜单全部展开
    // optionalArray.map((value, i) => {
    //   optionalArray[i].childShow = true
    //   optionalArray[i].buttonStyle = true
    //   return true
    // })

    // if (args.length === 3) {
    // }

    const show = (menuId, menuId2) => {
      optionalArray.map((value, i) => {
        if (value.menuId === menuId) {
          optionalArray[i].childShow = true
          optionalArray[i].buttonStyle = true
          value.childArr.map((value2, i2) => {
            if (value2.menuId === menuId2) {
              optionalArray[i].childArr[i2].childShow = true
              optionalArray[i].childArr[i2].buttonStyle = true
            }
            return true
          })
        }
        return true
      })
    }
    // 已选菜单全部展开
    // 点击已选一级菜单勾选
    if (args.length === 3) {
      let menuId
      if (args[2].length !== 0) {
        args[2].map(value => {
          if (value.buttonStyle === true) {
            menuId = value.menuId
            value.childArr.map((value2) => {
              if (value2.buttonStyle === true) {
                show(menuId, value2.menuId)
              } else {
                show(menuId, undefined)
              }
              return true
            })
          }
          return true
        })
      }
    }
    // 点击已选二级菜单勾选
    if (args.length === 4) {
      let menuId
      if (args[3].length !== 0) {
        args[3].map(value => {
          if (value.buttonStyle === true) {
            menuId = value.menuId
            value.childArr.map((value2) => {
              if (value2.buttonStyle === true) {
                show(menuId, value2.menuId)
              } else {
                show(menuId, undefined)
              }
              return true
            })
          }
          return true
        })
      }
    }
    if (args.length === 5) {
      let menuId
      if (args[4].length !== 0) {
        args[4].map(value => {
          if (value.buttonStyle === true) {
            menuId = value.menuId
            value.childArr.map((value2) => {
              if (value2.buttonStyle === true) {
                show(menuId, value2.menuId)
              } else {
                show(menuId, undefined)
              }
              return true
            })
          }
          return true
        })
      }
    }
    this.setState({
      levelOneArr: [...arr],
      optionalArray
    })
  }
  commit = async () => {
    const isHaveError = await this.handleCheckout()
    if (!isHaveError) {
      return
    }
    if (!this.state.params.isCfcaUser) {
      this.handleOpen('d11', '请选择是否申请数字证书')
      return
    }
    let arrInfo = []
    this.state.optionalArray.map((val, index, arr) => {
      if (arr.length > 0) {
        arrInfo.push(val.menuId)
        val.childArr.map((val2, index2, arr2) => {
          if (arr2.length > 0) {
            arrInfo.push(val2.menuId)
            val2.childArr.map((val3, index3, arr3) => {
              if (arr3.length > 0) {
                arrInfo.push(val3.menuId)
              }
              return true
            })
          }
          return true
        })
      }
      return true
    })
    const { params } = this.state,
      { email, identifyNo, isCfcaUser, phonenum, userCode, userComment, userName, userDuty } = params
    let paramSubmit = {
      email,
      identifyNo,
      isCfcaUser,
      menuList: arrInfo,
      phonenum,
      userCode,
      userComment,
      userName,
    }
    if (userDuty && userDuty.value) {
      paramSubmit.userDuty = userDuty.value
    }
    if (this.props.params && this.props.params.id && this.props.params.checkType) {
      paramSubmit.id = this.props.params.id
    }
    if (!email) {
      paramSubmit.email = ' '
    }
    if (!userDuty) {
      paramSubmit.userDuty = ' '
    }
    if (!userComment) {
      paramSubmit.userComment = ' '
    }
    let asyncRequest = async () => {
      let data = await getRequest({
        path: '/user/saveInfo',
        method: 'POST',
        param: paramSubmit
      })
      if (data.data.respCode === '000000') {
        this.setState({
          isShowErrorWindow: true,
          errMsg: data.data.respMsg
        })
        this.handleOpen('d11', data.data.respMsg, 'save')
        return false
      } else if (data.data.respCode === '500000' || data.data.respCode === '500001' || data.data.respCode === '500002' || data.data.respCode === '500003') {
        this.setState({
          isShowErrorWindow: true,
          errMsg: data.data.respMsg
        })
        this.handleOpen('d11', data.data.respMsg)
        return false
      }
    }
    asyncRequest()
  }

  // 点击取消

  remove = () => {
    this.context.router.history.push('/systemManage/userManage')
  }
  render() {
    const { params, renderData1, isShowErrorHint, isWantUkey } = this.state,
      { userCode } = params,
      handleChange = this.handleChange // 修改
    return (
      <div className="qb-panel-g">
        {/* 弹窗start */}
        <Dialog
          //showCloseBtn
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button-color rob-alert-button-45"
          showCover
        />
        {/* 弹窗end */}
        <div className="qb-column-header-g">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
            <li><Link to={{ pathname: '/systemManage/userManage' }}>用户管理</Link></li>
            {this.props.params && this.props.params.id && this.props.params.checkType ? <li className="active"><a href="">修改用户</a></li> : <li className="active"><a href="">新增用户</a></li>}
          </ol>
        </div>
        <div className="qb-form-group-g clearfix qb-media-height qb-form-group-b10-g">
          <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
            <div className="rob-form-group ">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                <label htmlFor="inputEmail3" className="rob-input-label ">用户名:</label>
              </div>
              <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-input-item" style={{ lineHeight: '40px' }}>
                  {userCode}
                </div>
              </div>
            </div>
          </div>
          {this.props.params && this.props.params.id && this.props.params.checkType ?
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group ">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label htmlFor="inputEmail3" className="rob-input-label ">用户姓名:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24">
                  <div className="rob-input-item" style={{ lineHeight: '40px' }}>
                    {this.state.params.userName}
                  </div>
                </div>
              </div>
            </div> : null
          }
          <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
            {renderData1.map(({ name, label, pattern, required, errorMsg, emptyMsg, placeholder }, index) => (
              <div key={index} style={{ display: this.props.params && this.props.params.id && this.props.params.checkType && name === 'userName' ? 'none' : 'block' }} >
                <QBInput
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24"
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  isTestRule={isShowErrorHint}
                  errorMsg={errorMsg}
                  emptyMsg={emptyMsg}
                  ref={r => this.inputs[name] = r}
                  handleChange={handleChange(name)}
                  defaultValue={params[name]}
                  pattern={pattern}
                  required={required}
                  key={index}
                />
              </div>
            ))}
            <QBSelect
              label="职务"
              defaultValue={params.userDuty ? params.userDuty.value : ''}
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
              inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24"
              errDirection="bottom"
              options={this.selectes}
              handleSelect={this.handleSelect('userDuty')}
              ref={ref => this.inputs.userDuty = ref}
            />
            <div className="rob-form-group">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg ">
                  <label className="rob-input-label">是否申请数字证书</label>
                </div>
                <div className="lh40 rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24">
                  <input className="rob-radio-with-gap" disabled={!this.state.isCfcaUserStatus} name="group2" onClick={() => { this.isCfcaUserFunc(1) }} checked={isWantUkey === YES} type="radio" id="test4" onChange={this.handleRadio(YES)} />
                  <label htmlFor="test4">是</label>
                  <input className="rob-radio-with-gap" name="group2" onClick={() => { this.isCfcaUserFunc(2) }} type="radio" checked={isWantUkey === NO} id="test5" onChange={this.handleRadio(NO)} />
                  <label htmlFor="test5">否</label>
                  {this.state.params.isCfcaUser === 2 ? <p className="qb-l40-g">
                    <span className="qb-red-g">*</span>
                    如不申请数字证书，仅可进行账户查询操作
</p> : null}
                </div>
              </div>
            </div>
            <QBTextarea
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
              inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24"
              name={'userComment'}
              label="备注"
              isTestRule={isShowErrorHint}
              errorMsg="请输入1-140个字的备注"
              emptyMsg="请输入备注"
              ref={r => this.inputs.userComment = r}
              handleChange={handleChange('userComment')}
              defaultValue={params.userComment}
              pattern={/^[\S\s]{1,140}$/}
              isShowEmptyMsg
              placeholder="请输入备注（选填）"
            />
          </div>
          <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
            <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg ">
              <label htmlFor="inputEmail3" className="rob-input-label ">分配菜单： </label>
            </div>
            <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24">
              <div className="qb-form-pd20-g">
                <div className="qb-select-menu-g">
                  <div className="rob-row">
                    <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24 qb-rg-bdsilid-g">
                      <p>可选菜单：</p>
                      {this.state.levelOneArr.map((a, i) => (
                        <div className={this.props.params && this.props.params.id && this.props.params.checkType ? 'qb-select-box-g' : a.buttonStyle === true ? 'qb-select-box-g qb-bg-select-g' : 'qb-select-box-g'} key={i} >
                          <div className="qb-addroles-g">
                            <input type="checkbox" id={`one${i}`} className="rob-checkbox-filled-in" checked={a.checked} onChange={() => { this.checked('one', i, [...this.state.optionalArray]) }} />
                            <label htmlFor={`one${i}`}>{a.menuName}</label>
                            <i
                              className={a.childArr.length === 0 ? '' : a.buttonStyle === true ? 'qb-select-menu-g--selectIcon qb-icon-delete1' : 'qb-select-menu-g--selectIcon qb-icon-add'}
                              onClick={() => {
                                this.levelTigger('levelOneArr', 'one', i)
                              }}
                            />
                          </div>
                          <div className="qb-select-box-g__select-item " style={{ display: this.state.levelOneArr[i].childShow === true ? 'block' : 'none' }}>
                            {a.childArr ? a.childArr.map((b, o) => (
                              <div className="qb-addroles-g" key={o} >
                                <input type="checkbox" id={`two${i}${o}`} className="rob-checkbox-filled-in" checked={b.checked} onChange={() => { this.checked('two', i, o, [...this.state.optionalArray]) }} />
                                <label htmlFor={`two${i}${o}`}>{b.menuName}</label>
                                <i
                                  className={b.childArr.length === 0 ? '' : b.buttonStyle === true ? 'qb-select-menu-g--selectIcon qb-icon-delete1' : 'qb-select-menu-g--selectIcon qb-icon-add'}
                                  onClick={() => {
                                    this.levelTigger('levelOneArr', 'two', i, o)
                                  }}
                                />
                                <div className="qb-addroles-g__three" style={{ display: b.childShow === true ? 'block' : 'none' }}>
                                  <ul>
                                    {b.childArr ? b.childArr.map((c, k) => (
                                      <li key={k} >
                                        <a
                                          className={c.checked === true ? 'on' : ''}
                                          onClick={() => {
                                            this.checked('three', i, o, k, [...this.state.optionalArray])
                                          }}
                                        >
                                          <i className="qb-icon-add" />{c.menuName}
                                        </a>
                                      </li>
                                    )) : null}
                                  </ul>
                                </div>
                              </div>
                            )) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24 qb-rg-bdsilid-g">
                      <p>已选菜单：</p>
                      {this.state.optionalArray.map((a, i) => (
                        <div key={i} className="qb-select-box-g" >
                          <div className="qb-addroles-g">
                            <input type="checkbox" id={`one_one${i}`} className="rob-checkbox-filled-in" checked={a.checked} onChange={() => { this.getArrayIndex('one', a) }} />
                            <label htmlFor={`one_one${i}`}>{a.menuName}</label>
                            <i
                              className={a.childArr.length === 0 ? '' : a.buttonStyle === true ? 'qb-select-menu-g--selectIcon qb-icon-delete1' : 'qb-select-menu-g--selectIcon qb-icon-add'}
                              onClick={() => {
                                this.levelTigger('optionalArray', 'one', i)
                              }}
                            />
                          </div>
                          <div className="qb-select-box-g__select-item " style={{ display: this.state.optionalArray[i].childShow === true ? 'block' : 'none' }}>
                            {a.childArr ? a.childArr.map((b, o) => (
                              <div className="qb-addroles-g" key={o} >
                                <input type="checkbox" id={`two_two${i}${o}`} className="rob-checkbox-filled-in" checked={b.checked} onChange={() => { this.getArrayIndex('two', a, b) }} />
                                <label htmlFor={`two_two${i}${o}`}>{b.menuName}</label>
                                <i
                                  className={b.childArr.length === 0 ? '' : b.buttonStyle === true ? 'qb-select-menu-g--selectIcon qb-icon-delete1' : 'qb-select-menu-g--selectIcon qb-icon-add'}
                                  onClick={() => {
                                    this.levelTigger('optionalArray', 'two', i, o)
                                  }}
                                />
                                <div className="qb-addroles-g__three" style={{ display: b.childShow === true ? 'block' : 'none' }}>
                                  <ul>
                                    {b.childArr ? b.childArr.map((c, k) => (
                                      <li key={k} >
                                        <a
                                          className={c.checked === true ? 'on' : ''}
                                          onClick={() => {
                                            this.getArrayIndex('three', a, b, c)
                                          }}
                                        >
                                          <i className="qb-icon-delete2" />{c.menuName}
                                        </a>
                                      </li>
                                    )) : null}
                                  </ul>
                                </div>
                              </div>
                            )) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
                <div className="qb-red-g rob-input-label text-left " />
              </div>
            </div>
          </div>
        </div>
        <div className="qb-form-footButton-g clearfix ">
          <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.remove}>取消</button>
            <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.commit}>提交</button>
          </div>
        </div>
      </div >
    )
  }

}

addUserPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  updateUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  getUserCodeFunc: PropTypes.func,
  getUserInfo2: PropTypes.func,
  getUserInfo2Data: PropTypes.object

}
addUserPage.defaultProps = {
  data: {},
  getData: () => { },
  updateUserInfo: () => { },
  userInfo: {},
  getUserCodeFunc: () => { },
  getUserInfo2: () => { },
  getUserInfo2Data: {}
}

export default connect(state => ({
  data: state.userDataQuery,
  userInfo: state.userDataQuery.getUserInfo,
  getUserInfo2Data: state.userDataQuery.getUserInfo2
}), dispatch => ({
  updateUserInfo: bindActionCreators(action.updateUserInfo, dispatch),
  getData: bindActionCreators(action.getData, dispatch),
  getUserCodeFunc: bindActionCreators(action.getUserCode, dispatch),
  getUserInfo2: bindActionCreators(action.getUserInfo2, dispatch)
}))(addUserPage)