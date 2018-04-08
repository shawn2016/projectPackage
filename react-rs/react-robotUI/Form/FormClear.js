import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormDatepicker extends Component {
  static robotUIName = 'FormClean'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    handleClear: PropTypes.func
  }
  static defaultProps = {
    children: null,
    style: {},
    handleClear: null
  }
  static contextTypes = {
    formClear: PropTypes.func
  }
  componentWillMount = () => {

  }

  render() {
    return (
      <div onClick={this._formClean}>
        {this.props.children}
      </div>
    )
  }

  _formClean = () => {
    this.context.formClear(this.props.handleClear)
  }
}

export default FormDatepicker