import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BaseMenu extends Component {
  constructor(props) {
    super(props)
    this.handleClick = (event, callback) => {
      event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)  // eslint-disable-line
      this.props.handleClick(callback)
    }
  }
  static propTypes={
    confData: PropTypes.array,
    handleClick: PropTypes.func
  }
  static defaultProps = {
    confData: [],
    handleClick: () => {}
  }
  render() {
    return (
      <ul className="rob-hormenu-ul1">
        {this.props.confData.map((obj, i) => (
          <li key={i} className="rob-hormenu-li1" onClick={(event) => this.handleClick(event, obj)}>
            <span> <i className={obj.iconClass} />{obj.name}</span>
            <ul className="rob-hormenu-ul2-basic">
              {obj.ChildMenu ? obj.ChildMenu.map((childObj, k) => (
                <li key={k} className="rob-hormenu-li2" onClick={(event) => this.handleClick(event, childObj)}>
                  <span><i className={`${childObj.iconClass} rob-hormenu-icon-left`} />{childObj.name}</span>
                </li>
               )) : null}
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}


// const MultiList = () => {
//   return (<li className="rob-hormenu-li1 ">
//     { /* 基本菜单 */ }
//     <span>BasicStyle</span>
//     <ul className="rob-hormenu-ul2-basic">
//       <li className="rob-hormenu-li2">
//         <span>二级菜单</span>
//       </li>
//       <li className="rob-hormenu-li2">
//         <span>Myfirstapp</span>
//       </li>
//       <li className="rob-hormenu-li2">
//         <span>Myfirstapp</span>
//       </li>
//       <li className="rob-hormenu-li2">
//         <span>Myfirstapp</span>
//       </li>
//       <li className="rob-hormenu-li2">
//         <span>Myfirstapp</span>
//       </li>
//     </ul>
//   </li>)
// }

export { BaseMenu }
