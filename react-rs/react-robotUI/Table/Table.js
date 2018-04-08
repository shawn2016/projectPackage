import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Table组件本身维护 isSelectedAll 和 selectedIndexList 两个属性 分发给子组件使用
 * @class Table
 * @extends {Component}
 */
class Table extends Component {
  static robotUIName = 'Table'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    /* 隔行变色斑马线*/
    striped: PropTypes.bool,
    /* hover效果*/
    hoverEffect: PropTypes.bool,
    /* 分格线*/
    divide: PropTypes.bool,
    /* 复选框*/
    containCheckbox: PropTypes.bool,
    /* 复选框类型 default/fill/circular*/
    checkboxType: PropTypes.string,
    selectAllDisabled: PropTypes.bool,
    defaultSelectAll: PropTypes.bool,
    selectAllLable: PropTypes.string,
    handleSelectAll: PropTypes.func,
    defaultDeleteAll: PropTypes.bool
  }
  static defaultProps = {
    children: null,
    style: null,
    striped: false,
    hoverEffect: false,
    divide: false,
    containCheckbox: false,
    checkboxType: 'default',
    selectAllDisabled: false,
    selectAllLable: '',
    defaultSelectAll: false,
    handleSelectAll: () => { },
    defaultDeleteAll: false
  }
  state = {
    isSelectedAll: this.props.defaultSelectAll,
    tableRowCount: 0,
    selectedCount: 0,
    selectedIndexList: []
  }
  componentWillMount = () => {
    if (this.props.containCheckbox) {
      let _rowCount = this._getTableRowCount(this.props.children)
      let _selectedInddexList = []
      for (let i = 0; i < _rowCount; i++) {
        _selectedInddexList.push(i)
      }
      this.setState({
        tableRowCount: _rowCount,
        selectedCount: this.props.defaultSelectAll ? _rowCount : 0,
        selectedIndexList: this.props.defaultSelectAll ? _selectedInddexList : []
      })
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.containCheckbox) {
      let _rowCount = this._getTableRowCount(nextProps.children)
      this.setState({
        tableRowCount: _rowCount,
        selectedCount: nextProps.defaultSelectAll ? _rowCount : 0,
      })
    }
    if (nextProps.defaultDeleteAll) {
      this.setState({
        selectedIndexList: [],
        isSelectedAll: false
      })
    }
  }
  render() {
    let _tableClass = `rob-table${this.props.striped ? ' rob-table-striped' : ''}${this.props.hoverEffect ? ' rob-table-hover' : ''}${this.props.divide ? ' rob-table-bordered-erect' : ''}`
    return (
      <div className={'rob-table-responsive'}>
        <table className={_tableClass} style={this.props.style}>
          {React.Children.map(this.props.children, (child) => {
            if (child.type.robotUIName === 'TableHeader') {
              return React.cloneElement(child, {
                containCheckbox: this.props.containCheckbox,
                checkboxType: this.props.checkboxType,
                selectAllDisabled: this.props.selectAllDisabled,
                selectAllLable: this.props.selectAllLable,
                defaultSelectAll: this.state.isSelectedAll,
                handleSelectAll: this.props.handleSelectAll,
                modifySeletedIndexList: this._modifySeletedIndexList
              })
            }
            if (child.type.robotUIName === 'TableBody') {
              return React.cloneElement(child, {
                containCheckbox: this.props.containCheckbox,
                checkboxType: this.props.checkboxType,
                selectedIndexList: this.state.selectedIndexList,
                modifySeletedIndexList: this._modifySeletedIndexList
              })
            }
          })}
        </table>
      </div>
    )
  }
  _getTableRowCount(children) {
    const TableRowChildren = []
    React.Children.forEach(children, (child) => {
      if (child && child.type.robotUIName === 'TableBody') {
        React.Children.forEach(child.props.children, _child => {
          if (_child && _child.type.robotUIName === 'TableRow') {
            TableRowChildren.push(_child)
          }
        })
      }
    })
    return TableRowChildren.length
  }

  /**
   * 用于修改选中序列集合
   * event 接收select/notSelect/selectAll/notSelectAll
   * index 接收push/splice 序列号
   * @memberof Table
   */
  _modifySeletedIndexList = (event, index) => {
    if (event && event === 'select') {
      let _selectedIndexList = this.state.selectedIndexList
      _selectedIndexList.push(index)
      this.setState({
        selectedIndexList: _selectedIndexList,
        isSelectedAll: _selectedIndexList.length >= this.state.tableRowCount
      }, () => {
        if (this.state.isSelectedAll) {
          this.props.handleSelectAll(true)
        }
      })
      return
    }
    if (event && event === 'notSelect') {
      let _selectedIndexList = this.state.selectedIndexList
      _selectedIndexList.splice(_selectedIndexList.indexOf(index), 1)
      this.setState({
        selectedIndexList: _selectedIndexList,
        isSelectedAll: _selectedIndexList.length >= this.state.tableRowCount
      })
      return
    }
    if (event && event === 'selectAll') {
      let _selectedInddexList = []
      for (let i = 0; i < this.state.tableRowCount; i++) {
        _selectedInddexList.push(i)
      }
      this.setState({
        selectedCount: this.state.tableRowCount,
        isSelectedAll: true,
        selectedIndexList: _selectedInddexList
      }, () => {
        this.props.handleSelectAll ? this.props.handleSelectAll(true) : null
      })
      return
    }
    if (event && event === 'notSelectAll') {
      this.setState({
        selectedCount: 0,
        isSelectedAll: false,
        selectedIndexList: []
      }, () => {
        this.props.handleSelectAll ? this.props.handleSelectAll(false) : null
      })
    }
  }
}

export default Table