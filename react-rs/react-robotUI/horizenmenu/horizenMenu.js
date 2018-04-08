import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BaseMenu } from './BasicMenu'
import { MultiMenu } from './MultiList'
import { DivMenu } from './DivList'
import { BaseNav } from './BaseNav'

class HorizenMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      element: ''
    }
  }
  static propTypes={
    confData: PropTypes.array,
    menuType: PropTypes.string,
    handleClick: PropTypes.func,
    selectMenuId: PropTypes.any,
  }
  static defaultProps = {
    confData: [],
    menuType: 'basic',
    handleClick: () => {},
    selectMenuId: null
  }
  handleClick = (node) => {
    this.props.handleClick(node)
  }
  render() {
    let mtype = this.props.menuType
    this.confData = this.props.confData
    if (mtype === 'basicList') {
      return (
        <div className="code-box">
          <section className="code-box-demo">
            <form className="rob-form">
              <div className="rob-navbar-horizen1">
                <BaseMenu confData={this.confData} handleClick={this.handleClick} />
              </div>
            </form>
          </section>
        </div>
      )
    } else if (mtype === 'multiList') {
      return (
        <section className="code-box-demo">
          <form className="rob-form">
            <div className="rob-navbar-horizen1">
              <MultiMenu confData={this.confData} handleClick={this.handleClick} />
            </div>
          </form>
        </section>
      )
    } else if (mtype === 'divList') {
      return (
        <section className="code-box-demo">
          <form className="rob-form">
            <div className="rob-navbar-horizen1">
              <DivMenu confData={this.confData} handleClick={this.handleClick} />
            </div>
          </form>
        </section>
      )
    } else if (mtype === 'navList') {
      return (
        <section className="code-box-demo">
          <form className="rob-form">
            <div className="rob-navbar-horizen1">
              <BaseNav confData={this.confData} handleClick={this.handleClick} selectMenuId={this.props.selectMenuId} />
            </div>
          </form>
        </section>
      )
    }
  }
}

export default HorizenMenu