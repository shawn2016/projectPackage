import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MultiMenu extends Component {
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
            <span> <i className={obj.iconClass} />&nbsp;&nbsp;&nbsp;&nbsp;{obj.name}</span>
            <ul className="rob-hormenu-ul2-basic">
              {obj.ChildMenu ? obj.ChildMenu.map((childObj, k) => (
                <li key={k} className="rob-hormenu-li2" onClick={(event) => this.handleClick(event, childObj)}>
                  <span><i className={`${childObj.iconClass} rob-hormenu-icon-left`} />&nbsp;&nbsp;&nbsp;&nbsp;{childObj.name}{childObj.grandchild.length > 0 ? <i className="rob-hormenu-icon-right qb-icon-angle-up" /> : null}</span>
                  <ul className="rob-hormenu-ul3">
                    {childObj.grandchild ? childObj.grandchild.map((grandchildObj, j) => (
                      <li key={j} onClick={(event) => this.handleClick(event, grandchildObj)}><span><i className={`${grandchildObj.iconClass} rob-hormenu-icon-left`} />&nbsp;&nbsp;&nbsp;&nbsp;{grandchildObj.name} </span></li>
                     )) : null}
                  </ul>
                </li>
              )) : null}
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}


export { MultiMenu }
