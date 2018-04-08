import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormSubmit extends Component {
  static robotUIName = 'FormSubmit'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    handleSubmit: PropTypes.func
  }

  static defaultProps = {
    children: null,
    style: {},
    handleSubmit: null
  }
  static contextTypes = {
    formSubmit: PropTypes.func
  }
  componentWillMount = () => {

  }

  render() {
    return (
      <div onClick={this._formSubmit}>
        {this.props.children}
      </div>
    )
  }

  _formSubmit = () => {
    this.context.formSubmit(this.props.handleSubmit)
  }
}

export default FormSubmit