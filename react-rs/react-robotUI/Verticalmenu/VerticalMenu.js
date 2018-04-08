// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// import { menuMap } from './dataMap'

// class VerticalMenu extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       fActiveState: 0,
//       sActiveState: false,
//       tfirstActiveState: false,
//       refresh: false
//     }
//     this.handleClick = (event, type, callback, that) => {
//       event ? event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true) : null  // eslint-disable-line
//       let tempshow = ''
//       this.setState({
//         refresh: true
//       })
//       for (let i in type) {
//         tempshow += i + type[i]
//       }
//       if (that && that.props.confData) {
//         for (let j in that.props.confData) {
//           let tempshow2 = ''
//           tempshow2 += 'i' + j // eslint-disable-line
//           this.setState({ [tempshow2]: false })
//         }
//       }
//       let numberArray = tempshow.replace(/[^0-9]+/g, ',').substr(1).split(',')
//       this.setState({ fActiveState: Number(numberArray[0]) })
//       if (tempshow.indexOf('k') > -1) {
//         this.setState({ sActiveState: `i${numberArray[0]}k${numberArray[1]}` })
//         this.setState({ [`i${numberArray[0]}`]: true })
//       } else if (that.props.confData[Number(tempshow.split('')[1])].url) {
//         this.setState({ sActiveState: false })
//       }
//       if (tempshow.indexOf('j') > -1) {
//         this.setState({ tActiveState: tempshow })
//         if (this.props.menuType && this.props.menuType === 'menuShow') {
//           this.setState({ [`i${numberArray[0]}k${numberArray[1]}`]: false })
//         } else {
//           this.setState({ [`i${numberArray[0]}k${numberArray[1]}`]: true })
//         }
//       } else {
//         this.setState({ tActiveState: false })
//       }
//       this.setState({ [tempshow]: !this.state[tempshow] })
//       callback ? this.props.handleClick(callback) : null
//     }
//     this.changeModal = (type) => {
//       if (type === 'menuClick') {
//         this.setState({ menuClickIcon: !this.state.menuClickIcon })
//         this.props.handleClick(this.state.menuClickIcon)
//       } else if (type === 'menuHover') {
//         this.setState({ menuHoverIcon: !this.state.menuHoverIcon })
//         this.props.handleClick(this.state.menuHoverIcon)
//       } else if (type === 'menuShowLeft') {
//         this.setState({ menuShowIcon: !this.state.menuShowIcon })
//         this.props.handleClick(this.state.menuShowIcon, 'menuShowLeft')
//       } else if (type === 'menuShowRight') {
//         this.setState({ menuShowRight: !this.state.menuShowRight })
//         this.props.handleClick(this.state.menuShowRight, 'menuShowRight')
//       }
//     }
//   }
//   static propTypes = {
//     menuType: PropTypes.string,
//     confData: PropTypes.array,
//     handleClick: PropTypes.func,
//     selectMenuId: PropTypes.any,
//     showSidebarIcon: PropTypes.bool,
//     menuWidth: PropTypes.string,
//     upLevel: PropTypes.string
//   }
//   static defaultProps = {
//     menuType: 'menuClick',
//     confData: [],
//     handleClick: () => { },
//     selectMenuId: null,
//     showSidebarIcon: false,
//     menuWidth: '',
//     upLevel: ''
//   }
//   deepLoop = (data, id) => {
//     let curData = {}
//     for (let i in data) {
//       if (data[i].menuId === id) {
//         curData = { i }
//         break
//       }
//       for (let k in data[i].ChildMenu) {
//         if (data[i].ChildMenu[k].menuId === id) {
//           curData = { i, k }
//           break
//         }
//         for (let j in data[i].ChildMenu[k].grandchild) {
//           if (data[i].ChildMenu[k].grandchild[j].menuId === id) {
//             curData = { i, k, j }
//             break
//           }
//         }
//       }
//     }
//     return curData
//   }
//   componentWillReceiveProps(props) {
//     if (this.props.selectMenuId !== props.selectMenuId) {
//       this.handleClick(event, this.deepLoop(props.confData, props.selectMenuId))
//     }
//   }
//   render() {
//     const {
//       menuType,
//       upLevel = ''
//     } = this.props
//     let menuElements
//     if (this.state.refresh) {
//       menuElements = menuMap[menuType](this)
//     } else {
//       let _this = this
//       let href = location.pathname
//       let menuData = this.props.confData
//       for (let i = 0; i < menuData.length; i++) {
//         if (menuData[i] && menuData[i].ChildMenu) {
//           for (let j = 0; j < menuData[i].ChildMenu.length; j++) {
//             if (menuData[i].ChildMenu[j].url === href) {
//               _this.state.sActiveState = `i${i}k${j}`
//               _this.state[`i${i}`] = true
//               _this.state[`i${i}k${j}`] = true
//               _this.state.fActiveState = 1
//             } else if (upLevel && menuData[i].ChildMenu[j].url.toLowerCase() === upLevel.toLowerCase()) {
//               _this.state.sActiveState = `i${i}k${j}`
//               _this.state[`i${i}`] = true
//               _this.state[`i${i}k${j}`] = true
//               _this.state.fActiveState = 1
//             }
//           }
//         }
//       }
//       menuElements = menuMap[menuType](_this)
//     }
//     return (
//       <div>
//         {menuElements}
//       </div>
//     )
//   }
// }

// export default VerticalMenu
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { menuMap } from './dataMap'

class VerticalMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fActiveState: 0,
      sActiveState: false,
      tfirstActiveState: false
    }
    this.changeModal = (type) => {
      if (type === 'menuClick') {
        this.setState({ menuClickIcon: !this.state.menuClickIcon })
        this.props.handleClick(this.state.menuClickIcon)
      } else if (type === 'menuHover') {
        this.setState({ menuHoverIcon: !this.state.menuHoverIcon })
        this.props.handleClick(this.state.menuHoverIcon)
      } else if (type === 'menuShowLeft') {
        this.setState({ menuShowIcon: !this.state.menuShowIcon })
        this.props.handleClick(this.state.menuShowIcon, 'menuShowLeft')
      } else if (type === 'menuShowRight') {
        this.setState({ menuShowRight: !this.state.menuShowRight })
        this.props.handleClick(this.state.menuShowRight, 'menuShowRight')
      }
    }
  }
  static propTypes = {
    menuType: PropTypes.string,
    confData: PropTypes.array,
    handleClick: PropTypes.func,
    selectMenuId: PropTypes.any,
    showSidebarIcon: PropTypes.bool,
    menuWidth: PropTypes.string
  }
  static defaultProps = {
    menuType: 'menuClick',
    confData: [],
    handleClick: () => { },
    selectMenuId: null,
    showSidebarIcon: false,
    menuWidth: ''
  }
  handleClick = (event, type, callback, that) => {
    event ? event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true) : null  // eslint-disable-line
    let tempshow = ''
    for (let i in type) {
      tempshow += i + type[i]
    }
    if (that && that.props.confData) {
      for (let j in that.props.confData) {
        let tempshow2 = ''
        console.log(j, that.props.confData[j])
        tempshow2 += 'i' + j // eslint-disable-line
        this.setState({ [tempshow2]: false })
      }
    }
    let numberArray = tempshow.replace(/[^0-9]+/g, ',').substr(1).split(',')
    this.setState({ fActiveState: Number(numberArray[0]) })
    // if (tempshow.indexOf('k') > -1) {
    //   this.setState({ sActiveState: `i${numberArray[0]}k${numberArray[1]}` })
    //   this.setState({ [`i${numberArray[0]}`]: true })
    // } else {
    //   this.setState({ sActiveState: false })
    // }
    if (tempshow.indexOf('k') > -1) {
      this.setState({ sActiveState: `i${numberArray[0]}k${numberArray[1]}`, [`i${numberArray[0]}`]: true })
    } else if (that && that.props.confData[Number(tempshow.split('')[1])].url) {
      this.setState({ sActiveState: false })
    }
    if (tempshow.indexOf('j') > -1) {
      this.setState({ tActiveState: tempshow })
      if (this.props.menuType && this.props.menuType === 'menuShow') {
        this.setState({ [`i${numberArray[0]}k${numberArray[1]}`]: false })
      } else {
        this.setState({ [`i${numberArray[0]}k${numberArray[1]}`]: true })
      }
    } else {
      this.setState({ tActiveState: false })
    }
    this.setState({ [tempshow]: !this.state[tempshow] })
    callback ? this.props.handleClick(callback) : null
  }
  deepLoop = (data, id) => {
    let curData = {},
      clickData = {},
      thisFlag = false
    for (let i in data) {
      if (data[i].menuId === id) {
        curData = { i }
        clickData = data[i]
        thisFlag = this
        break
      }
      for (let k in data[i].ChildMenu) {
        if (data[i].ChildMenu[k].menuId === id) {
          curData = { i, k }
          clickData = data[i].ChildMenu[k]
          break
        }
      }
    }
    return { curData, clickData, thisFlag }
  }
  componentWillReceiveProps(props) {
    if (this.props.selectMenuId !== props.selectMenuId) {
      let curData = this.deepLoop(props.confData, props.selectMenuId).curData,
        thisFlag = this.deepLoop(props.confData, props.selectMenuId).thisFlag
      this.handleClick(event, curData, null, thisFlag)
    }
  }
  render() {
    const {
      menuType
    } = this.props
    const menuElements = menuMap[menuType](this)
    return (
      <div>
        {menuElements}
      </div>
    )
  }
}

export default VerticalMenu