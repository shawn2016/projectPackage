import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
export default class PopUp {
  constructor(Component, props) {
    this.defaultProps = {
      isModal: false,
      readyClose: undefined,
      popName: undefined,
    }
    this.Component = Component
    this.props = Object.assign(this.defaultProps, props)
    this.container = null
    this.isContainerMax = Component.name === 'PopTip'
  }
  static propTypes = {
    onClose: PropTypes.func
  }
  show = () => {
    this.renderComponent()
    return this
  }
  close = (callback) => {
    this.removeContainer()
    callback && typeof callback === 'function' && callback()
  }

  createSingleContainer = () => {
    let container
    return container
  }

  appendContainer = (container) => {
    let parentNode = this.getParentNode()
    parentNode.appendChild(container)
  }

  getContainer = () => {
    if (this.container) {
      return this.container
    }
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
    return this.container
  }
  removeContainer = () => {
    let remove = () => {
      if (this.container) {
        ReactDOM.unmountComponentAtNode(this.container)
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }
    }
    if (typeof this.props.readyClose === 'function') {
      this.props.readyClose(() => {
        this.props.onClose && this.props.onClose()
        remove()
      })
    } else {
      this.props.onClose && this.props.onClose()
      remove()
    }
  }
  mountComponent = () => {
    if (!this.container) {
      this.getContainer()
    }
    ReactDOM.render(
      <div>
        <div className="rob-images-lg-box-bg" />
        <div className="rob-images-box-lg">
          { /* <div className="rob-images-screen-box">
            <span>
              <i className="icon-download1" onClick={this.props.handleReloadImage} />
            </span>
            <span className="error">
              <i className="qb-icon-delete2" onClick={this.removeContainer} />
            </span>
            <span className="success">
              <i className="qb-icon-delete2" onClick={this.props.handleCutting} />
            </span>
          </div> */ }
          <a className="rob-images-lg-close" title="关闭" onClick={this.removeContainer}>×</a>
          {this.Component}
        </div>
      </div>
      , this.container
    )
  }
  renderComponent = () => {
    let { readyCallback } = this.props
    if (typeof readyCallback === 'function') {
      readyCallback(() => {
        this.mountComponent()
      })
    } else {
      this.mountComponent()
    }
  }
}
