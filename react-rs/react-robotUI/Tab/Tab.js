import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {

  constructor() {
    super()
    this.state = {
      currentIndex: 0
    }
  }

  checkTittleIndex(index) {
    return index === this.state.currentIndex ? 'active' : ''
  }

  checkItemIndex(index) {
    return index === this.state.currentIndex ? 'tab-pane active' : 'tab-pane'
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string,
    arrow: PropTypes.bool,
  }
  static defaultProps = {
    name: 'rob-nav-tabs',
    arrow: false,
  }

  arrowFun(flag) {
    console.log(flag)
    if (flag === 'left') {
      if (this.state.currentIndex === 0) {
        this.setState({
          currentIndex: this.props.children.length - 1
        })
      } else {
        this.setState({
          currentIndex: this.state.currentIndex - 1
        })
      }
      console.log(this.props.children)
    } else {
      if (this.state.currentIndex === this.props.children.length - 1) {
        this.setState({
          currentIndex: 0
        })
        return
      }
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <ul className={`rob-nav ${this.props.name}`} role="tablist">
          <span
            style={{ float: 'left', padding: '14px 22px', display: this.props.arrow === true ? 'block' : 'none' }}
            onClick={this.arrowFun.bind(this, 'left')}
          >
            <i
              className="qb-icon-left"
              style={{ float: 'left' }}
            />
          </span>
          {React.Children.map(this.props.children, (element, index) => (
            <li
              onClick={() => {
                this.setState({ currentIndex: index })
                if (!element.props['data-func']) {
                  return false
                }
                element.props['data-func']()
              }}
              className={this.checkTittleIndex(index)}
              role="button"
            >
              <a style={{ display: element.props.icon !== undefined ? 'none' : 'block' }}>{ element.props.title }</a>
              <a style={{ display: element.props.icon !== undefined ? 'block' : 'none' }}>
                <i className={element.props.icon}>
                  { element.props.title }
                </i>
              </a>
            </li>
            ))}
          <span
            style={{ float: 'left', padding: '14px 22px', display: this.props.arrow === true ? 'block' : 'none' }}
            onClick={this.arrowFun.bind(this, 'right')}
          >
            <i className="qb-icon-right" style={{ float: 'left' }} />
          </span>
        </ul>
        <div className="tab-content">
          {React.Children.map(this.props.children, (element, index) => (
            <div className={this.checkItemIndex(index)}>
              { element }
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Tab