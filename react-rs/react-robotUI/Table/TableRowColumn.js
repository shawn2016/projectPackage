/*eslint-disable*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class TableRowColumn extends Component {
  static robotUIName = 'TableRowColumn'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    wrap: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    children: null,
    style: {},
    wrap: false,
    title: '',
    className: ''
  }
  render() {
    return (
      <td className={this.props.className} title={this.props.title}>
        {this.props.children}
      </td>
    )
  }
}

export default TableRowColumn