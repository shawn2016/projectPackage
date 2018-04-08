import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DivMenu extends Component {
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
            <ul className="rob-hormenu-ul2-DivList">
              {obj.ChildMenu ? obj.ChildMenu.map((ChildMenuObj, k) => (
                <li key={k} className="rob-hormenu-li2" onClick={(event) => this.handleClick(event, ChildMenuObj)}>
                  <span><i className={`${ChildMenuObj.iconClass} rob-hormenu-icon-left`} />{ChildMenuObj.name}</span>
                </li>
               )) : null}
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}


export { DivMenu }
