import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipStyles: {
        opacity: 0,
        top: -10000,
        left: 0
      }
    }
  }

  static propTypes = {
    tooltip: PropTypes.string.isRequired,
    tooltipPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: PropTypes.node
  }

  static defaultProps = {
    tooltip: '',
    tooltipPosition: 'bottom',
    children: <div />
  }
  getChildrenStyle = () => {
    let _getStyles = {}
    let _childrenDom = ReactDom.findDOMNode(this.childrenDom)  // eslint-disable-line
    if (this.props.tooltipPosition === 'top') {
      _getStyles.top = _childrenDom.offsetTop - this.dom.offsetHeight
      _getStyles.left = _childrenDom.offsetLeft - ((this.dom.offsetWidth - _childrenDom.offsetWidth) / 2)
    } else if (this.props.tooltipPosition === 'bottom') {
      _getStyles.top = _childrenDom.offsetTop + this.dom.offsetHeight
      _getStyles.left = _childrenDom.offsetLeft - ((this.dom.offsetWidth - _childrenDom.offsetWidth) / 2)
    } else if (this.props.tooltipPosition === 'left') {
      _getStyles.top = _childrenDom.offsetTop - ((this.dom.offsetHeight - _childrenDom.offsetHeight) / 2)
      _getStyles.left = _childrenDom.offsetLeft - this.dom.offsetWidth
    } else if (this.props.tooltipPosition === 'right') {
      _getStyles.top = _childrenDom.offsetTop - ((this.dom.offsetHeight - _childrenDom.offsetHeight) / 2)
      _getStyles.left = _childrenDom.offsetLeft + _childrenDom.offsetWidth
    }
    _getStyles.opacity = 0.9
    this.setState({ tooltipStyles: _getStyles })
  }
  lostChildrenStyle = () => {
    let _lostStyle = { opacity: 0, top: -10000, left: 0 }
    this.setState({ tooltipStyles: _lostStyle })
  }
  render() {
    const {
      tooltip,
      tooltipPosition,
      children
    } = this.props
    return (
      <div>
        <div ref={getDom => this.dom = getDom} className={`rob-tooltip ${tooltipPosition}`} style={this.state.tooltipStyles}>
          <div className="rob-tooltip-arrow" />
          <div className="rob-tooltip-inner">{tooltip}</div>
        </div>
        {React.cloneElement(children, { ref: getChildrenDom => this.childrenDom = getChildrenDom,
          onMouseEnter: this.getChildrenStyle,
          onMouseLeave: this.lostChildrenStyle })}
      </div>
    )
  }
}

export default Tooltip
