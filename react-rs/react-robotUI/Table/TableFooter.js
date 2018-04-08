import React, { Component } from 'react'
import PropTypes from 'prop-types'
class TableFooter extends Component {
  static robotUIName = 'TableBody'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  }
  static defaultProps = {
    children: null,
    style: {}
  }
  render() {
    return (
      <tfoot style={Object.assign({}, this.props.style)}>
        {this.props.children}
      </tfoot>
    )
  }
}
export default TableFooter