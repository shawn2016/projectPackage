import React, { Component } from 'react'
import PropTypes from 'prop-types'
class TableBody extends Component {
  static robotUIName = 'TableBody'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    containCheckbox: PropTypes.bool,
    checkboxType: PropTypes.string,
    selectedIndexList: PropTypes.array,
    modifySeletedIndexList: PropTypes.func
  }

  static defaultProps = {
    children: null,
    style: {},
    containCheckbox: false,
    checkboxType: 'default',
    selectedIndexList: [],
    modifySeletedIndexList: null
  }
  componentWillMount = () => {
    console.log(this.props.children)
  }
  render() {
    console.log(this.props)
    const { children = [] } = this.props
    return (
      <tbody style={Object.assign({}, this.props.style)}>
        {
          !children || children.length === 0 ? (
            <tr className="qb-nodate-g__nohover"><td colSpan="100">
              <div className="qb-nodate-g__box"><span className="qb-nodate-g bg_icon" /><p>无数据</p></div>
            </td></tr>
          ) : React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, {
              containCheckbox: this.props.containCheckbox,
              checkboxType: this.props.checkboxType,
              modifySeletedIndexList: this.props.modifySeletedIndexList,
              selectedIndexList: this.props.selectedIndexList,
              index: i
            })
          )
        }
      </tbody>
    )
  }
}

export default TableBody