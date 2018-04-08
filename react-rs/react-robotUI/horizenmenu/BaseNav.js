import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BaseNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choiceTab: 1
    }
    this.handleClick = (event, index, callback) => {
      event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)  // eslint-disable-line
      this.setState({ choiceTab: index + 1 })
      this.props.handleClick(callback)
    }
  }
  static propTypes={
    confData: PropTypes.array,
    handleClick: PropTypes.func,
    selectMenuId: PropTypes.any
  }
  static defaultProps = {
    confData: [],
    handleClick: () => {},
    selectMenuId: null
  }
  componentWillReceiveProps(props) {
    if (this.props.selectMenuId !== props.selectMenuId) {
      this.props.confData.forEach((value, index) => {
        if (value.id === props.selectMenuId) {
          this.handleClick(event, index)
        }
      })
    }
  }
  render() {
    return (
      <ul className="rob-navbar-horizen2">
        {this.props.confData.map((obj, i) => (
          <li key={i} className={`${this.state.choiceTab === i + 1 ? 'active' : null}`} onClick={(event) => this.handleClick(event, i, obj)}>
            <span>{obj.name}</span>
          </li>
        ))}
      </ul>
    )
  }
}

export { BaseNav }