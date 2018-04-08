import React, { Component } from 'react'
import PropTypes from 'prop-types'


class TableHeaderColumn extends Component {
  static robotUIName = 'TableHeaderColumn'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    wrap: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    children: null,
    style: {},
    wrap: false,
    className: ''
  }
  render() {
    return (
      <th className={this.props.className}>
        {this.props.children}
      </th>
    )
  }
}


export default TableHeaderColumn